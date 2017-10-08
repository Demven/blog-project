import { Schema, model } from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');

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
    unique: true,
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
  publication_date: {
    type: Date,
    default: Date.now,
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  body: [Schema.Types.Mixed],
});

ArticleSchema.plugin(uniqueValidator);

export default model('Article', ArticleSchema);

