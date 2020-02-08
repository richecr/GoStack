import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import autoConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    // Transforma a função `jwt.verify` em uma promisse para usar async/await
    const decoded = await promisify(jwt.verify)(token, autoConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token not provided' });
  }
};
