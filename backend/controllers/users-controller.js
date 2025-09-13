import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const signup = async(req,res) => {
  const { email,password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ message: 'User already exists' });
    }
  } catch(err) {
    return res.status(500).json({ message: 'Signing up failed' });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch(err) {
    return res.status(500).json({ message: 'Could not create user' });
  }

  const newUser = new User({
    email,
    password: hashedPassword
  });

  try {
    await newUser.save();
  } catch(err) {
    return res.status(500).json({ message: 'Signup failed while saving' })
  }

  res.status(201).json({ userId: newUser.id, email: newUser.email });
}

//Login controller
const login = async(req, res) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(403).json({ message: 'Invalid credentials'});
    }
  } catch (err) {
    return res.status(500).json({ message: 'Login failed'});
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) {
      return res.status(403).json({ message: 'Invalid email or password'});
    }
  } catch (err) {
      return res.status(500).json({ message: 'Could not log you in'});
  }
  
  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
  } catch (err) {
    return res.status(500).json({ message: 'Login failed: Could not generate token'});
  }

  res.status(200).json({
    userId: existingUser.id,
    email: existingUser.email,
    token
  });
};

export default { signup, login };