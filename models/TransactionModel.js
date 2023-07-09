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
        type: String, 
        required: true,
        trim: true,
        validate: {
            validator: function (value) {
              
                return /^[-+]?[€$]?[-]?([0-9]+[€$]|[€$]?[0-9]+)(\.[0-9]{1,2})?$/.test(value);
            },
            message: 'Invalid currency amount'
        }
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
        required: false,
        maxLength: 20,
        trim: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true,
    }
}, {timestamps: true})

TransactionSchema.post('validate', function(error, doc, next) {
    if (error.errors.amount && error.name === 'ValidationError') {
      error.errors.amount.message = 'Invalid currency amount';
    }
    next(error);
  });



  module.exports = mongoose.model('Transaction', TransactionSchema);