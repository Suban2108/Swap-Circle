// models/eventModel.js
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Event name is required'],
    trim: true,
    maxlength: [100, 'Event name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
    validate: {
      validator: function(v) {
        return v > new Date();
      },
      message: 'Start date must be in the future'
    }
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
    validate: {
      validator: function(v) {
        return v > this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
  badgeReward: {
    type: String,
    trim: true,
    maxlength: [50, 'Badge name cannot exceed 50 characters']
  },
  category: {
    type: String,
    enum: ['donation', 'volunteer', 'awareness', 'fundraising', 'community', 'other'],
    default: 'other'
  },
  maxParticipants: {
    type: Number,
    min: [1, 'Maximum participants must be at least 1'],
    max: [10000, 'Maximum participants cannot exceed 10000']
  },
  location: {
    type: {
      type: String,
      enum: ['online', 'offline', 'hybrid'],
      default: 'online'
    },
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'completed', 'cancelled'],
    default: 'draft'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['joined', 'completed', 'cancelled'],
      default: 'joined'
    }
  }],
  requirements: [String],
  tags: [String],
  images: [String],
  contactInfo: {
    email: String,
    phone: String,
    website: String
  }
}, {
  timestamps: true,
  minimize: false
});

// Indexes for better performance
eventSchema.index({ startDate: 1, endDate: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ status: 1 });
eventSchema.index({ createdBy: 1 });

// Virtual for participant count
eventSchema.virtual('participantCount').get(function() {
  return this.participants.filter(p => p.status === 'joined').length;
});

// Check if event is currently active
eventSchema.virtual('isActive').get(function() {
  const now = new Date();
  return this.startDate <= now && this.endDate >= now && this.status === 'active';
});

// Check if event is expired
eventSchema.virtual('isExpired').get(function() {
  return this.endDate < new Date();
});

eventSchema.set('toJSON', { virtuals: true });

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);
export default Event;