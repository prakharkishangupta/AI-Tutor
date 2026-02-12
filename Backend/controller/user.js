import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../model/User.js";
import emailService from "../services/emailService.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    console.log("body: ", req.body);
    console.log("userImage: ", req.file);
    const profileImage = req.file ? req.file.path : '';
    console.log("profileImage", profileImage);

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ userName, email, password: hashedPassword, profileImage });
    await newUser.save();
    console.log("newUser:", newUser);
    if (newUser) {
      await emailService.sendWelcomeEmail(email, userName);
      res.status(200).json({
        message: "UserRegisters Successfully", user: {
          userName: newUser.userName,
          email: newUser.email,
          profileImage: newUser.profileImage,
          _id: newUser._id
        }
      })
    }


  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Unknown error" })

  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.cookie("jwt", token, {
      httpOnly: true, //saves from xss attack
      secure: true, //cookie only works on https in production
      sameSite:"none" ,//saves fron csrf attack
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        profileImage: user.profileImage
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};

export const getProfile = async(req, res) => {
  try {
    const userData = await User.findById(req.userId);
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user data ", error });
  }
}

// userController.js

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
