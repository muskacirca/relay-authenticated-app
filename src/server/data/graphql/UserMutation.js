import {
    GraphQLNonNull,
    GraphQLString
} from 'graphql'

import {
    mutationWithClientMutationId,
    toGlobalId
} from 'graphql-relay'

import Database from '../database'

import {
    ViewerType
} from './Model'

import {
    getViewer,
} from '../stores/UserStore';


export const AddUserMutation = new mutationWithClientMutationId({
    name: 'AddUser',
    description: 'Function to add a user',
    inputFields: {
        login: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},

    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: (obj) => {
                console.log("In EventMutation output field viewer : " + JSON.stringify(obj.viewerId))
                return getViewer(toGlobalId('UserType', obj.id))
            }
        }
    },
    mutateAndGetPayload: ({login, password, email}) => {

        return Database.models.user.create({login, password, email})
            .then(r => {
                return Database.models.user.findOne({where: {email: email}})
            })
    }
});





