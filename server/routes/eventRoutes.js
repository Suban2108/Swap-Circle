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
import { protect } from '../middleware/authMiddleware.js';

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

const partialEventValidation = [
  body('name').optional().isLength({ min: 3, max: 100 }).withMessage('Name must be between 3-100 characters'),
  body('description').optional().isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10-1000 characters'),
  body('startDate').optional().isISO8601().withMessage('Start date must be valid'),
  body('endDate').optional().isISO8601().withMessage('End date must be valid'),
  body('category').optional().isIn(['donation', 'volunteer', 'awareness', 'fundraising', 'community', 'other']).withMessage('Invalid category'),
  body('maxParticipants').optional().isInt({ min: 1, max: 10000 }).withMessage('Max participants must be between 1-10000'),
  body('status').optional().isIn(['draft', 'active', 'completed', 'cancelled']).withMessage('Invalid status'),
]


// Public routes
router.get('/', getAllEvents);
router.get('/:id', getEventById);

// Protected routes
router.post('/', protect, eventValidation, createEvent);
router.put('/:id', protect, partialEventValidation, updateEvent);
router.delete('/:id', protect, deleteEvent);
router.post('/:id/join', protect, joinEvent);
router.post('/:id/leave', protect, leaveEvent);
router.get('/user/:userId', protect, getUserEvents);

// Admin routes
router.post('/:id/reward', protect, rewardParticipants);

export default router;
