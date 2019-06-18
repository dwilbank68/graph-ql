import bcrypt from 'bcryptjs';

import hashPassword from '../utils/hashPassword.js';
import getUserId from '../utils/getUserId.js';
import generateToken from '../utils/generateToken.js';

const Mutation = {

    createUser: async (parent, args, {prisma}, info) => {
        const {password} = args.data;
        const hashedPassword = await hashPassword(password);
        const user = await prisma.mutation.createUser(
            {data:{...args.data, password:hashedPassword}}
        );
        // info not included as 2nd arg because createUser returns AuthPayload type instead of a User
        // leaving off info means all fields are returned
        return {user, token:generateToken(user.id)}
    },
    login: async (parent, args, {prisma}, info) => {
        const {email, password} = args.data;
        const user = await prisma.query.user({where:{email}})
        if (!user) throw new Error('email not found');
        console.log('user', user);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('passwords no match');
        return {user, token:generateToken(user.id)}
    },
    updateUser: async (parent, args, {prisma, req}, info) => {
        const userId = getUserId(req)
        const {data} = args;
        if (typeof data.password === 'string') {
            args.data.password = await hashPassword(args.data.password)
        }
        return prisma.mutation.updateUser({
            where: {id:userId}, data
        }, info)
    },
    deleteUser: async (parent, args, {prisma, req}, info) => {
        const userId = getUserId(req)
        return prisma.mutation.deleteUser({where:{id:userId}}, info)
    },

    createPost: (parent, args, {prisma, req}, info) => {
        const userId = getUserId(req);
        // getUserId throws error if correct token is not on the req object
        const {title, body, published} = args.data;
        return prisma.mutation.createPost(
            {data: {title, body, published, author:{connect:{id:userId}}}},
            info
        )
    },
    updatePost: async (parent, args, {prisma, req}, info) => {
        const userId = getUserId(req);
        const {id, data} = args;
        const postIsMine = await prisma.exists.Post({id, author:{id:userId}})
        // if post.author is not the signed-in user, postIsMine is false
        if (!postIsMine) throw new Error('unable to update post')
        const postIsPublished = await prisma.exists.Post({id, published:true})
        if (postIsPublished && data.published === false) {
            prisma.mutation.deleteManyComments({where:{post:{id}}})
        }
        return prisma.mutation.updatePost(
            {where:{id}, data},
            info
        )
    },
    deletePost: async (parent, args, {prisma, req}, info) => {
        const userId = getUserId(req);
        const {id} = args;
        const postIsMine = await prisma.exists.Post({id, author:{id:userId}})
        // if post.author is not the signed-in user, postIsMine is false
        if (!postIsMine) throw new Error('unable to delete post')
        return prisma.mutation.deletePost({where:{id}}, info)
    },

    createComment: async (parent, args, {prisma, req}, info) => {
        const userId = getUserId(req);
        // getUserId throws error if correct token is not on the req object
        const {text, post}= args.data;
        const postIsPublished = await prisma.exists.Post({id:post, published:true})
        if (!postIsPublished) throw new Error('post not published')
        return prisma.mutation.createComment(
            {data:{text, author:{connect:{id:userId}}, post:{connect:{id:post}}}},
            info
        )
    },
    updateComment: async (parent, args, {prisma, req}, info) => {
        const userId = getUserId(req);
        // getUserId throws error if correct token is not on the req object
        const {id, data} = args;
        const commentIsMine = await prisma.exists.Comment({id, author:{id:userId}})
        // if comment.author is not the signed-in user, commentIsMine is false
        if (!commentIsMine) throw new Error('unable to update comment')
        return prisma.mutation.updateComment(
            {where:{id}, data},
            info
        )
    },
    deleteComment: async (parent, args, {prisma, req}, info) => {
        const userId = getUserId(req);
        // getUserId throws error if correct token is not on the req object
        const {id} = args;
        const commentIsMine = await prisma.exists.Comment({id, author:{id:userId}})
        // if comment.author is not the signed-in user, commentIsMine is false
        if (!commentIsMine) throw new Error('unable to delete comment')
        return prisma.mutation.deleteComment({where:{id}}, info);
    },
}

export {Mutation as default}
