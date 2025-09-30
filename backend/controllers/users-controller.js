import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const signup = async(req,res) => {
  const { email,password } = req.body;

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

    // generate jwt for auto-login
    const token = jwt.sign(
      {userId: newUser.id, email: newUser.email},
      process.env.JWT_SECRET,
      {expiresIn: '1d'}
    );

    // respond with user details and token
    res.status(201).json({
      userId: newUser.id,
      email: newUser.email,
      token
    });
  } catch(err) {
    console.error({message: 'Signup failed', detail: err.message});
  }
}

//Login controller
const login = async(req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(403).json({ message: 'Invalid credentials'});
    }

    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) {
      return res.status(403).json({ message: 'Invalid email or password'});
    }

    const token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      userId: existingUser.id,
      email: existingUser.email,
      token
    });
  } catch(err) {
    console.error('[Login] error:', err);
    res.status(500).json({message: 'Login failed', detail: err.message});
  }
};

export default { signup, login };