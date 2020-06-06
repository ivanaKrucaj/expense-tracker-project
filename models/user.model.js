const { Schema, model } = require("mongoose");

// require("mongoose-currency").loadType(mongoose);
// var Currency = mongoose.Types.Currency;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter username"],
      unique: true
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: [true, "Email registered. Please use a new one"]
    },
    password: {
      type: String,
      required: true
    },
    // transaction: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Transaction'
    // }
    currency: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", userSchema);
module.exports = UserModel
