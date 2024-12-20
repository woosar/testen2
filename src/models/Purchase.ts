import { Schema, model } from 'mongoose';

// Define the schema for a Purchase
const purchaseSchema = new Schema(
  {
    date: { type: Date, required: true },
    sum: { type: Number, required: true },
    sheet_name: { type: String, required: true },
    comment: { type: String, required: true },
  },
  { collection: 'purchases' }
);

export interface IPurchase {
  _id: string;
  date: Date;
  sum: number;
  sheet_name: string;
  comment: string;
}

// Create the Mongoose model for the Purchase schema
const Purchase = model('Purchase', purchaseSchema);

export default Purchase;
