import User from '../models/users.model.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener usuarios', error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener el usuario', error: error.message });
  }
};

export const postUser = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const user = new User({ name, username, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear usuario', error: error.message });
  }
};

export const putUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, username, password } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { name, username, password },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar usuario', error: error.message });
  }
};

export const delUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    res.json({ msg: 'Usuario eliminado', user });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar usuario', error: error.message });
  }
};
