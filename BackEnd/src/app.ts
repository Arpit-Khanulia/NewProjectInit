import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// middlewares
app.use(
  cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes import
import auth from './routes/auth.routes';
import aggregate from './routes/aggregate.routes';
import protectedRoutes from './routes/protected.routes';

// routes
app.use('/', auth);
app.use('/aggregate', aggregate);
app.use('/', protectedRoutes);

export { app };
