const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const TransactionSchema = require('../models/TransactionModel');

jest.mock('../models/TransactionModel'); // Mock del modelo TransactionSchema

describe('Expense Controller', () => {
  describe('addExpense', () => {
    it('debería agregar un gasto válido', async () => {
      const req = {
        params: { userId: 'user123' },
        body: {
          title: 'Gasto de prueba',
          amount: 100,
          category: 'Comida',
          description: 'Descripción de prueba',
          date: '2023-07-09',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await addExpense(req, res);

      expect(TransactionSchema).toHaveBeenCalledTimes(1);
      expect(TransactionSchema).toHaveBeenCalledWith({
        title: 'Gasto de prueba',
        amount: 100,
        category: 'Comida',
        description: 'Descripción de prueba',
        type: 'Expense',
        date: '2023-07-09',
        userId: 'user123',
      });
      expect(TransactionSchema.prototype.save).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Expense Added' });
    });

    it('debería devolver un error si faltan campos obligatorios', async () => {
      const req = {
        params: { userId: 'user123' },
        body: {
          title: 'Gasto de prueba',
          amount: 100,
          // Faltan category, description y date
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await addExpense(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'All fields are required!' });
    });
  });
});
