const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);

main().catch((err) => {
  console.log("DB CONNECTION ERROR - ", err);
});

async function main() {
  await mongoose.connect("mongodb://127.0.0.1/SHOPHUB");
  console.log("DB CONNECTED");
}
