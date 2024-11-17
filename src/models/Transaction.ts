import { Schema, model } from 'mongoose';

// Define the schema for a Transaction
const transactionSchema = new Schema(
  {
    value: { type: Number, required: true },
    date: { type: Date, required: true },
    tag: { type: String, required: true },
    comment: { type: String, required: true },
    account: { type: Schema.Types.ObjectId, ref: 'account', required: true },
    purchase: { type: Schema.Types.ObjectId, ref: 'purchase', required: true },
  },
  { collection: 'transactions' }
);

// Create the Mongoose model for the Transaction schema
const Transaction = model('Transaction', transactionSchema);

export default Transaction;
