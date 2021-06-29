import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

const auth = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next;
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'You are not authorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
  } catch (e) {
    res.status(401).json({ message: 'You are not authorized' });
  }
};

export default auth;
