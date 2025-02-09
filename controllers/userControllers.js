import jwt from 'jsonwebtoken';
import env from 'dotenv';
import { User } from "../models/userModel.js";
import { comparePassword, hashPassword } from "../routes/utils/password.js";

env.config();

export const createAccount = async (req, res) => {
  console.log(req.body)
  try {
    const { email, password } = req.body;

    const isUserPresent = await User.findOne({ email });
    if (isUserPresent) {
      return res.status(400).json({ message: "User already exists, please login." });

    }

    const hashedPassword = await hashPassword(password);
    await User.create({ ...req.body, password: hashedPassword });
    return res.status(201).json({ message: "Account created successfully." });

  } catch (error) {
    console.error("Error in createAccount:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const loginAccount = async (req, res) => {
  console.log(req.body)
  try {
    const { email, password } = req.body;

    const isUserPresent = await User.findOne({ email });
    console.log(isUserPresent)
    if (!isUserPresent) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordMatch = await comparePassword(password, isUserPresent.password);
    console.log(isPasswordMatch)

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { email: isUserPresent.email, id: isUserPresent._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '5h' }
    );

    return res.status(200).json({ message: "Login successful.", token });

  } catch (error) {
    console.error("Error in loginAccount:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const userProfile =async (req, res) => {
  try {
    const user=await User.findById(req.user.id).select('-password')
    console.log(user)
    return res.status(200).json({ message: "User profile",user })

  } catch (error) {
    return res.status(500).json({ message: "error"});

  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id
    const { phoneNumber, address, gender } = req.body

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        phoneNumber,
        address,
        gender,
      },
      { new: true, runValidators: true }
    ).select('-password')

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Profile updated successfully", user: updatedUser })
  } catch (error) {
    console.error("Error in updateUserProfile", error)
    return res.status(500).json({ message: "Server error Please try again later" })
  }
};

