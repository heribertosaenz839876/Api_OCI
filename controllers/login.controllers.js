import User from '../models/users.model.js';
import { comparePassword } from '../utils/hashPassword.js';

const removePassword = (user) => {
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        login: false,
        msg: 'Usuario y contraseña son obligatorios',
        user: {}
      });
    }

    const user = await User.findOne({ username });

    if (!user || !comparePassword(password, user.password)) {
      return res.status(401).json({
        login: false,
        msg: 'Usuario o contraseña incorrectos',
        user: {}
      });
    }

    res.json({
      login: true,
      msg: 'ok',
      user: removePassword(user)
    });
  } catch (error) {
    res.status(500).json({
      login: false,
      msg: 'Error en el servidor',
      error: error.message
    });
  }
};
