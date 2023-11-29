import {
    Strategy as JwtStrategy,
    StrategyOptions,
    ExtractJwt,
    VerifyCallback,
    VerifiedCallback
} from 'passport-jwt'
import { env } from '../../utils/config';

const { iss, aud, accessTokenSecret, accessTokenAge } = env.jwt

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: accessTokenSecret,
    issuer: iss,
    audience: aud,
    jsonWebTokenOptions: {
        maxAge: accessTokenAge
    }
}

const verify: VerifyCallback = (payload: any, done: VerifiedCallback) => {
    if (payload.sub === null || payload.sub === undefined) {
        return done(new Error("Token doesn't contain valid payload"), false);
    }
    return done(null, payload);
}

export const jwtStrategy = () => new JwtStrategy(opts, verify);
