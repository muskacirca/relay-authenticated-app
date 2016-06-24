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
    ShopType
} from './Model'



import {
    getViewer,
} from '../stores/UserStore';


export const AddShopMutation = new mutationWithClientMutationId({
    name: 'AddShop',
    description: 'Function to add a shop',
    inputFields: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: (obj) => {
                console.log("In EventMutation output field viewer : " + JSON.stringify(obj.viewerId))
                return getViewer(obj.viewerId)
            }
        },
        shopEdge: {
            type: ShopEdge,
            resolve: (obj) => {

                return Database.models.shop.findAll()
                    .then(shops => {

                        let shopToPass
                        for (const shop of shops) {
                            if (shop.id === obj.shop.id) {
                                shopToPass = shop;
                            }
                        }
                        var cursor = cursorForObjectInConnection(shops, shopToPass);
                        return {
                            cursor: cursor,
                            node: shopToPass
                        }
                    })
            }
        }
    },
    mutateAndGetPayload: ({name, description}) => {

        var shop = {
            name: name,
            description: description
        }
        
        return Database.models.shop.create(shop)
            .then(shop => {                
                return {
                    viewerId : "1",
                    shop: shop
                }
            })
    }
});





