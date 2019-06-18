import {Prisma} from 'prisma-binding';
import {fragmentReplacements} from "./resolvers/index.js";

const prisma  = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    // created by graphql-cli@2.16.4
    endpoint: process.env.PRISMA_ENDPOINT,
    // env variable above is set (in dev mode) via env-cmd in package.json
    secret: 'nbpw34o87npw34onw79p34o6bnw93p46wbn39w6;wo346bnrekljh&%$%&',
    fragmentReplacements
});

export {prisma as default};