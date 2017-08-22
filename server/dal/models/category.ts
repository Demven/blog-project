import { Schema, model } from 'mongoose';

export const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  color: String,
});

export default model('Category', CategorySchema);
