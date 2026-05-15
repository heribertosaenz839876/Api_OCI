import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/users.model.js';
import { hashPassword, isHashedPassword } from '../utils/hashPassword.js';

try {
  await mongoose.connect(process.env.URI);
  console.log('MongoDB connected');

  const users = await User.find();
  let updatedUsers = 0;

  for (const user of users) {
    if (!isHashedPassword(user.password)) {
      user.password = hashPassword(user.password);
      await user.save();
      updatedUsers++;
      console.log(`Contraseña actualizada para: ${user.username}`);
    }
  }

  console.log(`Proceso terminado. Usuarios actualizados: ${updatedUsers}`);
} catch (error) {
  console.error('Error al actualizar contraseñas:', error.message);
} finally {
  await mongoose.disconnect();
}
