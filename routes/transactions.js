const { addIncome, getIncome, deleteIncome } = require('../controllers/income');
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense')
const {getTransaction, getHistory, deleteTransaction} = require('../controllers/transaction')
const { jwtMiddleware} = require("../security/jwt");
const router = require ('express').Router()

// router.use(jwtMiddleware)

router.post('/add-income/:userId', addIncome)
    .get('/get-income/:userId', getIncome)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense/:userId', addExpense)
    .get('/get-expense/:userId', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .get('/get-transaction/:userId', getTransaction)
    .get('/get-history/:userId', getHistory)
    .delete('/delete-transaction/:id', deleteTransaction)
    
module.exports = router