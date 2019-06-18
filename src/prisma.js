import {Prisma} from 'prisma-binding';
import {fragmentReplacements} from "./resolvers/index.js";

const prisma  = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    // created by graphql-cli@2.16.4
    endpoint: process.env.PRISMA_ENDPOINT,
    // env variable above is set (in dev mode) via env-cmd in package.json
    secret: process.env.PRISMA_SECRET,
    fragmentReplacements
});

export {prisma as default};