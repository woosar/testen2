import { Schema, model } from 'mongoose';

const configSchema = new Schema(
  {
    reserved_gas: { type: Number, required: true },
    monthly_budget: { type: Number, required: true },
    income: { type: [String], required: true },
    overhead: { type: [String], required: true },
    total_expected_income: { type: Number, required: true },
    total_expected_overhead: { type: Number, required: true },
    savings_goal: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  { collection: 'config' }
);

const Config = model('Config', configSchema);

export default Config;
