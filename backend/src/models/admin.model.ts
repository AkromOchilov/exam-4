import { Schema, model } from 'mongoose';
let { Types } = Schema;

let adminSchema = new Schema(
  {
    username: {
      type: Types.String,
      required: true,
    },
    password: {
      type: Types.String,
      required: true,
    }
  },
  { versionKey: false, timestamps: true },
);

export default model( 'Admin', adminSchema );
