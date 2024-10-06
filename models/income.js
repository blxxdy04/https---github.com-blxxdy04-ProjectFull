const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        discription: {
            type: String,
            trim: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        tag: {
            type: String,
            required: true,
            enum: ['salary', 'bonus', 'gift' , 'other'],
        },
        currency: {
            type: String,
            require: true,
            default: 'ILS',
            enum: ['ILS', 'USD', 'EUR'],
        },
    },
    {Timestamp: true}
);

module.exports = mongoose.model('Income', incomeSchema);