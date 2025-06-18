import mongoose from 'mongoose';

// Schema for tracking barter offers made between users
const offerSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
        required: true // The item being requested
    },
    offeredById: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true // Who is making the offer
    },
    offerItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item' // Optional: what item is being offered in return
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'withdrawn'],
        default: 'pending' // Tracks negotiation state
    }
}, { minimize: false });

const offerModel = mongoose.models.offer || mongoose.model("offer", offerSchema);
export default offerModel;
