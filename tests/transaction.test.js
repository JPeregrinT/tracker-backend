const { getTransaction } = require('../controllers/transaction');
const TransactionSchema = require('../models/TransactionModel');

jest.mock('../models/TransactionModel');

describe('Transaction Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTransaction', () => {
    it('debería obtener las transacciones del usuario', async () => {
      const req = {
        params: { userId: 'user123' },
      };

      const transactionsMock = [
        { title: 'Transacción 1', amount: 50 },
        { title: 'Transacción 2', amount: 75 },
      ];

      TransactionSchema.find.mockResolvedValueOnce(transactionsMock);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getTransaction(req, res);

      expect(TransactionSchema.find).toHaveBeenCalledTimes(1);
      expect(TransactionSchema.find).toHaveBeenCalledWith({ userId: 'user123' });
    });
  });
});
