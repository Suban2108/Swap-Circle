import express from "express"
import {
  createCircle,
  getCircleDetails,
  joinCircle,
  getCircleMembers,
  getGroupsByUser,
  leaveCircle,
  updateCircle,
} from "../controllers/circleController.js"
import upload from '../middleware/uploadCircleImageMiddleware.js'

const circleRouter = express.Router()

// POST /api/circles/create
circleRouter.post("/create", createCircle)

// GET /api/circles/:id
circleRouter.get("/:id", getCircleDetails)

// POST /api/circles/join
circleRouter.post("/join", joinCircle)

// GET /api/circles/:id/members - FIXED ROUTE
circleRouter.get("/:id/members", getCircleMembers)

// GET /api/circles/user-groups/:userId
circleRouter.get("/user-groups/:userId", getGroupsByUser)

// POST /api/circles/leave
circleRouter.post("/leave", leaveCircle)

// PUT /api/circles/:groupId - Update group (name, avatar)
circleRouter.put("/:groupId", upload.single("avatar"), updateCircle)

export default circleRouter
