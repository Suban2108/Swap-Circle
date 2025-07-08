import User from "../models/userModel.js";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";

// @desc Get current user from token
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate("circleId", "name")
      .populate("joinedEvents", "title date");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to get user", error: error.message });
  }
};

// @desc Update current user
export const updateUser = async (req, res) => {
  try {
    const updates = req.body;

    if (updates.password) {
      return res.status(400).json({ message: "Use a dedicated route to update password" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error: error.message });
  }
};

// @desc Delete current user
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user._id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};

// @desc Get users by circle ID
export const getUsersByCircle = async (req, res) => {
  try {
    const { circleId } = req.params;
    const users = await User.find({ circleId }).select("-password");

    if (!users.length) {
      return res.status(404).json({ message: "No users found in this circle" });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

// @desc Upload avatar image
export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No image uploaded" });

    const imagePath = `/uploads/${req.file.filename}`;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.avatar?.startsWith("/uploads")) {
      const oldPath = path.join(process.cwd(), "uploads", path.basename(user.avatar));
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    user.avatar = imagePath;
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      message: "Image uploaded",
      avatar: imagePath,
      user: userResponse,
    });
  } catch (err) {
    console.error("Image upload error:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

// @desc Get user by email
export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email })
      .select("-password")
      .populate("circleId", "name")
      .populate("joinedEvents", "title date");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user by email", error: error.message });
  }
};

export const sendContactMail = async (req, res) => {
  const { name, email, subject, message, inquiryType } = req.body

  if (!name || !email || !subject || !message || !inquiryType) {
    return res.status(400).json({ success: false, message: "All fields are required" })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER_FOR_CONTACT,     // e.g., nexus14925@gmail.com
        pass: process.env.MAIL_PASS_FOR_CONTACT     // Gmail App Password
      }
    })

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "nexus14925@gmail.com", // fixed recipient
      subject: `[${inquiryType.toUpperCase()}] ${subject}`,
      html: `
  <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
    <h2 style="color: #1e3a8a; text-align: center; margin-bottom: 24px;">📩 New Message from SwapCircle Contact Form</h2>
    
    <table style="width: 100%; font-size: 15px; color: #111827;">
      <tr>
        <td style="font-weight: bold; padding: 8px 0;">👤 Name:</td>
        <td>${name}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; padding: 8px 0;">📧 Email:</td>
        <td><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
      </tr>
      <tr>
        <td style="font-weight: bold; padding: 8px 0;">📂 Inquiry Type:</td>
        <td style="text-transform: capitalize;">${inquiryType}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; padding: 8px 0;">📝 Subject:</td>
        <td>${subject}</td>
      </tr>
    </table>

    <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;" />

    <div style="color: #374151; font-size: 15px; line-height: 1.6;">
      <p style="margin-bottom: 4px;"><strong>📨 Message:</strong></p>
      <div style="background-color: #f3f4f6; padding: 16px; border-radius: 6px; white-space: pre-wrap;">
        ${message.replace(/\n/g, "<br />")}
      </div>
    </div>

    <p style="font-size: 13px; color: #6b7280; text-align: center; margin-top: 32px;">
      © ${new Date().getFullYear()} SwapCircle · All rights reserved
    </p>
  </div>
`
    })

    res.status(200).json({ success: true, message: "Email sent successfully" })
  } catch (error) {
    console.error("Email error:", error)
    res.status(500).json({ success: false, message: "Failed to send email", error: error.message })
  }
}