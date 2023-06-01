const router = require("express").Router();
const orderRoutes = require("./order");

router.use("/order", orderRoutes);

module.exports = router;
