// routes/eventRoutes.js
import express from 'express';
import { body } from 'express-validator';
import {
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  joinEvent,
  leaveEvent,
  rewardParticipants,
  getUserEvents
} from '../controllers/eventController.js';
import { auth, adminAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Validation middleware
const eventValidation = [
  body('name').trim().isLength({ min: 3, max: 100 }).withMessage('Name must be between 3-100 characters'),
  body('description').trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10-1000 characters'),
  body('startDate').isISO8601().withMessage('Start date must be valid'),
  body('endDate').isISO8601().withMessage('End date must be valid'),
  body('category').isIn(['donation', 'volunteer', 'awareness', 'fundraising', 'community', 'other']).withMessage('Invalid category'),
  body('maxParticipants').optional().isInt({ min: 1, max: 10000 }).withMessage('Max participants must be between 1-10000')
];

// Public routes
router.get('/', getAllEvents);
router.get('/:id', getEventById);

// Protected routes
router.post('/', auth, eventValidation, createEvent);
router.put('/:id', auth, eventValidation, updateEvent);
router.delete('/:id', auth, deleteEvent);
router.post('/:id/join', auth, joinEvent);
router.post('/:id/leave', auth, leaveEvent);
router.get('/user/:userId', auth, getUserEvents);

// Admin routes
router.post('/:id/reward', auth, rewardParticipants);

export default router;
