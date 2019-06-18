import {extractFragmentReplacements} from 'prisma-binding';

import Query from './Query.js';
import Mutation from './Mutation.js';
import Subscription from './Subscription.js';
import Post from './Post.js';
import User from './User.js';
import Comment from './Comment.js';

const resolvers = {
    Query, Mutation, Subscription, Comment, Post, User
}

const fragmentReplacements = extractFragmentReplacements(resolvers);

export {resolvers, fragmentReplacements};
// export {resolvers as default, foo, bar}
// module.exports = resolvers;
// export default resolvers;
