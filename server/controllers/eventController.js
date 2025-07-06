import Event from '../models/eventModel.js'
import User from '../models/userModel.js'
import { validationResult } from 'express-validator'

// GET /api/events
const getAllEvents = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search,
      category,
      status,
      sortBy = 'startDate',
      sortOrder = 'asc',
      upcoming,
    } = req.query

    const query = {}

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ]
    }

    if (category && category !== 'all') {
      query.category = category
    }

    if (status && status !== 'all') {
      query.status = status
    }

    if (upcoming === 'true') {
      query.startDate = { $gte: new Date() }
    }

    const sortOptions = {}
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1

    const total = await Event.countDocuments(query)

    const events = await Event.find(query)
      .populate('createdBy', 'name email')
      .populate('participants.user', 'name email')
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .lean()

    return res.status(200).json({
      success: true,
      data: {
        events,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalEvents: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch events',
      error: error.message,
    })
  }
}

// POST /api/events
const createEvent = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    })
  }

  try {
    const eventData = {
      ...req.body,
      createdBy: req.user.id,
    }

    const event = new Event(eventData)
    await event.save()

    const populatedEvent = await Event.findById(event._id).populate('createdBy', 'name email')

    return res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: populatedEvent,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create event',
      error: error.message,
    })
  }
}

// GET /api/events/:id
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name email avatar')
      .populate('participants.user', 'name email avatar')

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      })
    }

    return res.status(200).json({
      success: true,
      data: event,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to get event',
      error: error.message,
    })
  }
}

// PUT /api/events/:id
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      })
    }

    if (event.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this event',
      })
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('createdBy', 'name email')

    return res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      data: updatedEvent,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update event',
      error: error.message,
    })
  }
}

// DELETE /api/events/:id
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      })
    }

    if (event.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this event',
      })
    }

    await Event.findByIdAndDelete(req.params.id)

    return res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete event',
      error: error.message,
    })
  }
}

// POST /api/events/:id/join
const joinEvent = async (req, res) => {
  try {

      const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    })
  }

    const eventId = req.params.id
    const userId = req.user.id

    const event = await Event.findById(eventId)

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' })
    }

    if (event.status !== 'active' || event.isExpired) {
      return res.status(400).json({ success: false, message: 'Event is not available for joining' })
    }

    const alreadyJoined = event.participants.find(
      (p) => p.user.toString() === userId && p.status === 'joined'
    )

    if (alreadyJoined) {
      return res.status(400).json({ success: false, message: 'User already joined this event' })
    }

    if (event.maxParticipants && event.participantCount >= event.maxParticipants) {
      return res.status(400).json({ success: false, message: 'Event is full' })
    }

    event.participants.push({
      user: userId,
      joinedAt: new Date(),
      status: 'joined',
    })

    await event.save()

    const updatedEvent = await Event.findById(eventId).populate('participants.user', 'name email')

    return res.status(200).json({
      success: true,
      message: 'Successfully joined event',
      data: updatedEvent,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to join event',
      error: error.message,
    })
  }
}

// POST /api/events/:id/leave
const leaveEvent = async (req, res) => {
  try {
    const eventId = req.params.id
    const userId = req.user.id

    const event = await Event.findById(eventId)

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' })
    }

    const index = event.participants.findIndex(
      (p) => p.user.toString() === userId && p.status === 'joined'
    )

    if (index === -1) {
      return res.status(400).json({ success: false, message: 'User is not a participant' })
    }

    event.participants[index].status = 'cancelled'
    await event.save()

    return res.status(200).json({ success: true, message: 'Successfully left event' })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to leave event',
      error: error.message,
    })
  }
}

// POST /api/events/:id/reward
const rewardParticipants = async (req, res) => {
  try {
    const eventId = req.params.id
    const { karmaPoints = 10, badgeReward } = req.body

    const event = await Event.findById(eventId)

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' })
    }

    if (event.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to reward participants',
      })
    }

    const participants = event.participants.filter((p) => p.status === 'joined')
    const participantIds = participants.map((p) => p.user)

    const updates = participantIds.map((userId) => {
      const update = { $inc: { karmaPoints } }
      if (badgeReward) update.$addToSet = { badges: badgeReward }
      return User.findByIdAndUpdate(userId, update, { new: true })
    })

    await Promise.all(updates)

    event.participants.forEach((p) => {
      if (p.status === 'joined') p.status = 'completed'
    })
    event.status = 'completed'
    await event.save()

    return res.status(200).json({
      success: true,
      message: `Rewards given to ${participantIds.length} participants`,
      data: {
        rewardedUsers: participantIds.length,
        karmaPoints,
        badgeReward,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to reward participants',
      error: error.message,
    })
  }
}

// GET /api/events/user/:userId
const getUserEvents = async (req, res) => {
  try {
    const userId = req.params.userId
    const { type = 'all' } = req.query

    let query = {}
    if (type === 'created') {
      query.createdBy = userId
    } else if (type === 'joined') {
      query['participants.user'] = userId
    } else {
      query = {
        $or: [{ createdBy: userId }, { 'participants.user': userId }],
      }
    }

    const events = await Event.find(query)
      .populate('createdBy', 'name email')
      .populate('participants.user', 'name email')
      .sort({ startDate: -1 })

    return res.status(200).json({ success: true, data: events })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch user events',
      error: error.message,
    })
  }
}

export {
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  joinEvent,
  leaveEvent,
  rewardParticipants,
  getUserEvents,
}
