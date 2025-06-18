import mongoose from 'mongoose';

// Schema for admin-organized donation or themed events
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // Title of the event
    },
    description: {
        type: String // Description, purpose, instructions
    },
    startDate: {
        type: Date,
        required: true // When event begins
    },
    endDate: {
        type: Date,
        required: true // When event ends
    },
    badgeReward: {
        type: String // Badge or reward name earned for participation
    }
}, { minimize: false });

const eventModel = mongoose.models.event || mongoose.model("event", eventSchema);
export default eventModel;
