const mongoose = require('mongoose');
const Sequence = require('./sequenceSchema');

const usersSchema = new mongoose.Schema({
    numericId: { type: Number, unique: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true }
});

// This block will create auto-increment for numericId
usersSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }
    try {
        const sequence = await Sequence.findOneAndUpdate(
            { name: 'usersNumericId' },
            { $inc: { value: 1 } },
            { upsert: true, new: true }
        );

        this.numericId = sequence.value;
        next();
    } catch (error) {
        next(error);
    }
});

const Users = mongoose.model('Users', usersSchema);
module.exports = Users;