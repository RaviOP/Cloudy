import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
    },
    mimeType: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isShared: {
        type: Boolean,
        default: false
    },
    shared: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

const File = mongoose.model('File', fileSchema);

export default File;