
// Auth route controller for login and register endpoints

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import { OAuth2Client } from 'google-auth-library'
const client = new OAuth2Client(process.env.CLIENT_ID);


// Register controller 
const registerByEmail = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = new User({
      password: hashedPassword,
      name,
      email
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      userId: user._id
    });

  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};


// Login controller
const loginByEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      userId: user._id
    });

  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

//Login By Google
const googleByLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { name, email, picture } = payload;

    // TODO: Find or create user in DB

    return res.status(200).json({
      user: { name, email, picture },
      message: 'Login success',
    });
  } catch (err) {
    console.error('OAuth Error:', err);
    res.status(401).json({ message: 'Unauthorized' });
  }
}

export {loginByEmail,registerByEmail,googleByLogin}