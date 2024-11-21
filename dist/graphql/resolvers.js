import userService from "../services/user.service.js";
import commentService from "../services/comment.service.js";
import reactionService from "../services/reaction.service.js";
import { GraphQLError } from "graphql";
const checkRole = (requiredRoles, role) => {
    if (!requiredRoles.includes(role)) {
        throw unauthorizedError("You do not have the necessary permissions.");
    }
};
export const resolvers = {
    Query: {
        user: async (_root, params, context) => {
            checkRole(["admin"], context.user.rol);
            const user = await userService.findById(params.id);
            if (!user) {
                throw notFoundError(`User with id ${params.id} not found`);
            }
            return user;
        },
        users: (_root, params, context) => {
            return userService.findAll();
        },
        userSearchByEmail: async (_root, params, context) => {
            checkRole(["admin"], context.user.rol);
            const user = await userService.findByEmail(params.email);
            if (!user) {
                throw notFoundError(`User with email ${params.email} not found`);
            }
            return user;
        },
        comments: async (_root) => {
            const users = await commentService.findAll();
            console.log(users);
            return users;
        },
        findCommentById: async (_root, params) => {
            const comment = await commentService.findByCommentId(params.commentId);
            if (!comment) {
                throw notFoundError(`Comment with id ${params.commentId} not found`);
            }
            console.log(comment);
            return await comment;
        }
    },
    Mutation: {
        createUser: async (_root, params, context) => {
            checkRole(["admin"], context.user.rol);
            const userOutput = await userService.createUser(params.input);
            return userOutput;
        },
        updateUser: async (_root, params, context) => {
            checkRole(["admin"], context.user.rol);
            const user = await userService.findById(context.user.id);
            if (!user) {
                throw notFoundError(`User with id ${context.user.id} not found`);
            }
            const userOutput = await userService.update(context.user.id, params.input);
            return userOutput;
        },
        deleteUser: async (_root, params, context) => {
            checkRole(["admin"], context.user.rol);
            const userOutput = await userService.delete(params.input.id);
            if (!userOutput) {
                throw notFoundError(`User with id ${params.input.id} not found`);
            }
            return userOutput;
        },
        loginUser: async (_root, params) => {
            const userOutput = await userService.login(params.input);
            if (!userOutput) {
                throw unauthorizedError("User not found");
            }
            return userOutput;
        },
        createComment: async (_root, params, context) => {
            const commentOutput = await commentService.createComment(context.user.id, params.input.comment);
            return commentOutput.comments;
        },
        updateComment: async (_root, params, context) => {
            const comment = params.input.comment;
            const commentOutput = await commentService.updateCommentInMyDocument(context.user.id, params.input.idComment, comment);
            if (!commentOutput) {
                const replyOutput = await commentService.updateCommentInReplies(context.user.id, params.input.idComment, comment);
                if (!replyOutput) {
                    throw notFoundError('Comment not found');
                }
                return { "comment": 'Comment with ID ' + replyOutput.id + ' updated successfully' };
            }
            return commentOutput.comments;
        },
        deleteComment: async (_root, params, context) => {
            const commentOutput = await commentService.deleteComment(context.user.id, params.input.idComment);
            if (!commentOutput) {
                throw forbiddenError('You do not have permission to delete this comment');
            }
            return 'Comment deleted successfully';
        },
        answerComment: async (_root, params, context) => {
            const commentOutput = await commentService.createReply(context.user.id, params.input.comment, params.input.parent);
            if (!commentOutput.parent) {
                throw notFoundError('Parent comment not found');
            }
            const comment = await commentService.findByCommentId(commentOutput.parent.toString());
            // console.log("Padre: ",comment);
            if (!commentOutput) {
                throw notFoundError('Parent comment not found');
            }
            return comment;
        },
        createReaction: async (_root, params, context) => {
            const reactionOutput = await reactionService.createReaction(params.input.reaction, params.input.commentId, context.user.id);
            if (!reactionOutput) {
                throw notFoundError('Comment not found');
            }
            const comment = await commentService.findByCommentId(params.input.commentId);
            console.log(comment);
            // console.log(reactionOutput);
            return comment;
        },
        deleteReaction: async (_root, params, context) => {
            const reactionOutput = await reactionService.deleteReaction(params.input.reactionId, context.user.id, params.input.commentParentId);
            if (!reactionOutput) {
                throw notFoundError('Reaction not found');
            }
            const comment = await commentService.findByCommentId(params.input.commentParentId);
            return comment;
        }
    }
};
function notFoundError(message) {
    return new GraphQLError(message, {
        extensions: { code: 'NOT_FOUND' },
    });
}
function unauthorizedError(message) {
    return new GraphQLError(message, {
        extensions: { code: 'UNAUTHORIZED' },
    });
}
function forbiddenError(message) {
    return new GraphQLError(message, {
        extensions: { code: 'INTERNAL_SERVER_ERROR' },
    });
}
