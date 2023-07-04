const TransactionSchema= require("../models/IncomeModel")

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
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount<=0 || typeof amount !== 'number'){
            return res.status(400).json({message: 'Amount must be a positive number'})
        }
        console.log ("Esto es INCOME", income)
        
        console.log("esto es date", date)
        await income.save() 
       res.status(200).json({message: 'Income Added'})
    } catch (error){
        res.status(500).json(error => res.status(500).json({error:'Server error '}))
    }

    console.log(income)
}

exports.getIncome = async (req, res) =>{
    const {userId} = req.params;
    try {
        const incomes = await TransactionSchema.find({userId}).sort({createdAt: -1})

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