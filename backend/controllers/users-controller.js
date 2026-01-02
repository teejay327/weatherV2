import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const signup = async(req,res) => {
  const { email,password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required!"});
  };

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        password: hashedPassword
    });

    await newUser.save();

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret not configured!"});
    }

    // generate jwt for auto-login
    const token = jwt.sign(
      {userId: newUser.id, email: newUser.email},
      process.env.JWT_SECRET,
      {expiresIn: '1d'}
    );

    // respond with user details and token
    return res.status(201).json({
      userId: newUser.id,
      email: newUser.email,
      token
    });
  } catch(err) {
    console.error("[Signup] error:", err?.message || err);
    return res.status(500).json({message: 'Signup failed' });
  }
};

//Login controller
const login = async(req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required!"});
  };

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(403).json({ message: 'Invalid email or password'});
    }

    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) {
      return res.status(403).json({ message: 'Invalid email or password'});
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret not configured!"});
    }

    const token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      userId: existingUser.id,
      email: existingUser.email,
      token
    });
  } catch(err) {
    console.error('[Login] error:', err?.message || err);
    return res.status(500).json({message: 'Login failed' });
  }
};

const validateToken = async(req,res) => {
  try {
    const {userId,email} = req.userData;

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'user not found'});
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT_SECRET not configured!"});
    }

    const newToken = jwt.sign(
      { userId,email},
      process.env.JWT_SECRET,
      { expiresIn: '1d'}
    );

    return res.status(200).json({
      message: 'token valid',
      token: newToken,
      email,
      userId
    });

  } catch(err) {
    console.error('[ValidateToken] error:', err?.message || err);
    return res.status(500).json({ message: 'token validation failed' });
  }
};

export default { signup, login, validateToken };