import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import indexRoutes from './routes/index.routes.js';
import usersRoutes from './routes/users.routes.js';
import loginRoutes from './routes/login.routes.js';
import { connectDB } from './utils/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(indexRoutes);
app.use(usersRoutes);
app.use(loginRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
