import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication failed. Token missing or invalid'});
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decodedToken.userId, email: decodedToken.email };
    next();
  } catch (err) {
    console.error('[JWT ERROR]', err.message);
    res.status(403).json({ message: 'Authentication failed. Token could not be verified' });
  }
}

export default checkAuth;