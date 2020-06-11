const { Schema, model } = require("mongoose");

// require("mongoose-currency").loadType(mongoose);
// var Currency = mongoose.Types.Currency;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter username"]
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: [true, "Email registered. Please use a new one"]
    },
    password: {
      type: String,
      required: false
    },
    currency: {
      type: String,
      required: true
    },
    googleID: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", userSchema);
module.exports = UserModel
