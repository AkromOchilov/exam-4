import { Schema, model } from 'mongoose';
let { Types } = Schema;

let orderSchema = new Schema(
  {
    username: {
      type: Types.String,
      required: true,
    },
    contact: {
      type: Types.String,
      required: true,
    },
    orders: {
      type: Types.Array
    }
  },
  { versionKey: false, timestamps: true },
);

export default model( 'Order', orderSchema );
