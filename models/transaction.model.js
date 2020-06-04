const { Schema, model } = require("mongoose");

require("mongoose-currency").loadType(mongoose);
var Currency = mongoose.Types.Currency;

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
      ],
    },
    amount: {
      type: Number,
      required: [true, "Please enter an amount"],
    },
    date: {
      type: Date,
      required: [true, "Please enter a date"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Transaction", transactionSchema);
