const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
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
            enum: [
                'food',
                'rent',
                'transport',
                'other',
                'clothing',
                'entertainment',
                'health',
                'education',
              ],
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

module.exports = mongoose.model('Expense', incomeSchema);