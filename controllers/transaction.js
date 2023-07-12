const TransactionSchema= require("../models/TransactionModel")
const User = require("../models/User");
const UserSchema= require("../models/User")

exports.getTransaction = async (req, res) =>{
    const {userId} = req.params;
    try {
        const transactions = await TransactionSchema.find({userId}).sort({createdAt: -1})

        res.status(200).json(transactions)
    } catch (error){
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteTransaction = async (req, res) =>{
    const {id} = req.params;
    TransactionSchema.findByIdAndDelete(id)
        .then((transaction) =>{
            res.status(200).json({message: 'Transaction Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}

exports.getHistory = async (req, res) =>{
    const {userId} = req.params;
    try {
        const transactions = await TransactionSchema.find({userId})
        .sort({date: -1})
        .limit(5);

        res.status(200).json(transactions)
    } catch (error){
        res.status(500).json({message: 'Server Error'})
    }
}
exports.deleteAvatar = async (req, res) => {
    const { id } = req.params;
    try {
        const avatar = await UserSchema.findById(id);
        if (!avatar) {
            return res.status(404).json({ message: 'Avatar not found' });
        }
        avatar.userImage = 'https://cdn1.iconfinder.com/data/icons/vibrancie-action/30/action_081-account-user-profile-avatar-512.png'
        await avatar.save();
        res.status(200).json({ message: 'Avatar image deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};