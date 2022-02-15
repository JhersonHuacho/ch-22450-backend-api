import { Schema } from 'mongoose';

export const usuarioSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  age: {
    type: Number
  },
  phoneNumber: {
    type: String
  },
  avatar: {
    type: String
  }
});