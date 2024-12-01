import { Schema, model } from 'mongoose';

// Define the schema for a Purchase
const accountSchema = new Schema(
  {
    handle: { type: String, required: true },
    initial_balance: { type: Number, required: true },
    name: { type: String, required: true },
  },
  { collection: 'accounts' }
);

export interface IAccount {
  _id: string;
  handle: string;
  initial_balance: number;
  name: string;
}

// Create the Mongoose model for the Purchase schema
const Account = model('Account', accountSchema);

export default Account;
