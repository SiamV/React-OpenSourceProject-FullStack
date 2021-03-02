import Router from 'express';
import jwt from "jsonwebtoken";

import config from "../config.js";
import auth from "../manager/rolesMiddleware.js";
import User from "../server.js";

const routerUsers = new Router();

//for registration new user
routerUsers.post("/api/v1/auth/add/user", async (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })
    user.save()
    res.send(user)
})

//for login and create token
routerUsers.post("/api/v1/auth/user", async (req, res) => {
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
routerUsers.get("/api/v1/authorization",
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
routerUsers.get("/api/v1/admin", auth(['admin']),
    async (req, res) => {
        res.json({
            status: 'ok'
        })
    })

export default routerUsers;