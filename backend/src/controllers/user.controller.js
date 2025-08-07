import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const updateUserProfile = async (req, res, next) => {
  const userId = req.params.id;

  if (req.user.id !== userId) {
    return res.status(403).json({
      status: false,
      message: "You can only update your own profile!",
    });
  }
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUserData = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    if (!updatedUserData) {
      return next(errorHandler(404, "User not found"));
    }

    const { password, ...userData } = updatedUserData._doc;
    return res.status(200).json({
      status: true,
      message: "Profile updated successfully",
      user: userData,
    });
  } catch (error) {
    return next(errorHandler(500, `${error.message}`));
  }
};

export const deleteUserProfile = async (req, res, next) => {
  const userId = req.params.id;

  if (req.user.id !== userId) {
    return res.status(403).json({
      status: false,
      message: "You can only delete your own profile!",
    });
  }
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return next(errorHandler(404, "User not found"));
    }
    return res.status(200).json({
      status: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    return next(errorHandler(500, `${error.message}`));
  }
};

export const getUserSeller = async (req, res) => {
  try {
    const userId = req.params.sellerId;
    const userDetails = await User.findById(userId).select("-password");
    if (!userDetails) {
      return res.status(404).json({
        status: false,
        message: "Seller not found",
      });
    }
    return res.status(200).json({
      status: true,
      seller: userDetails,
    });
  } catch (error) {
    return next(errorHandler(500, `${error.message}`));
  }
};
