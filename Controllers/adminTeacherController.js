import { ObjectId } from "mongodb";
import dataBase from '../config/db.js'
// GET all teacher requests
export const getAllTeacherRequests = async (req, res) => {
    try {
        const db = dataBase.getDB();
        const query = { status: 'pending' }
        const requests = await db.collection("teacherRequests").find(query).toArray();
        res.json(requests);
    } catch (error) {
        console.error("Error fetching teacher requests:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// PATCH approve request
export const approveTeacherRequest = async (req, res) => {
    const { id } = req.params;
    try {
        const db = dataBase.getDB();

        // Update teacherRequests status
        await db.collection("teacherRequests").updateOne(
            { _id: new ObjectId(id) },
            { $set: { status: "accepted" } }
        );

        // Get the email of the user to update role
        const request = await db.collection("teacherRequests").findOne({ _id: new ObjectId(id) });
        if (request) {
            await db.collection("users").updateOne(
                { email: request.email },
                { $set: { role: "teacher" } }
            );
        }

        res.json({ message: "Request approved and role updated." });
    } catch (error) {
        console.error("Error approving request:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// PATCH reject request
export const rejectTeacherRequest = async (req, res) => {
    const { id } = req.params;
    try {
        const db = dataBase.getDB();

        await db.collection("teacherRequests").updateOne(
            { _id: new ObjectId(id) },
            { $set: { status: "rejected" } }
        );

        res.json({ message: "Request rejected." });
    } catch (error) {
        console.error("Error rejecting request:", error);
        res.status(500).json({ message: "Server error" });
    }
};
