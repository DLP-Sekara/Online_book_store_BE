import mongoose, { Schema } from "mongoose";
const orderDetailSchema = new mongoose.Schema({
  book_id: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});
const orderSchema = new mongoose.Schema(
  {
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    order_details: [orderDetailSchema],
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);
const Order = mongoose.model("Order", orderSchema);
export default Order;
