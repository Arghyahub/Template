import express, { Request } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db";
import { userModel } from "./schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import router from "./middleware/user-middleware";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const SECRET = process.env.SECRET;

app.use(cors());
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
  res.send("Hello from Arghya!");
});

interface signupReq extends Request {
  body: {
    name?: string;
    email?: string;
    passwd?: string;
  };
}

// @ts-ignore
app.post("/auth/signup", async (req: signupReq, res) => {
  const { name, email, passwd } = req.body;
  if (!name || !email || !passwd) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  //   check if user already exists

  //   hash password with bcrypt
  const hashed = await bcrypt.hash(passwd, 10);

  const user = new userModel({
    name: name,
    email: email,
    password: hashed,
  });

  await user.save();
  res.json({ message: "User created" });
});

// @ts-ignore
app.post("/auth/login", async (req, res) => {
  const { email, passwd } = req.body;
  if (!email || !passwd) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  //   check if user exists

  const user = await userModel.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  //   compare password
  const match = await bcrypt.compare(passwd, user.password);

  if (!match) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const payload = { id: user._id, email: user.email };

  const token = jwt.sign(payload, SECRET);

  res.json({ message: "User logged in", token });
});

// @ts-ignore
app.post("/me", async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: "Invalid token" });
  }

  try {
    const payload = jwt.verify(token, SECRET);
    const user = await userModel.findById(payload.id, {
      name: true,
      email: true,
      _id: true,
    });
    res.json({ user });
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
});

// like
app.post("/like", router, async (req, res) => {});

// feed-fetch

// comment

// follow

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
