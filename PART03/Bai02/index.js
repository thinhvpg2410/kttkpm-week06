const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const PORT = 3000;

// ⚠️ host = tên service mongo
const MONGO_URL = "mongodb://mongo:27017/mydb";

// retry connect (quan trọng)
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected 🚀");
  } catch (err) {
    console.log("Retry DB in 5s...");
    setTimeout(connectDB, 5000);
  }
}
connectDB();

// schema đơn giản
const Item = mongoose.model(
  "Item",
  new mongoose.Schema({ name: String })
);

// API
app.post("/items", async (req, res) => {
  const item = await Item.create({ name: req.body.name });
  res.json(item);
});

app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.get("/", (req, res) => {
  res.send("Node + Mongo running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});