import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { createHash, isValidPassword } from '../helpers/utils.js';
import UserManager from '../dao/UserManager.js';

const options = {
    usernameField: 'email',
    passReqToCallback: true,
}

export const init = () => {
    passport.use('register', new LocalStrategy(options, async (req, email, password, done) => {
        try {
            const user = await UserManager.getByMail(email);
            if (user) {
                return done(new Error('User already registered'));
            }
            const newUser = await UserManager.create({
                ...req.body,
                password: createHash(password)
            })
            done(null, newUser);

        } catch (error) {
            done(new Error(`Ocurrio un error durante la autenticacion ${error.message}.`));
        }
    }))

    passport.use('login', new LocalStrategy(options, async (req, email, password, done) => {
        try {
            const user = await UserManager.getByMail(email);
            if (!user) {
                return done(new Error('Correo o contraseña invalidos 😨'));
            }
            const isPassValid = isValidPassword(password, user);
            if (!isPassValid) {
                return done(new Error('Correo o contraseña invalidos 😨'));
            }
            done(null, user);
        } catch (error) {
            done(new Error(`Ocurrio un error durante la autenticacion ${error.message}.`));
        }
    }))
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (uid, done) => {
        const user = await UserManager.getById(uid);
        done(null, user);
    });
}
