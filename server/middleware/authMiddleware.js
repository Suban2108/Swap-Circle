import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Extract JWT from Authorization header
const extractToken = (req) => {
  const authHeader = req.headers["authorization"];
  return authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;
};

// ✅ Middleware: Protect all authenticated routes
export const protect = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) return res.status(401).json({ message: "Access token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    const message =
      error.name === "TokenExpiredError"
        ? "Token expired"
        : error.name === "JsonWebTokenError"
        ? "Invalid token"
        : "Token verification failed";
    res.status(401).json({ message });
  }
};

// ✅ Middleware: Admin only
export const adminAuth = (req, res, next) => {
  if (req.user?.role === "admin") {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Access denied. Admins only.",
  });
};

// ✅ Middleware: Owner check
export const checkItemOwnership = async (req, res, next) => {
  try {
    const Item = (await import("../models/itemModel.js")).default;
    const item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Access denied. You can only modify your own items.",
      });
    }

    req.item = item;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Authorization check failed",
      error: error.message,
    });
  }
};
