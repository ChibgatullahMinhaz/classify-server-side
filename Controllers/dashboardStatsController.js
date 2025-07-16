import database from '../config/db.js'
export const getDashboardStats = async (req, res) => {
    try {
        const db = database.getDB() 

        const totalUsers = await db.collection('users').countDocuments();
        const totalClasses = await db.collection('classes').countDocuments();
        const totalEnrollments = await db.collection('enrollments').countDocuments();

        res.status(200).json({
            totalUsers,
            totalClasses,
            totalEnrollments,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to fetch dashboard stats',
            error: err.message,
        });
    }
};

