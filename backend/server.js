import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./lib/userDB.js";
import User from "./model/userSchema.js";

const app = express();
app.use(cors());
dotenv.config();

app.use(express.json());
const PORT = process.env.PORT || 8080;

connect;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.post("/signup", async (req, res) => {
  const { user_name, email } = req.body;
  const userExist = await User.findOne({ email: email });

  if (userExist) {
    return res.status(404).json({ Error: "User already registered" });
  }

  try {
    const newUser = new User({
      user_name: user_name,
      email: email,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { user_name, email } = req.body;
  const userExists = await User.findOne({ email: email });

  try {
    if (userExists) {
      if (userExists.user_name == user_name) {
        return res.json(userExists);
      } else return res.status(400).json({ Error: "Username is wrong" });
    }
    res.status(404).json({ Error: "User not found" });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
});

app.get("/home", async (req, res) => {
  const allUser = await User.find();
  res.json(allUser);
});

app.put("/home", async (req, res) => {
  const { username, id } = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(
      { _id: id },
      { user_name: username },
      { new: true },
    );
    res.json(updateUser);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
});

app.delete("/home", async (req, res) => {
  const { id } = req.body;

  const deleteUser = await User.findByIdAndDelete({ _id: id }, { new: true });
  res.json(deleteUser);
});
