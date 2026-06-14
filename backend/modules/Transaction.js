import mongoose from "mongoose";

const TranSchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    amount: {type: Number, required: true},
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    category: {type: String, required: true},
    description: String,
    dueDate: {type: Date, default: Date.now},
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Transaction = mongoose.model("Transaction", TranSchema)

export default Transaction
