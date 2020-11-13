// import passportJWT from 'passport-jwt';

// import config from '../../config.js';
// import User from '../server.js';

const passportJWT = require('passport-jwt');

const config = require('../../config');
const User = require('../server.js');

const cookieExtractor = (req) => {
    return req && req.cookies && req.cookies.token
}

const jwtOption = {
    secretOrKey: config.secret,
    jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([cookieExtractor])
}

const jwtStrategy = new passportJWT.Strategy(jwtOption, (jwtPayload, done) => {
    User.findById(jwtPayload.uid, (err, user) => {
        if (err) {
            return done(err, null)
        }
        if (user) {
            return done(null, user)
        }
        return done(null, false)
    })
})


// export default jwtStrategy;
exports.jwt = jwtStrategy;