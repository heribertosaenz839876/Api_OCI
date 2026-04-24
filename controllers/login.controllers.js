import User from "../models/users.model.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        login: false,
        msg: "Usuario y contraseña son obligatorios",
        user: {}
      });
    }

    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({
        login: false,
        msg: "Usuario o contraseña incorrectos",
        user: {}
      });
    }

    res.json({
      login: true,
      msg: "ok",
      user
    });
  } catch (error) {
    res.status(500).json({
      login: false,
      msg: "Error en el servidor",
      error: error.message
    });
  }
};
