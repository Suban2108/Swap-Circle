import mongoose from 'mongoose';

// Schema to track karma points and history per user
const karmaSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true // Who owns this karma log
    },
    totalPoints: {
        type: Number,
        default: 0 // Current karma score
    },
    history: [{
        reason: {
            type: String // Why points were given (e.g., "Donated a table")
        },
        points: {
            type: Number // +10, -5 etc.
        },
        date: {
            type: Date,
            default: Date.now // When points were added
        }
    }]
}, { minimize: false });

const karmaModel = mongoose.models.karma || mongoose.model("karma", karmaSchema);
export default karmaModel;
