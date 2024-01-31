const mongoose = require('mongoose');
const Sequence = require('./sequenceSchema');

const postSchema = new mongoose.Schema({
    numericId: { type: Number, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    created: { type: Date, required: true },
});

// This block will create auto-increment for numericId
postSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }
    try {
        const sequence = await Sequence.findOneAndUpdate(
            { name: 'postNumericId' },
            { $inc: { value: 1 } },
            { upsert: true, new: true }
        );

        this.numericId = sequence.value;
        next();
    } catch (error) {
        next(error);
    }
});

const Posts = mongoose.model('Posts', postSchema);
module.exports = Posts;