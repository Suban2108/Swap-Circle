import express from "express"
import {
  createCircle,
  getCircleDetails,
  joinCircle,
  getCircleMembers,
  getGroupsByUser,
  leaveCircle,
} from "../controllers/circleController.js"

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

export default circleRouter
