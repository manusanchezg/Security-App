import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/config';
import { getCookie, setCookie } from 'typescript-cookie';
const routes = require('./routes/index');
const cookieParser = require('cookie-parser');

const app = express();

app.set('port', config.PORT);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use((req, res, next) => {
   console.log(getCookie('id'));
   next();
})

app.use('/', routes);

export default app;