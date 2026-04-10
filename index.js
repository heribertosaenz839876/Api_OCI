import "dotenv/config"
import express from 'express';
import morgan from "morgan";
import router from './routes/index.routes.js';
import indexRoutes from "./routes/index.routes.js";
import usersRoutes from "./routes/users.routes.js";
import loginRoutes from "./routes/login.routes.js";
import { connectDB } from './utils/db.js';

connectDB()

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(router);
app.use(indexRoutes);
app.use(usersRoutes);
app.use(loginRoutes);

app.listen(PORT,()=>console.log(`http://localhost:${PORT}`));
