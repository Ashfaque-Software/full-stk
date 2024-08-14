
import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: Boolean, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }
}, {
    versionKey: false,
    timestamps: true
});

const noteModel = mongoose.model("note", noteSchema);

export default noteModel;
