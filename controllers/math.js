const TransactionSchema = require('../models/TransactionModel');
const mongoose = require('mongoose');

const calculateTotalIncome = async (userId) => {
    console.log('iddd',)
  try {
    const result = await TransactionSchema.aggregate([
      {
        $match: {
          userId: userId,
          type: 'Income',
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: { $toDouble: { $trim: { input: '$amount', chars: ' $' } } } },
        },
      },
    ]);

    if (result.length > 0) {
      const totalIncome = result[0].totalAmount.toFixed(2); // Convert to 2 decimal places
      console.log('Total Income:', totalIncome);
      return totalIncome;
    } else {
      console.log('No income transactions found for the user.');
      return '0.00';
    }
  } catch (error) {
    console.error('Error calculating total income:', error);
    throw error;
  }
};

exports.totalIncome = async (req, res) => {
  const { userId } = req.params;
  try {
    console.log("this is user id", userId)
    const totalIncome = await calculateTotalIncome(userId);
    res.status(200).json({ totalIncome });
  } catch (error) {
    console.error('Error retrieving total income:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};
