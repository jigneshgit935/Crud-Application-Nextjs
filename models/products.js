import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
  {
    name: String,
    price: String,
    color: String,
    company: String,
    category: String,
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
