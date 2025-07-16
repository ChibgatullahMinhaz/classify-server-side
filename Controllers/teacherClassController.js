import { ObjectId } from "mongodb";
import db from "../config/db.js";

// 1️⃣ Get All Classes by Teacher
export const getMyClasses = async (req, res) => {
  const { email } = req.query;
  try {
    const dataBase = db.getDB()

    const classes = await dataBase.collection("classes").find({ email }).toArray();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch classes", error });
  }
};

// 2️⃣ Update Class
export const updateClass = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  console.log(updates)
  try {
    const dataBase = db.getDB()

    const result = await dataBase.collection("classes").updateOne(
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
    const dataBase = db.getDB()

    const result = await dataBase.collection("classes").deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "Class deleted", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete", error });
  }
};

// 4️⃣ Get Single Class Details
export const getClassDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const dataBase = db.getDB()

    const classData = await dataBase.collection("classes").findOne({ _id: new ObjectId(id) });
    res.status(200).json(classData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching class", error });
  }
};

// 5️⃣ Create Assignment for Class
export const createAssignment = async (req, res) => {
  try {
    const dataBase = db.getDB()

    const assignment = {
      ...req.body,
      classId: new ObjectId(req.body.classId),
      createdAt: new Date()
    };
    const result = await dataBase.collection("assignments").insertOne(assignment);
    res.status(201).json({ message: "Assignment created", insertedId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Failed to create assignment", error });
  }
};

// 6️⃣ Class Progress (Assignment count, submission count, enrollment)
export const getClassProgress = async (req, res) => {
  const { id } = req.params;
  const classId = new ObjectId(id);

  try {
    const dataBase = db.getDB()
    const classData = await dataBase.collection("classes").findOne({ _id: classId });
    const totalAssignments = await dataBase.collection("assignments").countDocuments({ classId });
    const totalSubmissions = await dataBase.collection("submissions").countDocuments({ classId });

    res.status(200).json({
      totalEnrollment: classData?.totalEnrollment || 0,
      totalAssignments,
      totalSubmissions
    });
  } catch (error) {
    res.status(500).json({ message: "Error getting progress", error });
  }
};
