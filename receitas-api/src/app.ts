import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import healthRoute from './routes/health.route';
import authRoutes from './routes/auth.routes';
import { validateEnv } from './config/env';
import { notFoundHandler, errorHandler } from './middlewares/error.middleware';
import recipeRoutes from './routes/recipe.routes';
import categoryRoutes from './routes/category.routes';
const app = express();

validateEnv();

app.use(helmet());
app.use(cors({
  origin: true,      
  credentials: true, 
}));
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  swaggerOptions: { persistAuthorization: true },
}));
app.get('/docs.json', (_req, res) => res.json(swaggerSpec));

app.use('/api/health', healthRoute);
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/categories', categoryRoutes);


app.use(notFoundHandler);

app.use(errorHandler);

export default app;
