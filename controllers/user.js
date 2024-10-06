const User = require("../models/user");
const { signUpSchema } = require("../lib/validation/users");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jenny" },
  { id: 3, name: "Jennifer" },
];

const getUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const signUp = async (req, res) => {
  try {
    const { fullname, username, email, password } = signUpSchema.parse(
      req.body
    );
    const usernameExists = await User.findOne({ username });
    const emailExists = await User.findOne({ email });

    if (usernameExists) {
      return res
        .status(400)
        .json({ message: "there is a username with the same name" });
    }

    if (emailExists) {
      return res.status(400).json({ message: "there is an email like this" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullname,
      username,
      email,
      password: hashPassword,
    });

    const newUser = await user.save();

    const token = jwt.sign(
      {
        id: newUser._id,
        username: newUser.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    return res.status(201).json({ message: "User created" });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getUser,
  signUp,
};