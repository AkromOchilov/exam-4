import { Schema, model } from 'mongoose';
let { Types } = Schema;

let categorySchema = new Schema(
  {
    category_name: {
      type: Types.String,
      required: true,
    },
    category_image: {
      type: Types.String,
      required: true,
    }
  },
  { versionKey: false, timestamps: true },
);

export default model( 'Category', categorySchema );
