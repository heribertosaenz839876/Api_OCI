import { verifyToken } from '../utils/jwt.js';

export const validateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: 'Token requerido' });
  }

  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ msg: 'Formato de token inválido. Usa: Bearer <token>' });
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token inválido o expirado', error: error.message });
  }
};
