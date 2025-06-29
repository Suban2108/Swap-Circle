import User from '../models/userModel.js';
import path from "path"
import fs from "fs"

// @desc    Get a single user by ID
// @route   GET /api/users/:id
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-password')
            .populate('circleId', 'name')
            .populate('joinedEvents', 'title date');

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get user', error: error.message });
    }
};

// @desc    Update user by ID
// @route   PUT /api/users/:id
export const updateUser = async (req, res) => {
    try {
        const updates = req.body;

        if (updates.password) {
            return res.status(400).json({ message: 'Use a dedicated route to update password' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user', error: error.message });
    }
};

// @desc    Delete a user by ID
// @route   DELETE /api/users/:id
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
};

// @desc    Get users by circleId
// @route   GET /api/users/circle/:circleId
export const getUsersByCircle = async (req, res) => {
    try {
        const { circleId } = req.params;

        const users = await User.find({ circleId }).select('-password');

        if (!users.length) {
            return res.status(404).json({ message: 'No users found in this circle' });
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
};

export const uploadProfileImage = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!req.file) {
            return res.status(400).json({ message: "No image uploaded" });
        }

        const imagePath = `/uploads/${req.file.filename}`;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Delete old avatar if it's a local upload
        if (user.avatar && user.avatar.startsWith("/uploads")) {
            const oldPath = path.join(process.cwd(), "uploads", path.basename(user.avatar));
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        // Update avatar path and save
        user.avatar = imagePath;
        await user.save();

        const userResponse = user.toObject();
        delete userResponse.password; // exclude password manually if needed

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
