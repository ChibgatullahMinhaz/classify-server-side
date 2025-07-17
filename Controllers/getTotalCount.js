import dataBase from '../config/db.js';

export const getCountOfData = async (req, res) => {
    const { email } = req.query;

    try {
        const db = dataBase.getDB();
        //collections
        const usersCollection = db.collection("users")
        const totalUser = await usersCollection.countDocuments();

        const counts = { totalUser }
        res.json(counts);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user role", error });
    }
};