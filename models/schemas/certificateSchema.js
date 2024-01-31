const mongoose = require('mongoose');
const Sequence = require('./sequenceSchema');

const certificateSchema = new mongoose.Schema({
    numericId: { type: Number, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    issuer: { type: String, required: true },
    issued_to: { type: String, required: true },
    issued_on: { type: Date, required: true },
    expiration_date: { type: Date, required: true },
});

// This block will create auto-increment for numericId
certificateSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }
    try {
        const sequence = await Sequence.findOneAndUpdate(
            { name: 'certificateNumericId' },
            { $inc: { value: 1 } },
            { upsert: true, new: true }
        );

        this.numericId = sequence.value;
        next();
    } catch (error) {
        next(error);
    }
});

const Certificate = mongoose.model('Certificate', certificateSchema);
module.exports = Certificate;