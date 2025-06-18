import mongoose from 'mongoose';

// Schema for registered users in a private barter/donation circle
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // Full name is required
    },
    email: {
        type: String,
        required: true,
        unique: true // Unique identifier for invite-only access
    },
    password: {
        type: String,
        required: true // Stored as hashed password
    },
    profilePic: {
        type: String // Optional avatar image URL
    },
    circleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'circle' // Refers to the user's private group
    },
    karmaPoints: {
        type: Number,
        default: 0 // Total karma points earned through good actions
    },
    joinedEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event' // Events the user has participated in
    }]
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
