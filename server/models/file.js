import { Schema, model } from 'mongoose';

const FileSchema = new Schema({
  name: {
    pad: String,
    original: String
  },
  size: Number,
  type: String,
  ext: String,
  encoding: String, 
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User' // Reference the 'User' model
  }
}, { timestamps: true });

export default model('File', FileSchema);
