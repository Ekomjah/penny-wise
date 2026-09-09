const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const WALLET_TYPES = ['immediate', 'long-term'];

const WalletSchema = new Schema({
  learner: {
    type: Schema.Types.ObjectId,
    ref: 'Learner',
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
  },
  denominations: {
    type: Schema.Types.ObjectId,
    ref: 'Money',
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: WALLET_TYPES,
  },
});

const moneySchema = new Schema({
  name: { type: String, required: true, default: 'United States Dollar' },
  coins: [
    {
      value: { type: Number, required: true },
      image: { type: String, required: true },
    },
  ],
  notes: [
    {
      value: { type: Number, required: true },
      image: { type: String, required: true },
    },
  ],
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
  },
});

const Country = model('Country', countrySchema);
const Money = model('Money', moneySchema);
const Wallet = model('Wallet', WalletSchema);
module.exports = { Wallet, Country, Money };
