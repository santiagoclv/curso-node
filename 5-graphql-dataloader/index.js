const { ApolloServer } = require('apollo-server');

const { RocketRepository } = require('./datasources/rockets');
const { CommentRepository } = require('./datasources/comments');
const { rocketsLoader, launchesByRocketLoader } = require('./datasources/loaders');
const SpacexAPI = require('./datasources/spacex');

const typeDefs = require('./schema/global') ;
const resolvers = require('./resolvers/resolvers') ;

function dataSources() {
    const rocketsRepository = new RocketRepository();
    const commentsRepository = new CommentRepository();
    const spacexAPI = new SpacexAPI();

    return {
        spacexAPI,
        rocketsRepository,
        commentsRepository,
        loaders : {
            rockets: rocketsLoader(rocketsRepository),
            lauchesByRocket: launchesByRocketLoader(spacexAPI),
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources
});

server
    .listen({ port: process.env.port || 4000 })
    .then(({ url }) => {
        console.log(`graphQL iniciado en ${url}`);
    });