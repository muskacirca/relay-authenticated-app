'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AddShopMutation = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

var _Model = require('./Model');

var _UserStore = require('../stores/UserStore');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddShopMutation = exports.AddShopMutation = new _graphqlRelay.mutationWithClientMutationId({
    name: 'AddShop',
    description: 'Function to add a shop',
    inputFields: {
        name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        description: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }

    },
    outputFields: {
        viewer: {
            type: _Model.ViewerType,
            resolve: function resolve(obj) {
                console.log("In EventMutation output field viewer : " + JSON.stringify(obj.viewerId));
                return (0, _UserStore.getViewer)(obj.viewerId);
            }
        },
        shopEdge: {
            type: _Model.ShopEdge,
            resolve: function resolve(obj) {

                return _database2.default.models.shop.findAll().then(function (shops) {

                    var shopToPass = void 0;
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = shops[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var shop = _step.value;

                            if (shop.id === obj.shop.id) {
                                shopToPass = shop;
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    var cursor = (0, _graphqlRelay.cursorForObjectInConnection)(shops, shopToPass);
                    return {
                        cursor: cursor,
                        node: shopToPass
                    };
                });
            }
        }
    },
    mutateAndGetPayload: function mutateAndGetPayload(_ref) {
        var name = _ref.name;
        var description = _ref.description;


        var shop = {
            name: name,
            description: description
        };

        return _database2.default.models.shop.create(shop).then(function (shop) {
            return {
                viewerId: "1",
                shop: shop
            };
        });
    }
});