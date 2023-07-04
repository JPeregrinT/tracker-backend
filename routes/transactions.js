const { addIncome, getIncome, deleteIncome } = require('../controllers/income');
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense')
const {getTransaction, getDashboard} = require('../controllers/transaction')
const router = require ('express').Router()


router.post('/add-income/:userId', addIncome)
    .get('/get-income/:userId', getIncome)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense/:userId', addExpense)
    .get('/get-expense/:userId', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .get('/get-transaction/:userId', getTransaction)
    .get('/get-dashboard/:userId', getDashboard)

module.exports = router