const { addIncome, getIncome, deleteIncome } = require('../controllers/income');
const TransactionSchema = require('../models/TransactionModel');

jest.mock('../models/TransactionModel'); // Mock del modelo TransactionSchema

describe('Income Controller', () => {
  describe('addIncome', () => {
    it('debería agregar un ingreso válido', async () => {
      const req = {
        params: { userId: 'user123' },
        body: {
          title: 'Ingreso de prueba',
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

      await addIncome(req, res);

      expect(TransactionSchema).toHaveBeenCalledTimes(1);
      expect(TransactionSchema).toHaveBeenCalledWith({
        title: 'Ingreso de prueba',
        amount: 100,
        category: 'Comida',
        description: 'Descripción de prueba',
        type: 'Income',
        date: '2023-07-09',
        userId: 'user123',
      });
      expect(TransactionSchema.prototype.save).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Income Added' });
    });    
  });
});