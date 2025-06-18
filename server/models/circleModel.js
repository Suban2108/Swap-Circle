import mongoose from 'mongoose';

// Schema representing a private community (e.g., hostel, apartment group)
const circleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // e.g., "Block B Residents", "Coworking Zone A"
    },
    inviteCode: {
        type: String,
        required: true,
        unique: true // Used for invite-only access control
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' // Who initiated the circle
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' // Array of users in this circle
    }]
}, { minimize: false });

const circleModel = mongoose.models.circle || mongoose.model("circle", circleSchema);
export default circleModel;
