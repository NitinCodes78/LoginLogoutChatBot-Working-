const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  payment_id: {
    type: String,
    required: true,
  },

  payment_status: {
    type: String,
    required: true,
  },

  payer_email: {
    type: String,
    required: true,
  },

  productIds: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
