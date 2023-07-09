const TransactionSchema= require("../models/TransactionModel")
const Transaction = require("../models/TransactionModel");

exports.addIncome = async (req, res) => {
    const {userId} = req.params;
    console.log(" esto es user id:", userId)
    const {title, amount, category, description, date,} = req.body

    const income = new TransactionSchema({
        title,
        amount,
        category,
        description,
        type: "Income",
        date,
        userId
    })
    try {
        //validations
        if(!title || !category || !date){
            return res.status(400).json({error: 'All fields are required!'})
        }
        
        console.log ("Esto es INCOME", income)
        
        console.log("esto es date", date)
        await income.save() 
       res.status(200).json({message: 'Income Added'})
    } catch (error){
        if (error.name === 'ValidationError') {
            // Handle the specific error message for invalid currency amount
            if (error.errors.amount && error.errors.amount.message === 'Invalid currency amount') {
              return res.status(400).json({ error: 'Invalid currency amount provided' });
            }
        }
        res.status(500).json(error => res.status(500).json({error:'Server error '}))
    }

    console.log(income)
}

exports.getIncome = async (req, res) =>{
    const {userId} = req.params;
    try {
        const incomes = await TransactionSchema.find({userId, type: "Income"}).sort({createdAt: -1})

        res.status(200).json(incomes)
    } catch (error){
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    TransactionSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}

exports.updateIncome = async (req, res) =>{
        const data = req.body;
        const updateFields = {};
      
        // Build the update object with the modified fields
        if (data.title) updateFields.title = data.title;
        if (data.amount) updateFields.amount = data.amount;
        if (data.category) updateFields.category = data.category;
        if (data.description) updateFields.description = data.description;
        if (data.date) updateFields.date = data.date;
      
        Transaction.findByIdAndUpdate(
          req.params.id,
          { $set: updateFields },
          { new: true }
        )
          .then(updatedIncome => {
            console.log('Income updated: ', updatedIncome);
            res.status(200).send('Income update finished');
          })
          .catch(error => {
            res.status(400).json({ error: 'Error while updating the income.' });
          });
      };