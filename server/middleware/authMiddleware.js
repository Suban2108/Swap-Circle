import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

// ✅ Utility: Extract token from cookie or header
const extractToken = (req) => {
  // First, try from HttpOnly cookie
  if (req.cookies && req.cookies.token) {
    return req.cookies.token
  }

  // Fallback to Authorization header
  const authHeader = req.headers["authorization"]
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1]
  }

  return null
}

// Middleware: Bearer Token in header
export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1] // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: "Access token required" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")

    const user = await User.findById(decoded.userId).select("-password")
    if (!user) {
      return res.status(401).json({ message: "Invalid token - user not found" })
    }

    req.user = user
    next()
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" })
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" })
    }
    return res.status(500).json({ message: "Token verification failed" })
  }
}

// ✅ Middleware: Protect routes (authenticated users only)
export const protect = async (req, res, next) => {
  try {
    const token = extractToken(req)

    if (!token) {
      return res.status(401).json({ message: "Access token missing" })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId).select("-password")

    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }

    // Attach user to request object
    req.user = user
    next()
  } catch (error) {
    let message = "Token verification failed"

    if (error.name === "TokenExpiredError") {
      message = "Token expired"
    } else if (error.name === "JsonWebTokenError") {
      message = "Invalid token"
    }

    return res.status(401).json({ message })
  }
}


// ✅ Middleware: Check if logged-in user owns the item
export const checkItemOwnership = async (req, res, next) => {
  try {
    const Item = (await import("../models/itemModel.js")).default
    const item = await Item.findById(req.params.id)

    if (!item) {
      return res.status(404).json({ message: "Item not found" })
    }

    if (item.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied. You can only modify your own items." })
    }

    req.item = item
    next()
  } catch (error) {
    return res.status(500).json({ message: "Authorization check failed", error: error.message })
  }
}

// Middleware: Token in Header
export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token: user not found',
      })
    }

    req.user = user
    next()
  } catch (error) {
    console.error("Auth error:", error.message)
    res.status(401).json({
      success: false,
      message: 'Token verification failed',
    })
  }
}

// ✅ Middleware: Admin access only
export const adminAuth = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next()
  }

  return res.status(403).json({
    success: false,
    message: "Access denied. Admins only.",
  })
}