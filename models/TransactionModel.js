const mongoose = require('mongoose');
const {Schema} = mongoose

const TransactionSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        trim: true, 
        maxLength: 50
    },
    amount: {
        type: Number, 
        required: true,
        trim: true
    },
    type: {
        type: String, 
        required: true,
        enum: ["Income", "Expense"]
    },
    date: {
        type: Date, 
        required: true,
        trim: true
    },
    category: {
        type: String, 
        required: true,
        trim: true
    },
    description: {
        type: String, 
        required: true,
        maxLength: 20,
        trim: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true,
    }
}, {timestamps: true})



module.exports = mongoose.model('Income', TransactionSchema)