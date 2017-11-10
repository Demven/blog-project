import { Schema, model } from 'mongoose';

export const USER_TYPE = {
  ADMIN: 'admin',
  AUTHOR: 'author',
};

export const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: USER_TYPE.AUTHOR,
  },
});

export default model('User', UserSchema);
