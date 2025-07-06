import mongoose from "mongoose"

const itemSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Add index for better query performance
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        filename: {
          type: String,
          required: true,
        },
        originalName: {
          type: String,
        },
        size: {
          type: Number, // File size in bytes
        },
        mimetype: {
          type: String,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    category: {
      type: String,
      required: true,
      enum: [
        "Electronics",
        "Clothing",
        "Home & Garden",
        "Sports",
        "Music",
        "Fashion",
        "Books",
        "Toys",
        "Automotive",
        "Health & Beauty",
      ],
    },
    type: {
      type: String,
      enum: ["donate", "barter"],
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "pending", "exchanged", "removed"],
      default: "available",
      index: true, // Add index for filtering
    },
    deliveryNotes: {
      type: String,
      maxlength: 500,
    },
    location: {
      city: String,
      state: String,
      country: String,
      coordinates: {
        type: [Number], // [longitude, latitude]
        // index: "2dsphere", // For geospatial queries
      },
    },
    condition: {
      type: String,
      enum: ["new", "like-new", "good", "fair", "poor"],
      default: "good",
    },
    estimatedValue: {
      type: Number,
      min: 0,
    },
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        likedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    swapRequests: [
      {
        requesterId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        offeredItemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
        },
        message: String,
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected", "cancelled"],
          default: "pending",
        },
        requestedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    featuredUntil: {
      type: Date, // For premium/featured listings
    },
    lastBumpedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Virtual for like count
itemSchema.virtual("likeCount").get(function () {
  return this.likes ? this.likes.length : 0
})

// Virtual for swap request count
itemSchema.virtual("swapRequestCount").get(function () {
  return this.swapRequests ? this.swapRequests.filter((req) => req.status === "pending").length : 0
})

// Virtual for main image URL
itemSchema.virtual("mainImage").get(function () {
  return this.images && this.images.length > 0 ? this.images[0].url : null
})

// Virtual for age in days
itemSchema.virtual("ageInDays").get(function () {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24))
})

// Indexes for better query performance
itemSchema.index({ title: "text", description: "text", tags: "text" }) // Text search
itemSchema.index({ category: 1, type: 1, status: 1 }) // Filtering
itemSchema.index({ createdAt: -1 }) // Sorting by date
itemSchema.index({ ownerId: 1, status: 1 }) // User's items
itemSchema.index({ "location.coordinates": "2dsphere" }) // Geospatial queries

// Pre-save middleware to update lastBumpedAt when item is modified
itemSchema.pre("save", function (next) {
  if (this.isModified() && !this.isNew) {
    this.lastBumpedAt = new Date()
  }
  next()
})

// Static method to find available items
itemSchema.statics.findAvailable = function () {
  return this.find({
    status: "available",
    isActive: true,
  }).populate("ownerId", "name email profilePic")
}

// Static method to search items
itemSchema.statics.searchItems = function (query = {}) {
  const filter = {
    status: { $ne: "removed" },
    isActive: true,
  }

  if (query.keyword) {
    filter.$text = { $search: query.keyword }
  }

  if (query.category && query.category !== "all") {
    filter.category = new RegExp(query.category, "i")
  }

  if (query.type && query.type !== "all") {
    filter.type = query.type
  }

  if (query.status && query.status !== "all") {
    filter.status = query.status
  }

  if (query.condition) {
    filter.condition = query.condition
  }

  if (query.minValue || query.maxValue) {
    filter.estimatedValue = {}
    if (query.minValue) filter.estimatedValue.$gte = Number(query.minValue)
    if (query.maxValue) filter.estimatedValue.$lte = Number(query.maxValue)
  }

  return this.find(filter).populate("ownerId", "name email profilePic")
}

// Instance method to add a like
itemSchema.methods.addLike = function (userId) {
  const existingLike = this.likes.find((like) => like.userId.toString() === userId.toString())
  if (!existingLike) {
    this.likes.push({ userId, likedAt: new Date() })
    return this.save()
  }
  return Promise.resolve(this)
}

// Instance method to remove a like
itemSchema.methods.removeLike = function (userId) {
  this.likes = this.likes.filter((like) => like.userId.toString() !== userId.toString())
  return this.save()
}

// Instance method to add swap request
itemSchema.methods.addSwapRequest = function (requestData) {
  // Check if request already exists
  const existingRequest = this.swapRequests.find(
    (req) => req.requesterId.toString() === requestData.requesterId.toString() && req.status === "pending",
  )

  if (!existingRequest) {
    this.swapRequests.push(requestData)
    return this.save()
  }

  throw new Error("You already have a pending swap request for this item")
}

// Instance method to increment views
itemSchema.methods.incrementViews = function () {
  this.views += 1
  return this.save()
}

// Instance method to check if user can edit
itemSchema.methods.canEdit = function (userId) {
  return this.ownerId.toString() === userId.toString()
}

// Instance method to soft delete
itemSchema.methods.softDelete = function () {
  this.status = "removed"
  this.isActive = false
  return this.save()
}

const itemModel = mongoose.models.Item || mongoose.model("Item", itemSchema)
export default itemModel
