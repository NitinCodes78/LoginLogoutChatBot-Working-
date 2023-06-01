const Order = require("../models/order");

const order = {
  createOrder: async (req, res) => {
    try {
      const payment_id = req.body.details.id;
      const payment_status = req.body.details.status;
      const payer_email = req.body.details.payer.email_address;
      const productIds = req.body.productIds;

      const order = new Order({
        payment_id,
        payment_status,
        payer_email,
        productIds,
      });

      await order.save();

      return res.status(200).json({ message: "Order purchased successfully" });
    } catch (err) {
      console.log("Controllers -> order -> createOrder: ", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = order;
