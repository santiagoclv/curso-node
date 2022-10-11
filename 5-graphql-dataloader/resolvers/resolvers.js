const resolvers = {
    Mutation: {
        addComment: async (parent, {launch_id, comment}, { dataSources }, info) => {
            const { id } = await dataSources.commentsRepository.create(launch_id, comment);
            return dataSources.commentsRepository.getById(id);
        },
    },
    Query: {
        company: (parent, args, { dataSources }, info) => {
            return dataSources.spacexAPI.getCompanyInfo();
        },
        rockets: (parent, args, { dataSources }, info) => {
            return dataSources.rocketsRepository.getAll();
        },
        rocket: (parent, {id}, { dataSources }, info) => {
            return dataSources.rocketsRepository.getById(id);
        },
        launches: (parent, args, { dataSources }, info) => {
            return dataSources.spacexAPI.getLaunches();
        },
        launch: (parent, {id}, { dataSources }, info) => {
            return dataSources.spacexAPI.getLaunchById(id);
        },
        comments: (parent, { launch_id }, { dataSources }, info) => {
            return dataSources.commentsRepository.getAllByLaunchId(launch_id);
        },
    },
    Launch: {
        rocket: (launch, args, { dataSources }, info) => {
            return dataSources.loaders.rockets.load(launch.rocket);
        },
        comments: (launch, args, { dataSources }, info) => {
            return dataSources.commentsRepository.getAllByLaunchId(launch.id);
        },
    },
    Rocket: {
        launches: async (rocket, args, { dataSources }, info) => {
            return dataSources.loaders.lauchesByRocket.load(rocket.id);
        }
    },
    Comment: {
        launch: async (comment, args, { dataSources }, info) => {
            return dataSources.spacexAPI.getLaunchById(comment.launch_id);
        }
    }
}

module.exports = resolvers;