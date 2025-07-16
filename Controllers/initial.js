import databage from '../config/db.js'
export function serverStart(req, res) {
    res.send('Server is running smoothly!');
}


export const getPopularClasses = async (req, res) => {
  try {
    const db = databage.getDB();
    const collection = db.collection("classes");

    const popularClasses = await collection
      .find({})
      .sort({ totalEnrollment: -1 })
      .limit(6)
      .toArray();

    res.status(200).json(popularClasses);
  } catch (error) {
    console.error("❌ Error fetching popular classes:", error);
    res.status(500).json({ message: "Failed to fetch popular classes." });
  }
};


