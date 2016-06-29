'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GraphQLRoot = exports.ViewerType = exports.ShopEdge = exports.ShopConnection = exports.UserType = exports.ShopType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

var _UserStore = require('../stores/UserStore');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The first argument defines the way to resolve an ID to its object.
 * The second argument defines the way to resolve a node object to its GraphQL type.
 */

var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(function (globalId) {
    var _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(globalId);

    var id = _fromGlobalId.id;
    var type = _fromGlobalId.type;


    if (type === 'ShopType') {
        return _database2.default.models.shop.findOne({ where: { id: id } });
    } else if (type === 'UserType') {
        return _database2.default.models.user.findOne({ where: { id: id } });
    } else if (type === 'ViewerType') {
        return (0, _UserStore.getViewer)(id);
    }
    return null;
}, function (obj) {

    if (obj.password != undefined) {
        return ViewerType;
    } else if (obj.name != undefined) {
        return ShopType;
    } else if (obj.email) {
        return UserType;
    }
    return null;
});

var nodeInterface = _nodeDefinitions.nodeInterface;
var nodeField = _nodeDefinitions.nodeField;
var ShopType = exports.ShopType = new _graphql.GraphQLObjectType({

    name: 'ShopType',
    description: 'It represents a shop',
    fields: {
        id: (0, _graphqlRelay.globalIdField)('ShopType'),
        name: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.name;
            } },
        description: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.description;
            } }
    },
    interfaces: [nodeInterface]
});

var UserType = exports.UserType = new _graphql.GraphQLObjectType({
    name: 'UserType',
    description: 'It display the information related to an user',
    fields: {
        id: (0, _graphqlRelay.globalIdField)('UserType'),
        login: {
            type: _graphql.GraphQLString,
            resolve: function resolve(obj) {
                return obj.login;
            }
        },
        password: {
            type: _graphql.GraphQLString,
            resolve: function resolve(obj) {
                return obj.password;
            }
        },
        email: {
            type: _graphql.GraphQLString,
            resolve: function resolve(obj) {
                return obj.email;
            }
        }
    },
    interfaces: [nodeInterface]
});

var _connectionDefinition = (0, _graphqlRelay.connectionDefinitions)({
    name: 'ShopType',
    nodeType: ShopType
});

var ShopConnection = _connectionDefinition.connectionType;
var ShopEdge = _connectionDefinition.edgeType;
exports.ShopConnection = ShopConnection;
exports.ShopEdge = ShopEdge;
var ViewerType = exports.ViewerType = new _graphql.GraphQLObjectType({
    name: 'Viewer',
    fields: function fields() {
        return {
            id: (0, _graphqlRelay.globalIdField)('Viewer'),
            user: {
                type: UserType,
                resolve: function resolve(obj) {
                    return obj;
                }
            },
            shops: {
                type: ShopConnection,
                args: _extends({}, _graphqlRelay.connectionArgs),
                resolve: function resolve(obj, args) {
                    return (0, _graphqlRelay.connectionFromPromisedArray)(_database2.default.models.shop.findAll(), args);
                }
            }
        };
    },
    interfaces: [nodeInterface]
});

var GraphQLRoot = exports.GraphQLRoot = new _graphql.GraphQLObjectType({
    name: 'Root',
    fields: {
        viewer: {
            type: ViewerType,
            args: {
                viewerId: {
                    name: 'viewerId',
                    type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
                }
            },
            resolve: function resolve(root, _ref) {
                var viewerId = _ref.viewerId;

                return _database2.default.models.user.findOne({ where: { id: viewerId } }).then(function (response) {
                    (0, _UserStore.registerViewer)(response);
                    return (0, _UserStore.getViewer)(response.id);
                });
            }
        },
        node: nodeField
    }
});