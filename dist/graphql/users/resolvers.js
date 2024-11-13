import userService from "../../services/user.service";
export const resolvers = {
    Query: {
        user: async (_root, params) => {
            console.log(params.id);
            const user = await userService.findById(params.id);
            return user;
        },
        users: (_root) => userService.findAll(),
    },
    Mutation: {
        createUser: async (_root, params) => {
            const userOutput = await userService.createUser(params.input);
            return userOutput;
        },
        updateUser: async (_root, params) => {
            const userOutput = await userService.update(params.input.id, params.input);
            return userOutput;
        },
        deleteUser: async (_root, params) => {
            const userOutput = await userService.delete(params.input.id);
            return userOutput;
        }
    }
};
