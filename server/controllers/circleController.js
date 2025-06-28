import Circle from '../models/circleModel.js';
import User from '../models/userModel.js';
import mongoose from 'mongoose';

// Create a new circle
const createCircle = async (req, res) => {
  try {
    const { name, inviteCode, createdBy } = req.body;

    // Check for existing invite code
    const existing = await Circle.findOne({ inviteCode });
    if (existing) {
      return res.status(400).json({ message: 'Invite code already in use' });
    }

    const newCircle = new Circle({
      name,
      inviteCode,
      createdBy,
      members: [createdBy], // creator is the first member
    });

    await newCircle.save();

    // Update user's circleId
    await User.findByIdAndUpdate(createdBy, { circleId: newCircle._id });

    res.status(201).json({ message: 'Circle created successfully', circle: newCircle });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create circle', error: error.message });
  }
};

// Get circle details by ID
const getCircleDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const circle = await Circle.findById(id).populate('createdBy', 'name email');
    if (!circle) {
      return res.status(404).json({ message: 'Circle not found' });
    }

    res.status(200).json(circle);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch circle', error: error.message });
  }
};

// Join a circle using invite code
const joinCircle = async (req, res) => {
  try {
    const { inviteCode, userId } = req.body;

    const circle = await Circle.findOne({ inviteCode });
    if (!circle) {
      return res.status(404).json({ message: 'Invalid invite code' });
    }

    // Check if user already joined
    const alreadyMember = circle.members.includes(userId);
    if (alreadyMember) {
      return res.status(400).json({ message: 'User already in this circle' });
    }

    // Add user to circle
    circle.members.push(userId);
    await circle.save();

    // Update user's circleId
    await User.findByIdAndUpdate(userId, { circleId: circle._id });

    res.status(200).json({ message: 'Joined circle successfully', circleId: circle._id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to join circle', error: error.message });
  }
};

// Get all members of a circle
const getCircleMembers = async (req, res) => {
  try {
    const { id } = req.params;

    const circle = await Circle.findById(id).populate('members', '-password');
    if (!circle) {
      return res.status(404).json({ message: 'Circle not found' });
    }

    res.status(200).json({ members: circle.members });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch members', error: error.message });
  }
};

export { getCircleDetails, getCircleMembers, joinCircle, createCircle }