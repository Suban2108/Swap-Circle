import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import { OAuth2Client } from 'google-auth-library'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

const client = new OAuth2Client(process.env.CLIENT_ID)

const transporter = nodemailer.createTransport({
  service: 'Gmail', // or use SMTP config
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
})

// Register controller
const registerByEmail = async (req, res) => {
  try {
    const { email, password, name } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: 'User already exists' })

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = new User({ name, email, password: hashedPassword })
    await user.save()

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.status(201).json({ message: 'User created successfully', token, userId: user._id })

  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message })
  }
}

// Login controller
const loginByEmail = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid email or password' })

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) return res.status(401).json({ message: 'Invalid email or password' })

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.status(200).json({ message: 'Login successful', token, userId: user._id })

  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message })
  }
}

// Google login
const googleByLogin = async (req, res) => {
  try {
    const { token } = req.body

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    const { name, email, picture } = payload

    // Find or create user
    let user = await User.findOne({ email })
    if (!user) {
      user = new User({ name, email, password: 'google-auth', profilePic: picture })
      await user.save()
    }

    const authToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.status(200).json({
      user: { name: user.name, email: user.email, profilePic: user.profilePic },
      token: authToken,
      message: 'Login success',
    })
  } catch (err) {
    console.error('OAuth Error:', err)
    res.status(401).json({ message: 'Unauthorized' })
  }
}

// Forgot Password controller
const forgotPassword = async (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ message: 'Email is required' })

  try {
    const user = await User.findOne({ email })
    if (!user) {
      // Don't reveal user existence
      return res.status(200).json({ message: 'If this email exists, a reset link will be sent' })
    }

    const resetToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    user.resetPasswordToken = hashedToken
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 15 // 15 min
    await user.save()

    const resetUrl = `${process.env.FRONTEND_URL}/login?mode=reset-password&token=${resetToken}`;

    await transporter.sendMail({
      to: user.email,
      from: process.env.EMAIL_FROM,
      subject: '🔐 Reset Your Password - Swap Circle',
      html: `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; border: 1px solid #eaeaea; padding: 32px; border-radius: 8px; background-color: #ffffff;">
      <div style="text-align: center;">
        <h2 style="color: #333;">🔄 Reset Your Password</h2>
        <p style="font-size: 16px; color: #555;">Hi ${user.name || ''},</p>
        <p style="font-size: 16px; color: #555;">You recently requested to reset your password for your <strong>Swap Circle</strong> account. Click the button below to reset it:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #2D9CDB; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0;">
          Reset Password
        </a>
        <p style="font-size: 14px; color: #888;">This link will expire in 15 minutes.</p>
        <hr style="margin: 32px 0; border: none; border-top: 1px solid #eaeaea;" />
        <p style="font-size: 12px; color: #aaa;">If you didn’t request this, please ignore this email. Your password will remain unchanged.</p>
        <p style="font-size: 12px; color: #aaa;">Need help? Reach us at support@swapcircle.com</p>
      </div>
    </div>
  `,
    });


    res.status(200).json({ message: 'A reset link has been sent to your email !!!' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

const resetPassword = async (req, res) => {
  const { email, password, confirmPassword, token } = req.body;

  try {
    if (!token || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      email,
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(403).json({ message: 'Token is invalid or has expired.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    user.password = hashed;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful. Please login.' });
  } catch (error) {
    console.error('Reset error:', error);
    res.status(500).json({ message: 'Something went wrong. Try again later.' });
  }
};

export { loginByEmail, registerByEmail, googleByLogin, forgotPassword, resetPassword }
