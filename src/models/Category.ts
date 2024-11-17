import { Schema, model } from 'mongoose';

// Define the schema for a Category
const categorySchema = new Schema(
  {
    categories: {
      Lebensmittel: { type: [String], required: true },
      'Notwendige Ausgaben': { type: [String], required: true },
      'Optionale Ausgaben': { type: [String], required: true },
      Einnahmen: { type: [String], required: true },
      Transfer: { type: [String], required: true },
      Tanken: { type: [String], required: true },
      Jahresausgabe: { type: [String], required: true },
    },
    date: { type: Date, required: true },
  },
  { collection: 'categories' }
);

// Create the Mongoose model for the Category schema
const Category = model('Category', categorySchema);

export default Category;
