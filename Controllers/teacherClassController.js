import { ObjectId } from "mongodb";
import db from "../config/db.js";

// 1️⃣ Get All Classes by Teacher
export const getMyClasses = async (req, res) => {
  const { email } = req.query;
  try {
    const classes = await db.collection("classes").find({ email }).toArray();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch classes", error });
  }
};

// 2️⃣ Update Class
export const updateClass = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const result = await db.collection("classes").updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
    res.status(200).json({ message: "Class updated successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to update class", error });
  }
};

// 3️⃣ Delete Class
export const deleteClass = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.collection("classes").deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "Class deleted", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete", error });
  }
};

