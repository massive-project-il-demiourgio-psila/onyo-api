import passport from 'passport'

const authJwt = passport.authenticate('jwt', { session: false })

export default authJwt
