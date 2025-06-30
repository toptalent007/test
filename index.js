require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Payload = require("./models/Payload");

const app = express();
const PORT = 3000;

app.use(express.json());

// Connect to MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://luckyckgp:SIV9V7f40nLMURpy@cluster0.vqu9hkf.mongodb.net/Payload?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// /getNonce route
app.post("/getNonce", async (req, res) => {
  try {
    const { api_key } = req.body;

    if (!api_key) {
      return res.status(400).json({ error: "Missing 'api_key' in payload" });
    }

    const payload = new Payload({ api_key });
    await payload.save();

    res.status(201).json({ message: "API key saved successfully" });
  } catch (error) {
    console.error("Error saving api_key:", error);
    res.status(500).json({ error: error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
