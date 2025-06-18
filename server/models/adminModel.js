import mongoose from 'mongoose';

// Schema for admin users with moderation capabilities
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // Full name of the admin
    },
    email: {
        type: String,
        required: true,
        unique: true // Admin login via email
    },
    password: {
        type: String,
        required: true // Hashed password for secure login
    },
    role: {
        type: String,
        enum: ['superadmin', 'circleadmin'],
        default: 'circleadmin' // Level of permission
    },
    circleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'circle' // Which group/community this admin manages
    }
}, { minimize: false });

const adminModel = mongoose.models.admin || mongoose.model("admin", adminSchema);
export default adminModel;
