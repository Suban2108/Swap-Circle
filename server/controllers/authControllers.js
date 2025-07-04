import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import { OAuth2Client } from 'google-auth-library'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
})

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  maxAge: 24 * 60 * 60 * 1000,
}

// REGISTER
const registerByEmail = async (req, res) => {
  try {
    const { email, password, name, role } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: 'User already exists' })

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ name, email, password: hashedPassword, role })
    await user.save()

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    console.log("[Register] Token:", token)

    res.cookie("token", token, COOKIE_OPTIONS)
    res.cookie("userId", user._id.toString(), {
      ...COOKIE_OPTIONS,
      httpOnly: false,
    })

    res.status(201).json({
      message: 'User created successfully',
      userId: user._id,
      role: user.role
    })

  } catch (error) {
    console.error("Register Error:", error)
    res.status(500).json({ message: 'Error creating user', error: error.message })
  }
}

// LOGIN
const loginByEmail = async (req, res) => {
  try {
    const { email, password, role } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid email or password' })

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) return res.status(401).json({ message: 'Invalid email or password' })

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    console.log("[Login] Token:", token)

    res.cookie("token", token, COOKIE_OPTIONS)
    res.cookie("userId", user._id.toString(), {
      ...COOKIE_OPTIONS,
      httpOnly: false,
    })

    res.status(200).json({
      message: 'Login successful',
      userId: user._id,
      role: user.role
    })

  } catch (error) {
    console.error("Login Error:", error)
    res.status(500).json({ message: 'Error logging in', error: error.message })
  }
}

// GOOGLE LOGIN
const googleByLogin = async (req, res) => {
  try {
    const { token } = req.body
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    const { name, email, picture } = payload

    let user = await User.findOne({ email })
    if (!user) {
      user = new User({
        name,
        email,
        password: 'google-auth',
        profilePic: picture,
        role: 'user'
      })
      await user.save()
    }

    const authToken = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    console.log("[Google Login] Token:", authToken)

    res.cookie("token", authToken, COOKIE_OPTIONS)
    res.cookie("userId", user._id.toString(), {
      ...COOKIE_OPTIONS,
      httpOnly: false,
    })

    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        role: user.role
      },
      message: 'Login success'
    })
  } catch (err) {
    console.error('Google OAuth Error:', err)
    res.status(401).json({ message: 'Unauthorized' })
  }
}

// LOGOUT
const logoutUser = (req, res) => {
  res.clearCookie("token", COOKIE_OPTIONS)
  res.clearCookie("userId", {
    ...COOKIE_OPTIONS,
    httpOnly: false,
  })

  console.log("[Logout] Cookies cleared")
  res.status(200).json({ message: "Logged out successfully" })
}

// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ message: 'Email is required' })

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(200).json({ message: 'If this email exists, a reset link will be sent' })
    }

    const resetToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    user.resetPasswordToken = hashedToken
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000
    await user.save()

    const resetUrl = `${process.env.FRONTEND_URL}/login?mode=reset-password&token=${resetToken}`

    await transporter.sendMail({
      to: user.email,
      from: process.env.EMAIL_FROM,
      subject: '🔐 Reset Your Password - Swap Circle',
      html: `Click here to reset: <a href="${resetUrl}">Reset Password</a>`
    })

    res.status(200).json({ message: 'A reset link has been sent to your email.' })
  } catch (err) {
    console.error("Forgot Password Error:", err)
    res.status(500).json({ message: 'Server error' })
  }
}

// RESET PASSWORD
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

    const hashed = await bcrypt.hash(password, 10);

    user.password = hashed;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful. Please login.' });
  } catch (error) {
    console.error('Reset error:', error);
    res.status(500).json({ message: 'Something went wrong. Try again later.' });
  }
}

export {
  loginByEmail,
  registerByEmail,
  googleByLogin,
  logoutUser,
  resetPassword,
  forgotPassword
}
