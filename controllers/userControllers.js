import { User } from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/password.js";

export const createAccount = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserPresent = await User.findOne({ email });
    console.log(isUserPresent);
    if (!isUserPresent) {
      const hashedPassword = await hashPassword(password);
      await User.create({ ...req.body, password: hashedPassword });
      console.log("user ceated");
      return res.status(201).json({ message: "Account created successfully." });
    }
    res.status(400).json({ message: "User already exsit please login." });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};

export const loginAccount = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserPresent = await User.findOne({ email });

    if (isUserPresent) {
      const storedHashedPassword = isUserPresent.password;

      const isPasswordMatch = await comparePassword(
        storedHashedPassword,
        password
      );

      if (isPasswordMatch) {
        return res.status(200).json({ message: "Login successful." });
      } else {
        return res.status(401).json({ message: "Invalid credentials." });
      }
    }

    return res.status(404).json({ message: "User not found." });
  } catch (err) {
    return res.status(500).json({ message: "Server error." });
  }
};
