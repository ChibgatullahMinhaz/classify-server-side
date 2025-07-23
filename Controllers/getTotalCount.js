import dataBase from '../config/db.js';

export const getCountOfData = async (req, res) => {
    try {
        const db = dataBase.getDB();

        const usersCollection = db.collection("users");
        const classCollection = db.collection("classes");
        const teacherRequestCollection = db.collection("teacherRequests");

        
        const totalUser = await usersCollection.countDocuments();
        const totalClass = await classCollection.countDocuments();
        const totalTeacherRequest = await teacherRequestCollection.countDocuments();
        const totalApprovedClasses = await classCollection.countDocuments({ status: "accepted" });

        const counts = { totalUser, totalClass, totalApprovedClasses, totalTeacherRequest };
        res.json(counts);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch counts", error });
    }
};