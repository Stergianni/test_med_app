require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/auth");
const User = require("./models/User"); // ✅ Make sure User model is imported

// Middleware
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

// ✅ Fetch User Profile
app.get("/api/auth/user", async (req, res) => {
    try {
        const email = req.header("Email"); // Ensure frontend sends this header
        if (!email) return res.status(400).json({ error: "Email is required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});
app.put("/api/auth/user", async (req, res) => {
  try {
      const email = req.header("Email");
      if (!email) return res.status(400).json({ error: "Email is required" });

      const { name, phone } = req.body;
      const updatedUser = await User.findOneAndUpdate(
          { email },
          { name, phone },
          { new: true }
      );

      if (!updatedUser) return res.status(404).json({ error: "User not found" });

      res.json(updatedUser);
  } catch (error) {
      console.error("Update Error:", error);
      res.status(500).json({ error: "Server error" });
  }
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error(err));

app.get("/", (req, res) => {
    res.send("API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
