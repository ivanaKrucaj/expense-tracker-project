const { Schema, model } = require("mongoose");
const UserModel = require("../models/user.model");

// npm package for currency (optional):
// require("mongoose-currency").loadType(mongoose);
// var Currency = mongoose.Types.Currency;

const transactionSchema = new Schema(
  {
    type: {
      type: String,
      required: [true, "Please select a type"],
      enum: ["expense", "income"],
    },
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
      enum: [
        "food",
        "transport",
        "accomodation",
        "salary",
        "travel",
        "bills",
        "entertainment",
        "clothing",
        "education",
        "healthcare",
        "other",
      ],
    },
    amount: {
      type: Number,
      required: [true, "Please enter an amount"],
      min: 0,
    },
    date: {
      type: Date,
      required: [true, "Please enter a date"],
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const TransactionModel = model("Transaction", transactionSchema);
module.exports = TransactionModel;
