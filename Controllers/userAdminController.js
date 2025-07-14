import { ObjectId } from "mongodb";
import dataBage  from '../config/db.js'

// GET all users with optional search
export const getAllUsers = async (req, res) => {
  try {
    const db = dataBage.getDB();
    const { search } = req.query;

    let query = {};
    if (search) {
      const regex = new RegExp(search, "i");
      query = {
        $or: [{ name: regex }, { email: regex }],
      };
    }

    const users = await db.collection("users").find(query).toArray();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH: Make a user admin
export const makeUserAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const db = dataBage.getDB();

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(id), role: { $ne: "admin" } },
      { $set: { role: "admin" } }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: "User is already an admin or not found." });
    }

    res.json({ message: "User promoted to admin successfully." });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Server error" });
  }
};
