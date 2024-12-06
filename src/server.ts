import express from 'express';
import mongoose from 'mongoose';
import itemsRouter from './routes/purchases.ts';
import transactionRouter from './routes/transactions';
import categoryRouter from './routes/categories.ts';
import configRouter from './routes/config.ts';
import purchasesRouter from './routes/purchases.ts';
import accountRouter from './routes/accounts.ts';
import cors from 'cors';

const app = express();

app.use(cors());

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '192.168.178.20'; // Listen on all network interfaces
// const mongoURI = process.env.MONGO_URI || 'mongodb://admin:Einszwei3@192.168.178.51:27017/bookkeeping';
mongoose
  .connect('mongodb://192.168.178.51:27017', {
    user: 'admin',
    pass: 'Einszwei3',
    dbName: 'bookkeeping',
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

app.use(express.json());
app.use('/api', itemsRouter);
app.use('/api', transactionRouter);
app.use('/api', categoryRouter);
app.use('/api', configRouter);
app.use('/api', purchasesRouter);
app.use('/api', accountRouter);

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
