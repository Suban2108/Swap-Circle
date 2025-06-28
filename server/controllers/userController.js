import '../models/circleModel.js'
import '../models/eventModel.js'
import User from '../models/userModel.js';

// GET /api/users/:id
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-password') // Exclude password from response
            .populate('circleId', 'name') // Populate circle (optional: adjust fields)
            .populate('joinedEvents', 'title date'); // Populate joinedEvents (optional)

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get user', error: error.message });
    }
};

// PUT /api/users/:id
const updateUser = async (req, res) => {
    try {
        const updates = req.body;

        // Prevent password change here
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

// DELETE /api/users/:id
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
};


// GET users in this CircleId
const getUsersByCircle = async (req, res) => {
  try {
    const { circleId } = req.params;

    // Find users who belong to the given circle
    const users = await User.find({ circleId }).select('-password'); // Exclude password from results

    if (!users.length) {
      return res.status(404).json({ message: 'No users found in this circle' });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

export { getUser, updateUser, deleteUser, getUsersByCircle }