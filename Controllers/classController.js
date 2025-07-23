import db from '../config/db.js'
import { ObjectId } from "mongodb";

// controllers/classController.js
export const getApprovedClasses = async (req, res) => {
    try {
        const dataBase = db.getDB()
        const currentPage = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const classes = await dataBase.collection("classes").find({ status: "accepted" }).skip(currentPage * limit).limit(limit).toArray();
        res.json(classes);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch approved classes" });
    }
};

export const getClassById = async (req, res) => {
    const { id } = req.params;

    try {
        const dataBase = db.getDB()

        const classData = await dataBase.collection("classes").findOne({ _id: new ObjectId(id) });

        if (!classData) {
            return res.status(404).json({ message: "Class not found" });
        }
        const classDetails = {
            ...classData,

        }
        res.status(200).json(classData);
    } catch (error) {
        console.error("Error fetching class by ID:", error);
        res.status(500).json({ message: "Failed to fetch class data" });
    }
};


// // Get single class by ID
// export const getClassById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const db = req.app.locals.db;
//     const ObjectId = require("mongodb").ObjectId;

//     const foundClass = await db
//       .collection("classes")
//       .findOne({ _id: new ObjectId(id) });

//     if (!foundClass) {
//       return res.status(404).json({ message: "Class not found" });
//     }
//     res.json(foundClass);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to get class", error });
//   }
// };

// Get total enrollment count for a class
export const getEnrollmentCount = async (req, res) => {
    try {
        const { id } = req.params;
        const dataBase = db.getDB();
        const count = await dataBase
            .collection("enrollments")
            .countDocuments({ classId: id });

        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: "Failed to get enrollment count", error });
    }
};

// Get total assignment count for a class
export const getAllAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const dataBase = db.getDB();
        const totalAssignments = await dataBase
            .collection("assignments")
            .find({ classId: id }).toArray();
        res.json(totalAssignments);
    } catch (error) {
        res.status(500).json({ message: "Failed to get assignment count", error });
    }
};

// Get total submission count for a class
export const getSubmissionCount = async (req, res) => {
    try {
        const { id } = req.params;
        const dataBase = db.getDB();
        const count = await dataBase
            .collection("submissions")
            .countDocuments({ classId: id });

        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: "Failed to get submission count", error });
    }
};
