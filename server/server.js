import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt-nodejs';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import path from 'path'

import config from "./config.js";
import jwtStrategy from './manager/passport.js';
import routerTour from "./endPoints/routerTour.js";
import routerUsers from "./endPoints/routerUsers.js";
import routerPhotos from "./endPoints/routerPhotos.js";

const app = express();
const __dirname = path.resolve(); //for ES6

const middleware = [
    cors(),
    express.json(),
    passport.initialize(),
    bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 50000
    }),
    bodyParser.json({
        limit: '50mb',
        extended: true
    }),
    cookieParser(),
    express.static(path.join(__dirname))
]
middleware.forEach((it) => app.use(it))

passport.use('jwt', jwtStrategy) //JsonWebToken logic

const userSchema = new mongoose.Schema({
    "id": Number,
    "email": {
        type: String,
        require: true,
        unique: true
    },
    "password": {
        type: String,
        require: true
    },
    "role": {
        type: [String],
        default: ["user"]
    }
}, {
    versionKey: false
})

const userSchemaTours = new mongoose.Schema({
    "tourTitle": String,
    "tour": String,
    "category": String,
    "seoTitle": String,
    "seoDescription": String
}, {
    versionKey: false
})

//function is done before create new user in DB. We hash the password before create user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    this.password = bcrypt.hashSync(this.password);
    return next();
})

//two functions for authentication (check passwords, hash and user's)
userSchema.method({
    passwordMatches(password) {
        return bcrypt.compareSync(password, this.password) //compare 2 password. hash and from user
    }
})
userSchema.statics = {
    async findAndValidateUser({
                                  email,
                                  password
                              }) {
        if (!email) {
            throw new Error('no email')
        }
        if (!password) {
            throw new Error('no password')
        }

        const user = await this.findOne({
            email
        }).exec()
        if (!user) {
            throw new Error('no user')
        }

        const isPasswordOk = await user.passwordMatches(password)
        if (!isPasswordOk) {
            throw new Error('password incorrect')
        }

        return user
    }
}

//connect to MongoDB
const url = config.url;
mongoose.connection.on('connected', () => {
    console.log('DB is connected')
});
mongoose.connection.on('error', (err) => {
    console.log(`cannot connect to db ${err}`)
    process.exit(1)
});
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(config.port, () => {
        console.log(`server is working http://localhost:${config.port}, project will be start http://localhost:8080`)
    });
})

//create collection DB
const User = mongoose.model('site1', userSchema, 'users');
export default User;

export const Tour = mongoose.model('tours', userSchemaTours);

//create REST API
//endPoints
app.use('', routerTour);
app.use('', routerPhotos);
app.use('', routerUsers);