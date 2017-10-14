import { Schema, model } from 'mongoose';

export const ViewsCountSchema = new Schema({
  count: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default model('ViewsCount', ViewsCountSchema);
