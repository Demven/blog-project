import { Schema, model } from 'mongoose';

export const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  slug: {
    type: String,
    required: true,
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  body: [Schema.Types.Mixed],
});

export default model('Article', ArticleSchema);

