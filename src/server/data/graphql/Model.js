import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLFloat,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema
} from 'graphql'

import {
    connectionArgs,
    connectionDefinitions,
    connectionFromPromisedArray,
    connectionFromArray,
    fromGlobalId,
    globalIdField,
    nodeDefinitions,
    mutationWithClientMutationId,
    cursorForObjectInConnection,
    offsetToCursor
} from 'graphql-relay'

import Database from '../database'

import {
    Viewer,
    registerViewer,
    getViewer,
} from '../stores/UserStore';


/**
 * The first argument defines the way to resolve an ID to its object.
 * The second argument defines the way to resolve a node object to its GraphQL type.
 */
var { nodeInterface, nodeField } = nodeDefinitions(
    (globalId) => {
        let { id, type } = fromGlobalId(globalId);

        if (type === 'ShopType') {
            return Database.models.shop.findOne({where: {id: id}});
        } else if(type === 'UserType') {
            return Database.models.user.findOne({where: {id: id}})
        } else if(type === 'ViewerType') {
            return getViewer(id)
        }
        return null;
    },
    (obj) => {
    
        if (obj.password != undefined) {
            return ViewerType
        } else if(obj.name != undefined) {
            return ShopType
        } else if(obj.email) {
            return UserType
        }
        return null
    }
);

export var ShopType = new GraphQLObjectType({

    name: 'ShopType',
    description: 'It represents a shop',
    fields: {
        id: globalIdField('ShopType'),
        name: {type: GraphQLString, resolve: (obj) => obj.name},
        description: {type: GraphQLString, resolve: (obj) => obj.description}
    },
    interfaces: [nodeInterface]
});

export var UserType = new GraphQLObjectType({
    name: 'UserType',
    description: 'It display the information related to an user',
    fields: {
        id: globalIdField('UserType'),
        login: {
            type: GraphQLString,
            resolve: (obj) => obj.login
        },
        password: {
            type: GraphQLString,
            resolve: (obj) => obj.password
        },
        email: {
            type: GraphQLString,
            resolve: (obj) => obj.email
        }
    },
    interfaces: [nodeInterface]
});

export var {
    connectionType: ShopConnection
    ,edgeType: ShopEdge,
} = connectionDefinitions({
    name: 'ShopType',
    nodeType: ShopType
});

export var ViewerType = new GraphQLObjectType({
    name: 'Viewer',
    fields: () => ({
        id: globalIdField('Viewer'),
        user: {
          type: UserType,
          resolve: (obj) => obj
        },
        shops: {
            type: ShopConnection,
            args: {
                ...connectionArgs
            },
            resolve: (obj, args) => connectionFromPromisedArray(Database.models.shop.findAll(), args)
        },
    }),
    interfaces: [nodeInterface]
});

export var GraphQLRoot = new GraphQLObjectType({
    name: 'Root',
    fields: {
        viewer: {
            type: ViewerType,
            args: {
                viewerId: {
                    name: 'viewerId',
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: (root, {viewerId}) => {
                return Database.models.user.findOne({where: {id: viewerId}})
                    .then(response => {
                        registerViewer(response);
                        return getViewer(response.id)
                    })
            }
        },
        node: nodeField
    }
});

