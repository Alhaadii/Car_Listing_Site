import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  // Check if user already exists with username or email
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: savedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error registering user", error });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid password",
        });
      }
      const token = jwt.sign(
        { id: user._id, username: user.username, email: user.email },
        process.env.JWT_SECRET
      );

      res
        .cookie("token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({
          success: true,
          message: "Login successful",
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
          },
        });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Error logging in",
        error,
      });
    });
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude password field
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error,
    });
  }
};

export const google = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, username: user.username, email: user.email },
        process.env.JWT_SECRET
      );
      const { password, ...userData } = user._doc;
      res
        .cookie("token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({
          success: true,
          message: "Google login successful",
          user: userData,
        });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const generatedUsername =
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-5);
      const newUser = new User({
        email: req.body.email,
        username: generatedUsername,
        password: hashedPassword,
        avatar: req.body.photoURL,
      });
      await newUser.save();
    }
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username, email: newUser.email },
      process.env.JWT_SECRET
    );
    const { password, ...userData } = newUser._doc;
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        message: "Google login successful",
        user: userData,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error during Google authentication",
      error: error.message,
    });
  }
};

export const logoutUser = (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ success: true, message: "Logout successful" });
};
