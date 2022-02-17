import { Request, Response, Router } from 'express';
import { usuariosDao as usuariosApi } from '../daos/index';
// passport
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
// util
import { createHash, isValidPassword } from '../utilitario/encrypt';

const router = Router();

passport.use(
  'local-login',
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req: Request, usuario: string, password: string, done) => {
    console.log('local-login')
    console.log('local-login => req.body', req.body);
    let users = await usuariosApi.getAll();
    const user = users.find((objUser: any) => {
      return objUser.usuario === usuario && isValidPassword(objUser, password)
    })

    if (user) {
      done(null, user);
      return;
    }
    done(null, false);
  })
)

passport.use(
  'local-signup',
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req: Request, usuario, password, done) => {

    console.log('local-signup => req.body', req.body);
    let users = await usuariosApi.getAll();

    const user = users.find((objUser: any) => {
      return objUser.usuario === usuario
    })

    if (user) {
      console.log('El usuario ya existe!!');
      return done(null, false);
    }

    let newUsuario = {
      usuario: usuario,
      password: createHash(password)
    };

    const usuarioSave = await usuariosApi.save(newUsuario);
    console.log('usuario guardado correctamente!!')
    done(null, usuarioSave);
  })
)

passport.serializeUser((user: any, done) => {
  console.log('serializeUser');
  done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
  console.log('deserializeUser');
  let user = await usuariosApi.getById({ _id: id });
  done(null, user);
})

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/successlogin',
  failureRedirect: '/faillogin'
}))

router.post('/register', passport.authenticate('local-signup', {
  successRedirect: '/login',
  failureRedirect: '/failregister'
}))

export default router;