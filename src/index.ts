import express, { Application } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import {engine} from "express-handlebars";
import { config } from './config';
// passport
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
// Routers
import productsRoutersViews from './routers/views/productos';
import carritoRoutersViews from './routers/views/carritos';
import authRoutersViews from './routers/views/auth';
import productsRouters from './routers/productos';
import carritoRouters from './routers/carritos';
import authRouters from './routers/auth';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3001;

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

// Routes
app.use('/api/auth', authRouters);
app.use('/api/productos', productsRouters);
app.use('/api/carrito', carritoRouters);

app.use('/auth', authRoutersViews);
app.use('/productos', productsRoutersViews);
app.use('/carrito', carritoRoutersViews);

app.listen(port, () => {
  console.log(`Server run http://localhost:${port}`);
});
