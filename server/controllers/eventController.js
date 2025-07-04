// controllers/eventController.js
import Event from '../models/eventModel.js';
import User from '../models/userModel.js';
import { validationResult } from 'express-validator';

// GET /api/events - List all events with filtering, sorting, and pagination
const getAllEvents = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      status = 'active',
      search,
      sortBy = 'startDate',
      sortOrder = 'asc',
      upcoming = false
    } = req.query;

    const query = {};
    
    // Build filter query
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (upcoming === 'true') {
      query.startDate = { $gte: new Date() };
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const events = await Event.find(query)
      .populate('createdBy', 'name email')
      .populate('participants.user', 'name email')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Event.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        events,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalEvents: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events',
      error: error.message
    });
  }
};

// POST /api/events - Create new event
const createEvent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const eventData = {
      ...req.body,
      createdBy: req.user.id // Assuming auth middleware sets req.user
    };

    const event = new Event(eventData);
    await event.save();

    const populatedEvent = await Event.findById(event._id)
      .populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: populatedEvent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create event',
      error: error.message
    });
  }
};

// GET /api/events/:id - Get event details
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name email avatar')
      .populate('participants.user', 'name email avatar');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get event',
      error: error.message
    });
  }
};

// PUT /api/events/:id - Update event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if user is the creator or admin
    if (event.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this event'
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      data: updatedEvent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update event',
      error: error.message
    });
  }
};

// DELETE /api/events/:id - Delete event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if user is the creator or admin
    if (event.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this event'
      });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete event',
      error: error.message
    });
  }
};

// POST /api/events/:id/join - Join event
const joinEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if event is active and not expired
    if (event.status !== 'active' || event.isExpired) {
      return res.status(400).json({
        success: false,
        message: 'Event is not available for joining'
      });
    }

    // Check if user already joined
    const existingParticipant = event.participants.find(
      p => p.user.toString() === userId && p.status === 'joined'
    );

    if (existingParticipant) {
      return res.status(400).json({
        success: false,
        message: 'User already joined this event'
      });
    }

    // Check capacity
    if (event.maxParticipants && event.participantCount >= event.maxParticipants) {
      return res.status(400).json({
        success: false,
        message: 'Event is full'
      });
    }

    event.participants.push({
      user: userId,
      joinedAt: new Date(),
      status: 'joined'
    });

    await event.save();

    const updatedEvent = await Event.findById(eventId)
      .populate('participants.user', 'name email');

    res.status(200).json({
      success: true,
      message: 'Successfully joined event',
      data: updatedEvent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to join event',
      error: error.message
    });
  }
};

// POST /api/events/:id/leave - Leave event
const leaveEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    const participantIndex = event.participants.findIndex(
      p => p.user.toString() === userId && p.status === 'joined'
    );

    if (participantIndex === -1) {
      return res.status(400).json({
        success: false,
        message: 'User is not a participant of this event'
      });
    }

    event.participants[participantIndex].status = 'cancelled';
    await event.save();

    res.status(200).json({
      success: true,
      message: 'Successfully left event'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to leave event',
      error: error.message
    });
  }
};

// POST /api/events/:id/reward - Award karma to participants
const rewardParticipants = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { karmaPoints = 10, badgeReward } = req.body;

    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if user is the creator or admin
    if (event.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to reward participants'
      });
    }

    const participantIds = event.participants
      .filter(p => p.status === 'joined')
      .map(p => p.user);

    const updatePromises = participantIds.map(async (userId) => {
      const updateData = { $inc: { karmaPoints } };
      
      if (badgeReward) {
        updateData.$addToSet = { badges: badgeReward };
      }

      return User.findByIdAndUpdate(userId, updateData, { new: true });
    });

    const updatedUsers = await Promise.all(updatePromises);

    // Mark participants as completed
    event.participants.forEach(p => {
      if (p.status === 'joined') {
        p.status = 'completed';
      }
    });

    event.status = 'completed';
    await event.save();

    res.status(200).json({
      success: true,
      message: `Rewards awarded to ${updatedUsers.length} participants`,
      data: {
        rewardedUsers: updatedUsers.length,
        karmaPoints,
        badgeReward
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to reward participants',
      error: error.message
    });
  }
};

// GET /api/events/user/:userId - Get user's events
const getUserEvents = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { type = 'all' } = req.query;

    let query = {};
    
    if (type === 'created') {
      query.createdBy = userId;
    } else if (type === 'joined') {
      query['participants.user'] = userId;
    } else {
      query = {
        $or: [
          { createdBy: userId },
          { 'participants.user': userId }
        ]
      };
    }

    const events = await Event.find(query)
      .populate('createdBy', 'name email')
      .populate('participants.user', 'name email')
      .sort({ startDate: -1 });

    res.status(200).json({
      success: true,
      data: events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user events',
      error: error.message
    });
  }
};

export {
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  joinEvent,
  leaveEvent,
  rewardParticipants,
  getUserEvents
};