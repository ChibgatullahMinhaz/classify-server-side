// controllers/classController.js
import { db } from "../config/db.js";
import { ObjectId } from "mongodb";

// 1. Get all classes (for admin dashboard)
export const getAllClasses = async (req, res) => {
  try {
    const classes = await db.collection("classes").find({}).toArray();
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ message: "Failed to load classes", error: err });
  }
};

// 2. Approve a class
export const approveClass = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.collection("classes").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "accepted" } }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Class approved successfully" });
    } else {
      res.status(404).json({ message: "Class not found or already approved" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to approve class", error: err });
  }
};

// 3. Reject a class
export const rejectClass = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.collection("classes").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "rejected" } }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Class rejected successfully" });
    } else {
      res.status(404).json({ message: "Class not found or already rejected" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to reject class", error: err });
  }
};
