import eventModel from '../models/eventModel.js';
import userModel from '../models/userModel.js';

// GET /api/events – List all events
const getAllEvents = async (req, res) => {
  try {
    const events = await eventModel.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events', error: error.message });
  }
};

// POST /api/events/create – Admin creates event
const createEvent = async (req, res) => {
  try {
    const { name, description, startDate, endDate, badgeReward } = req.body;

    const event = new eventModel({
      name,
      description,
      startDate,
      endDate,
      badgeReward
    });

    await event.save();
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create event', error: error.message });
  }
};

// GET /api/events/:id – Get event details
const getEventById = async (req, res) => {
  try {
    const event = await eventModel.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get event', error: error.message });
  }
};

// POST /api/events/:id/join – Mark user as participating
const joinEvent = async (req, res) => {
  try {
    const { userId } = req.body; // should be sent from frontend
    const eventId = req.params.id;

    const user = await userModel.findById(userId);
    const event = await eventModel.findById(eventId);

    if (!user || !event) {
      return res.status(404).json({ message: 'User or Event not found' });
    }

    // Avoid duplicates
    if (user.joinedEvents.includes(eventId)) {
      return res.status(400).json({ message: 'User already joined this event' });
    }

    user.joinedEvents.push(eventId);
    await user.save();

    res.status(200).json({ message: 'User joined event successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to join event', error: error.message });
  }
};

// POST /api/events/:id/reward – Grant badge/karma to participants
const rewardParticipants = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { karmaPoints = 10 } = req.body; // Optional custom karma

    // Find all users who joined the event
    const users = await userModel.find({ joinedEvents: eventId });

    const updatedUsers = [];

    for (const user of users) {
      user.karmaPoints += karmaPoints;
      await user.save();
      updatedUsers.push(user);
    }

    res.status(200).json({
      message: `Karma awarded to ${updatedUsers.length} participants`,
      users: updatedUsers
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reward participants', error: error.message });
  }
};

export { rewardParticipants, joinEvent, createEvent, getAllEvents, getEventById }