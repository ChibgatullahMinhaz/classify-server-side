import { ObjectId } from "mongodb";
import db from "../config/db.js";

// POST: Add new class (by teacher)
export const addNewClass = async (req, res) => {
  try {
    const dataBase = db.getDB()

    const {
      title,
      name,
      email,
      price,
      description,
      image
    } = req.body;

    if (!title || !name || !email || !price || !description || !image) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newClass = {
      title,
      name,
      email,
      price: parseFloat(price),
      description,
      image,
      totalEnrollment: 0,
      status: "pending",
      createdAt: new Date()
    };

    const result = await dataBase.collection("classes").insertOne(newClass);

    if (result.insertedId) {
      res.status(201).json({
        message: "Class added successfully and pending approval",
        insertedId: result.insertedId
      });
    } else {
      res.status(500).json({ message: "Failed to add class." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
