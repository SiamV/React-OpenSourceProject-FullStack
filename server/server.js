import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt-nodejs';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path'

import config from "../config.js";
import jwtStrategy from './manager/passport.js';
import auth from './manager/rolesMiddleware.js';

const app = express();
const __dirname = path.resolve(); //for ES6

const middleware = [
    cors(),
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
    // express.static(`${__dirname}/client/uploaded`)
]
middleware.forEach((it) => app.use(it))
app.use('/img', express.static(__dirname + '/client/uploaded')); //why doesn't work?

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
    "tour": String
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

app.get('/', (req, res) => {
    res.send('Hello server')
})

    //work with tours
app.get("/api/v1/tours", async (req, res) => {
    const tours = await Tour.find({})
    res.send(tours)
})

app.post("/api/v1/add/tours", async (req, res) => {
	const tour = await new Tour({
        tourTitle: req.body.tourTitle,
		tour: req.body.tour
	})
	tour.save()
	res.send(tour)
})

app.delete("/api/v1/delete/tours/:id", async (req, res) => { //not use, need check
    try {
        await Tour.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Tour doesn't exist!" })
    }
})

    //API work with photos (formidable)
app.get('/api/v1/get/photo/:name', function (req, res){
    res.sendFile(__dirname + '/client/uploaded/' + req.params.name);
});

app.post('/api/v1/add/photo', (req, res, next) => {
    const form = formidable({ multiples: true});

    form.parse(req, (err, fields, files) => {
        const oldPath = files.image.path;
        const newPath = path.join(__dirname, '/client/uploaded/') + files.image.name
        const rawData = fs.readFileSync(oldPath)

        fs.writeFile(newPath, rawData, function(err){
            if(err) console.log(err)
            return res.send("Photo is uploaded")
        })
        // console.log('fields:', fields);
        // console.log('files:', files);
    });
});

    //for registration new user
app.post("/api/v1/auth/add/user", async (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })
    user.save()
    res.send(user)
})

    //for login and create token
app.post("/api/v1/auth/user", async (req, res) => {
    try {
        const user = await User.findAndValidateUser(req.body)

        const payload = {
            uid: user._id
        }
        const token = jwt.sign(payload, config.secret, {
            expiresIn: '48h'
        })
        delete user.password
        res.cookie('token', token, {
            maxAge: 1000 * 60 * 60 * 48
        })
        res.json({
            status: 'ok',
            token,
            user
        })
    } catch (err) {
        res.json({
            status: 'error authentication',
            err
        })
    }
})

    //for authorization
app.get("/api/v1/authorization",
    async (req, res) => {
        if (req.method === 'OPTIONS') {
            return next()
        }
        try {
            //decoded token in cookie
            const decoded = jwt.verify(req.cookies.token, config.secret)
            const user = await User.findById(decoded.uid)

            //if have a cookie then
            const payload = {
                uid: user._id
            }
            const token = jwt.sign(payload, config.secret, {
                expiresIn: '48h'
            })
            delete user.password
            res.cookie('token', token, {
                maxAge: 1000 * 60 * 60 * 48
            })
            res.json({
                status: 'ok',
                token,
                user
            })
        } catch (err) {
            res.json({
                status: 'error authorization',
                err
            })
        }
    })

    //secret route. Only for admin
app.get("/api/v1/admin", auth(['admin']),
    async (req, res) => {
        res.json({
            status: 'ok'
        })
    })