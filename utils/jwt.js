import jwt from 'jsonwebtoken';

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET no está definido en las variables de entorno');
  }

  return secret;
};

export const createToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    name: user.name
  };

  return jwt.sign(payload, getJwtSecret(), { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
};

export const verifyToken = (token) => jwt.verify(token, getJwtSecret());
