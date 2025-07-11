import mongoose from "mongoose"

// Schema representing a private community (e.g., hostel, apartment group)
const circleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // e.g., "Block B Residents", "Coworking Zone A"
    },
    avatar: {
      type: String,
      default: null, // URL/path to the group avatar image
    },
    inviteCode: {
      type: String,
      required: true,
      unique: true, // Used for invite-only access control
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Who initiated the circle
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Array of users in this circle
      },
    ],
  },
  { minimize: false },
)

const circleModel = mongoose.models.circle || mongoose.model("circle", circleSchema)

export default circleModel
