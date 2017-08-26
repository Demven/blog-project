import { Schema, model } from 'mongoose';

export const HomepageSectionSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
});

export default model('HomepageSection', HomepageSectionSchema);