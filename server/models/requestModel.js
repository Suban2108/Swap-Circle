import mongoose from 'mongoose';

// Schema for open requests posted by users
const requestSchema = new mongoose.Schema({
    requestedById: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // Who is making the request
    },
    description: {
        type: String,
        required: true // What is the user asking for
    },
    category: {
        type: String // To help filter by type
    },
    fulfilled: {
        type: Boolean,
        default: false // Whether this request has been answered
    }
}, { minimize: false });

const requestModel = mongoose.models.request || mongoose.model("request", requestSchema);
export default requestModel;
