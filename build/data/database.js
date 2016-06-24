"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require("sequelize");

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