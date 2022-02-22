import { Schema } from 'mongoose';

export const carritoSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  productos: { 
    type: [], 
    required: true 
  }
});
