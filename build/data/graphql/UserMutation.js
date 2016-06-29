'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AddUserMutation = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

var _Model = require('./Model');

var _UserStore = require('../stores/UserStore');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddUserMutation = exports.AddUserMutation = new _graphqlRelay.mutationWithClientMutationId({
    name: 'AddUser',
    description: 'Function to add a user',
    inputFields: {
        login: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        password: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        email: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }

    },
    outputFields: {
        viewer: {
            type: _Model.ViewerType,
            resolve: function resolve(obj) {
                console.log("In EventMutation output field viewer : " + JSON.stringify(obj.viewerId));
                return (0, _UserStore.getViewer)((0, _graphqlRelay.toGlobalId)('UserType', obj.id));
            }
        }
    },
    mutateAndGetPayload: function mutateAndGetPayload(_ref) {
        var login = _ref.login;
        var password = _ref.password;
        var email = _ref.email;


        return _database2.default.models.user.create({ login: login, password: password, email: email }).then(function (r) {
            return _database2.default.models.user.findOne({ where: { email: email } });
        });
    }
});