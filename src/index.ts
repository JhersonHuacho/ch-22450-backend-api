import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { config } from './config';
import cors from 'cors';
import {engine} from "express-handlebars";
// const exphbs = require("express-handlebars");
// passport
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
// email
import { createTransport } from 'nodemailer'
// Routers
import productsRouters from './routers/views/productos';
import carritoRouters from './routers/views/carritos';
import authRouters from './routers/auth';
import { usuariosDao  as usuariosApi } from './daos/index';
// util
import { createHash, isValidPassword } from './utilitario/encrypt';
import path from 'path';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8080;

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

app.use(cors());
app.use('/static', express.static(path.join(__dirname,"/public")));
// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/****** PASSPORT *****************/
// Persistencia por MongoDB
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongodb.cnxStrAtlas,
      // mongoOptions: advancedOptions,
      ttl: 600
    }),
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
  })
)
app.use(passport.initialize());
app.use(passport.session());

// Set
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "hbs");
app.engine(
  'hbs',
  engine({
    extname: 'hbs',
    layoutsDir: path.join(__dirname,"/views/layouts"),
    defaultLayout: 'index',
    partialsDir: path.join(__dirname,"/views/partials")
  })
);

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

// Routes
// app.use('/api/auth', authRouters);

app.post('/auth/login', 
  passport.authenticate('local-login', {
    successRedirect: '/productos',
    failureRedirect: '/auth/faillogin'
  })
)

app.post('/auth/register', passport.authenticate('local-signup', {
  successRedirect: '/auth/login',
  failureRedirect: '/auth/failregister'
}))

app.get('/auth/register', (req, res) => {
  res.render('register', {
    layout: 'index'
  })
});

app.get('/auth/login', (req, res) => {
  res.render('login', {
    layout: 'index'
  })
});

app.get('/auth/faillogin', (req, res) => {
  res.render('faillogin', {
    layout: 'index'
  })
});

app.get('/auth/logout', (req: any, res: Response) => {
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

app.get('/test', (req, res) => {
  res.send('Hola Mundo');
});

// app.use('/api/productos', productsRouters);
// app.use('/api/carrito', carritoRouters);

app.use('/productos', productsRouters);
app.use('/carrito', carritoRouters);

app.listen(port, () => {
  console.log(`Server run http://localhost:${port}`);
});
