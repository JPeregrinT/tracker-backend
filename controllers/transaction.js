const TransactionSchema= require("../models/TransactionModel")

exports.getTransaction = async (req, res) =>{
    const {userId} = req.params;
    try {
        const transactions = await TransactionSchema.find({userId}).sort({createdAt: -1})

        res.status(200).json(transactions)
    } catch (error){
        res.status(500).json({message: 'Server Error'})
    }
}
exports.getDashboard = async (req, res) =>{
    const {userId} = req.params;
    try {
        const transactions = await TransactionSchema.find({userId})
        .sort({createdAt: -1})
        .limit(5);

        res.status(200).json(transactions)
    } catch (error){
        res.status(500).json({message: 'Server Error'})
    }
}