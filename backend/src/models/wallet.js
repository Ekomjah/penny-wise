const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const WalletSchema = new Schema({
  total: {
    type: Number
  }
});


const moneySchema = new Schema({
  name: { type: String, required: true, default: "United States Dollar" },
  coins: [
    {
      value: { type: Number, required: true },
      image: { type: String, required: true },
    }
  ],
  notes: [
    {
      value: { type: Number, required: true },
      image: { type: String, required: true },
    }
  ],
  country: {
    type: Schema.Types.ObjectId,
    ref: "Country",
    required: true
  }
});



module.exports = model("Wallet", WalletSchema);
