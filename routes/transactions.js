const { addIncome, getIncome, deleteIncome, updateIncome } = require('../controllers/income');
const { addExpense, getExpense, deleteExpense, updateExpense } = require('../controllers/expense')
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
    .put('/update-income/:id', updateIncome)
    .put('/update-expense/:id', updateExpense)
    
module.exports = router