import getUserId from '../utils/getUserId.js';

const Query = {

    me: async (parent, args, {prisma, req}, info) => {
        const userId = getUserId(req)
        return prisma.query.user({where:{id:userId}}, info)
    },
    post: async (parent, args, {prisma, req}, info) => {
        const userId = getUserId(req, false )
        const {id} = args;
        // using 'posts' because 'post' because 'post' doesn't have 'OR'
        const posts = await prisma.query.posts({
            where: { id, OR:[ {published:true}, {author:{id:userId}} ] }})
        if (posts.length === 0) throw new Error('post not found');
        return posts[0];
    },

    users: (parent, args, {prisma}, info) => {
        const {after, skip, first, orderBy} = args
        const opArgs = {after, skip, first, orderBy};
        if (args.query) {
            opArgs.where = {
                OR: [{name_contains: args.query}]
            }
        }
        return prisma.query.users(opArgs, info)
    },

    posts: (parent, args, {prisma}, info) => {
        const {after, skip, first, orderBy} = args
        const opArgs = { where: {published: true}, after, skip, first, orderBy};
        if (args.query) {
            opArgs.where.OR = [{title_contains: args.query}, {body_contains: args.query}]
        }
        return prisma.query.posts(opArgs, info)
    },

    myPosts: (parent, args, {prisma, req}, info) => {
        const userId = getUserId(req)
        const {after, skip, first, orderBy} = args
        const opArgs = { where: {author: {id:userId}}, after, skip, first, orderBy};
        if (args.query) {
            opArgs.where.OR = [{title_contains: args.query}, {body_contains: args.query}]
        }
        return prisma.query.posts(opArgs, info)
    },

    comments: (parent, args, {prisma}, info) => {
        const {after, skip, first, query} = args
        const opArgs = { after, skip, first};
        if (query) opArgs.where = {text_contains: query}
        return prisma.query.comments(opArgs, info);
    },

}

export {Query as default}