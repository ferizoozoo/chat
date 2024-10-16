import mongoose, { Schema } from "mongoose";

const roomSchema = new mongoose.Schema({
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

export default mongoose.model('Room', roomSchema);