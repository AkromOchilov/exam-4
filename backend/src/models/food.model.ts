import { Schema, model } from 'mongoose';
let { Types } = Schema;

let foodSchema = new Schema(
  {
    category_id: {
      type: Types.String,
      required: true,
    },
    food_name: {
      type: Types.String,
      required: true,
    },
    food_price: {
      type: Types.Number,
      required: true,
    },
    food_image: {
      type: Types.String,
      required: true,
    }
  },
  { versionKey: false, timestamps: true },
);

export default model( 'Food', foodSchema );
