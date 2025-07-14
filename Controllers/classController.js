import db from '../config/db.js'
import { ObjectId } from "mongodb";

// controllers/classController.js
export const getApprovedClasses = async (req, res) => {
    try {
        const dataBase = db.getDB()
        const classes = await dataBase.collection("classes").find({ status: "approved" }).toArray();
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

        res.status(200).json(classData);
    } catch (error) {
        console.error("Error fetching class by ID:", error);
        res.status(500).json({ message: "Failed to fetch class data" });
    }
};
