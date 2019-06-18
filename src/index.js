// npm i graphql-yoga@1.14.10
import "@babel/polyfill";
// in npm start scripts, babel-node has polyfill for dev mode, straight babel doesn't.
// So we include it here for prod mode.
import {GraphQLServer} from 'graphql-yoga';

import {resolvers, fragmentReplacements} from './resolvers/index.js';

import prisma from './prisma.js';

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({prisma, req}),
    fragmentReplacements
    // auth tokens live on req.request.headers
})



const config = {
    // github.com/prisma/graphql-yoga
    port: process.env.PORT || 4000
}
server.start(config, () => console.log('server up'))
// localhost:4000
