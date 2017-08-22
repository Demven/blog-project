import { Schema, model } from 'mongoose';

export const ImageSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  description: String,
  credits: String,
});

export default model('Image', ImageSchema);
