import { Request, Response, Router } from 'express';
import { usuariosDao as usuariosApi } from '../../daos/index';
// passport
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
// util
import { createHash, isValidPassword } from '../../utilitario/encrypt';
// email
import { createTransport } from 'nodemailer'

const router = Router();

// email
const TEST_EMAIL = 'jacquelyn.hermiston98@ethereal.email';
const transporter = createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: TEST_EMAIL,
    pass: 'GzJVHaBKHmJpTvpE2q'
  }
});
// email

passport.use(
  'local-login',
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req: Request, usuario: string, password: string, done) => {
    console.log('local-login => req.body', req.body);
    let users = await usuariosApi.getAll();
    const user = users.find((objUser: any) => {
      return objUser.email === usuario && isValidPassword(objUser, password)
    })
    console.log('local-login => user', user);

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
    const body = req.body;
    let users = await usuariosApi.getAll();

    const user = users.find((objUser: any) => {
      return objUser.usuario === usuario
    })

    if (user) {
      console.log('El usuario ya existe!!');
      return done(null, false);
    }

    let newUsuario = {
      email: usuario,
      password: createHash(password),
      name: body.name,
      address: body.address,
      age: body.age,
      phoneNumber: body.phoneNumber,
      avatar: body.avatar
    };

    const usuarioSave = await usuariosApi.save(newUsuario);
    console.log('usuario guardado correctamente!!');
    const htmlMensaje = `<div>
    <h1>Nuevo Registro</h1>                
    <span style="color: green;">Name:</span>
    <p>${newUsuario.name}</p>
    <span style="color: green;">Email:</span>
    <p>${newUsuario.email}</p>
    <span style="color: green;">address:</span>
    <p>${newUsuario.address}</p>
    <span style="color: green;">phoneNumber:</span>
    <p>${newUsuario.phoneNumber}</p>
    </div>`
    try {
      const mailOptions = {
        from: 'Servidor Node.js',
        to: TEST_EMAIL,
        subject: 'Mail de prueba desde Node.js',
        html: htmlMensaje
      }
      let info = await transporter.sendMail(mailOptions);
      console.log(info);
      console.log(`Email enviado a ${TEST_EMAIL}`);
    } catch (error) {
      console.log(error);
    }
    done(null, usuarioSave);
  })
)

passport.serializeUser((user: any, done) => {
  console.log('serializeUser');
  done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
  console.log('deserializeUser');
  let user = await usuariosApi.getById(id);
  done(null, user);
})

router.post('/login', 
  passport.authenticate('local-login', {
    successRedirect: '/productos',
    failureRedirect: '/auth/faillogin'
  })
)

router.post('/register', passport.authenticate('local-signup', {
  successRedirect: '/auth/login',
  failureRedirect: '/auth/failregister'
}))

router.get('/register', (req, res) => {
  res.render('register', {
    layout: 'index'
  })
});

router.get('/login', (req, res) => {
  res.render('login', {
    layout: 'index'
  })
});

router.get('/faillogin', (req, res) => {
  res.render('faillogin', {
    layout: 'index'
  })
});

router.get('/logout', (req: any, res: Response) => {
  console.log('logout')
  // const name = req.session.name.user;
  const name = req.user.name;
  console.log("MongoStore");
  console.log(req.sessionID);

  req.session.destroy((err: any) => {
    if (err) {
      console.log('Error en Logout');
    }
    res.render('logout', {
      layout: 'index',
      user: name
    })
  });
})

export default router;