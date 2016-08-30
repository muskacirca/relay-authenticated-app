import {
    GraphQLNonNull,
    GraphQLList,
    GraphQLString
} from 'graphql'

import {
    connectionArgs,
    mutationWithClientMutationId,
    cursorForObjectInConnection,
    connectionFromPromisedArray,
    fromGlobalId
} from 'graphql-relay'

import Database from '../database'

import {
    ViewerType,
    ShopEdge,
} from './Model'

import {
    getViewer,
} from '../stores/UserStore';


export const AddFileMutation = new mutationWithClientMutationId({
    name: 'AddFile',
    description: 'Function to add a file',
    inputFields: {
        image: {type: new GraphQLNonNull(GraphQLString)}
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: (obj) => {
                return getViewer(obj.viewerId)
            }
        }
    },
    mutateAndGetPayload: (args) => {

        console.log("args : " + JSON.stringify(args));
        console.log("yop");
        return []
    }
});





