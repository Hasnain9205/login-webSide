const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const User = require("./models/UserSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Auth = require("./middleWare/Auth.js");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("This user is already register");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    const accessToken = jwt.sign(
      {
        id: user._id,
        name: user.name,
        password: user.password,
      },
      process.env.ACCESS_SECRET,
      { expiresIn: "1m" }
    );
    const refreshToken = jwt.sign(
      { id: user._id, name: user.name, password: user.password },
      process.env.REFRESH_SECRET,
      { expiresIn: "5d" }
    );
    user.password = undefined;
    return res.status(201).send({ user, accessToken, refreshToken });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send("Unauthorized: Incorrect password");
    }

    const accessToken = jwt.sign(
      { id: user._id, name: user.name },
      process.env.ACCESS_SECRET,
      { expiresIn: "1m" }
    );
    const refreshToken = jwt.sign(
      { id: user._id, name: user.name },
      process.env.REFRESH_SECRET,
      { expiresIn: "5d" }
    );

    const { password: _, ...restParams } = user._doc;
    return res
      .status(201)
      .send({ user: restParams, accessToken, refreshToken });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

app.get("/refresh", Auth, (req, res) => {
  try {
    const { user } = req;
    const accessToken = jwt.sign(
      { id: user.id, name: user.name },
      process.env.ACCESS_SECRET,
      { expiresIn: "10m" }
    );
    console.log("new token", accessToken);
    return res.status(201).send({ accessToken });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

app.get("/protected", Auth, (req, res) => {
  try {
    return res.status(201).send("Protected Route");
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
