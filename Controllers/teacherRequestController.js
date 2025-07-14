// controllers/teacherRequestController.js
import { ObjectId } from "mongodb";
import db from '../config/db.js'
export const submitTeacherRequest = async (req, res) => {
    try {
        const dataBase = db.getDB()

        const {
            name,
            email,
            image,
            experience,
            title,
            category,
        } = req.body;

        if (!name || !email || !experience || !title || !category) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Check if already submitted and is pending or accepted
        const existing = await dataBase.collection("teacherRequests").findOne({ email });

        if (existing && existing.status === "pending") {
            return res.status(409).json({ message: "Request already submitted and pending" });
        }

        if (existing && existing.status === "accepted") {
            return res.status(409).json({ message: "You are already accepted as a teacher" });
        }

        const request = {
            name,
            email,
            image,
            experience,
            title,
            category,
            status: "pending",
            createdAt: new Date(),
        };

        if (existing && existing.status === "rejected") {
            // Update status back to pending
            await dataBase.collection("teacherRequests").updateOne(
                { _id: existing._id },
                { $set: { ...request } }
            );
            return res.status(200).json({ message: "Request resubmitted for review" });
        }

        // First-time submission
        const result = await dataBase.collection("teacherRequests").insertOne(request);

        res.status(201).json({ insertedId: result.insertedId });
    } catch (error) {
        console.error("Teacher Request Submission Failed:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
