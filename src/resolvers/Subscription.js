import getUserId from '../utils/getUserId.js';

const Subscription = {
    comment: {
        subscribe: (parent, {postId}, {prisma}, info) => {
            return prisma.subscription.comment({where:{node:{post:{id:postId}}}}, info)
        }
    },
    post: {
        subscribe: (parent, {userId}, {prisma}, info) => {
            return prisma.subscription.post({where:{node:{published:true}}}, info)
        }
    },
    myPost: {
        subscribe: (parent, args, {prisma, req}, info) => {
            const userId = getUserId(req);
            return prisma.subscription.post({where:{node:{author:{id:userId}}}}, info)
        }
    }
}

export {Subscription as default}
