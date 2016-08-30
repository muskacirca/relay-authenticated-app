import express from 'express'
import path from 'path'

import {Schema} from './data/schema';
import graphQLHTTP from 'express-graphql';

import DB from './data/database';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import crypto from 'crypto';

import multer from 'multer';
import fs from 'fs'

import _ from 'lodash';
import sanitize from 'sanitize-filename';

const server_port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../src/frontend/index.html"));
});

app.use('/style', express.static(path.resolve(__dirname, '../src/style')));
app.use('/utils', express.static(path.resolve(__dirname, '../src/utils')));
app.use('/template', express.static(path.resolve(__dirname, '../src/frontend/public/template')));



app.get('/bundle.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../src/frontend/public/bundle.js"));
});


const storage = multer.memoryStorage();

const multerMiddleware = multer({ storage: storage }).fields([{name: 'image'}]);

const uploadMiddleWare = (req, res, next) => {
    multerMiddleware(req, res, () => {
        // request contains file data in req.files in format
        // {
        //   key: [{
        //     fieldname,
        //     originalname,
        //     encoding,
        //     mimetype,
        //     buffer,
        //     size
        //   }]
        // }

        // convert to array in format
        // [
        //   [fieldname, originalname ...]
        // ]
        const files = _.values(req.files);

        if (!files || files.length === 0) {
            next();
            return;
        }

        // Parse variables so we can add to them. (express-graphql won't parse them again once populated)
        req.body.variables = JSON.parse(req.body.variables);

        files.forEach(fileArray => {
            console.log("there's a file");
            const file = fileArray[0];
            const filename = Date.now() + '_' + sanitize(file.originalname.replace(/[`~!@#$%^&*()_|+\-=÷¿?;:'",<>\{\}\[\]\\\/]/gi, ''));

            // save file to disk
            const filePath = path.join(__dirname, '../src/images', filename);
            fs.writeFileSync(filePath, file.buffer);

            // add files to graphql input. we only support single images here
            req.body.variables.input_0[file.fieldname] = '/images/'+filename;
        });

        next();
    });
};

app.use('/graphql', uploadMiddleWare);

app.use('/graphql', graphQLHTTP({ schema: Schema, pretty: true, graphiql: true}));


app.post('/api/authenticate', (request, response) => {

    DB.models.user
        .findOne({where: {login: request.body.login}})
        .then((user) => {

            let password = crypto.createHash("sha256").update(request.body.password).digest("base64");
            if (user.password != password) {

                response.json({
                    success: false,
                    message: 'Bad authentication'
                });
            } else {

                let decoded = jwt.sign(user.dataValues, 'secret', {
                    expiresIn: 600
                });
                
                response.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: decoded
                });
            }

        })
        .catch((error) => {
            console.log(error);
            response.json({
                success: false,
                message: 'Unhandled error'
            });
        });
});

app.listen(server_port, (err) => {
    if(err) return console.log(err);
    console.log('Server is now running on port ' + server_port);
});


