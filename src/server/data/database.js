import Sequelize from 'sequelize'

var mysql_url =  process.env.PROD_URL || "localhost";
var mysql_schema =  process.env.PROD_SCHEMA || process.env.CLEARDB_DATABASE_SCHEMA || "services";
var mysql_user = process.env.PROD_USER || process.env.CLEARDB_DATABASE_USER || "services";
var mysql_pass = process.env.PROD_PASS || process.env.CLEARDB_DATABASE_PASS || "services";

const connection = process.env.CLEARDB_DATABASE_URL !== undefined ? new Sequelize(process.env.CLEARDB_DATABASE_URL, {
    pool: {
        max: 5,
        min: 1,
        idle: 10000
    },
})
    :  new Sequelize(mysql_schema, mysql_user, mysql_pass, {dialect: "mysql", host: mysql_url,
        logging: (param) => {param.indexOf("Executing (default):") !== -1 ? false : true}});


const shop = connection.define('shop', {

    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.STRING
    }

}, {timestamps: false});


connection.define('user', {
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        login: {type: Sequelize.STRING, unique: true},
        password: Sequelize.STRING,
        email: {type: Sequelize.STRING, unique: true},
        enabled: Sequelize.BOOLEAN
    } , {timestamps: false, tableName: 'users', freezeTableName: true,}
);

connection.sync({force: false});


export default connection
