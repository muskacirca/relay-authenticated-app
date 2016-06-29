module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _path = __webpack_require__(2);

	var _path2 = _interopRequireDefault(_path);

	var _schema = __webpack_require__(3);

	var _expressGraphql = __webpack_require__(12);

	var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

	var _database = __webpack_require__(7);

	var _database2 = _interopRequireDefault(_database);

	var _jsonwebtoken = __webpack_require__(13);

	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

	var _bodyParser = __webpack_require__(14);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _crypto = __webpack_require__(15);

	var _crypto2 = _interopRequireDefault(_crypto);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var server_port = process.env.PORT || 3000;

	var app = (0, _express2.default)();
	app.use(_bodyParser2.default.urlencoded({ extended: false }));
	app.use(_bodyParser2.default.json());
	app.use(function (req, res, next) {
	    res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	    next();
	});

	app.get('/', function (req, res) {
	    res.sendFile(_path2.default.resolve(__dirname, "../src/frontend/index.html"));
	});

	app.use('/style', _express2.default.static(_path2.default.resolve(__dirname, '../src/style')));
	app.use('/utils', _express2.default.static(_path2.default.resolve(__dirname, '../src/utils')));
	app.use('/template', _express2.default.static(_path2.default.resolve(__dirname, '../src/frontend/public/template')));

	app.get('/bundle.js', function (req, res) {
	    res.sendFile(_path2.default.resolve(__dirname, "../src/frontend/public/bundle.js"));
	});

	app.use('/graphql', (0, _expressGraphql2.default)({ schema: _schema.Schema, pretty: true, graphiql: true }));

	app.post('/api/authenticate', function (request, response) {

	    _database2.default.models.user.findOne({ where: { login: request.body.login } }).then(function (user) {

	        var password = _crypto2.default.createHash("sha256").update(request.body.password).digest("base64");

	        if (user.password != password) {

	            response.json({
	                success: false,
	                message: 'Bad authentication'
	            });
	        } else {

	            var decoded = _jsonwebtoken2.default.sign(user.dataValues, 'secret', {
	                expiresIn: 600
	            });

	            response.json({
	                success: true,
	                message: 'Enjoy your token!',
	                token: decoded
	            });
	        }
	    }).catch(function (error) {
	        console.log(error);
	        response.json({
	            success: false,
	            message: 'Unhandled error'
	        });
	    });
	});

	app.listen(server_port, function (err) {
	    if (err) return console.log(err);
	    console.log('Server is now running on port ' + server_port);
	    console.log("process.env.PROD_URL: " + process.env.PROD_URL);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Schema = undefined;

	var _graphql = __webpack_require__(4);

	var _ShopMutations = __webpack_require__(5);

	var _UserMutation = __webpack_require__(11);

	var _Model = __webpack_require__(9);

	var Mutation = new _graphql.GraphQLObjectType({
	    name: 'Mutation',
	    fields: {
	        addShop: _ShopMutations.AddShopMutation,
	        addUser: _UserMutation.AddUserMutation
	    }
	});

	var Schema = exports.Schema = new _graphql.GraphQLSchema({
	    query: _Model.GraphQLRoot,
	    mutation: Mutation
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("graphql");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AddShopMutation = undefined;

	var _graphql = __webpack_require__(4);

	var _graphqlRelay = __webpack_require__(6);

	var _database = __webpack_require__(7);

	var _database2 = _interopRequireDefault(_database);

	var _Model = __webpack_require__(9);

	var _UserStore = __webpack_require__(10);

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

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("graphql-relay");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _sequelize = __webpack_require__(8);

	var _sequelize2 = _interopRequireDefault(_sequelize);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mysql_url = process.env.PROD_URL || "localhost";
	var mysql_schema = process.env.PROD_SCHEMA || process.env.CLEARDB_DATABASE_SCHEMA || "services";
	var mysql_user = process.env.PROD_USER || process.env.CLEARDB_DATABASE_USER || "greec";
	var mysql_pass = process.env.PROD_PASS || process.env.CLEARDB_DATABASE_PASS || "test";

	var connection = process.env.CLEARDB_DATABASE_URL !== undefined ? new _sequelize2.default(process.env.CLEARDB_DATABASE_URL, {
	    pool: {
	        max: 5,
	        min: 1,
	        idle: 10000
	    }
	}) : new _sequelize2.default(mysql_schema, mysql_user, mysql_pass, { dialect: "mysql", host: mysql_url,
	    logging: function logging(param) {
	        param.indexOf("Executing (default):") !== -1 ? false : true;
	    } });

	var shop = connection.define('shop', {

	    name: {
	        type: _sequelize2.default.STRING,
	        allowNull: false,
	        unique: true
	    },
	    description: {
	        type: _sequelize2.default.STRING
	    }

	}, { timestamps: false });

	connection.define('user', {
	    firstName: _sequelize2.default.STRING,
	    lastName: _sequelize2.default.STRING,
	    login: { type: _sequelize2.default.STRING, unique: true },
	    password: _sequelize2.default.STRING,
	    email: { type: _sequelize2.default.STRING, unique: true },
	    enabled: _sequelize2.default.BOOLEAN
	}, { timestamps: false, tableName: 'users', freezeTableName: true });

	connection.sync({ force: false });

	exports.default = connection;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("sequelize");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GraphQLRoot = exports.ViewerType = exports.ShopEdge = exports.ShopConnection = exports.UserType = exports.ShopType = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _graphql = __webpack_require__(4);

	var _graphqlRelay = __webpack_require__(6);

	var _database = __webpack_require__(7);

	var _database2 = _interopRequireDefault(_database);

	var _UserStore = __webpack_require__(10);

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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Viewer = undefined;
	exports.registerViewer = registerViewer;
	exports.getViewer = getViewer;

	var _database = __webpack_require__(7);

	var _database2 = _interopRequireDefault(_database);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Viewer = exports.Viewer = function (_Object) {
	    _inherits(Viewer, _Object);

	    function Viewer() {
	        _classCallCheck(this, Viewer);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Viewer).apply(this, arguments));
	    }

	    return Viewer;
	}(Object);

	var VIEWER_ID = 'me';

	var viewer = new Viewer();
	viewer.id = VIEWER_ID;

	var users = {};

	var usersById = _defineProperty({}, VIEWER_ID, viewer);

	function registerViewer(viewer) {

	    if (users[viewer.id] == undefined) {
	        users[viewer.id] = viewer;
	    }
	}

	function getViewer(viewerId) {

	    console.log("getViewer with Id : " + viewerId);
	    console.log("getViewer : " + JSON.stringify(users[viewerId]));

	    return users[viewerId] == undefined ? _database2.default.models.user.findOne({ where: { id: viewerId } }) : users[viewerId];
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AddUserMutation = undefined;

	var _graphql = __webpack_require__(4);

	var _graphqlRelay = __webpack_require__(6);

	var _database = __webpack_require__(7);

	var _database2 = _interopRequireDefault(_database);

	var _Model = __webpack_require__(9);

	var _UserStore = __webpack_require__(10);

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

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("express-graphql");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ }
/******/ ]);