
import database from '../config/db.js'

// ✅ GET: /api/user-enrollments?email=user@example.com

import { ObjectId } from "mongodb";

export const getMyEnrollments = async (req, res) => {
    try {
        const db = database.getDB();
        const enrollmentsCollection = db.collection("enrollments");
        const classesCollection = db.collection("classes");

        const email = req.query.email;

        // Step 1: Get all enrollments by user
        const enrollments = await enrollmentsCollection
            .find({ userEmail: email })
            .toArray();

        // Step 2: Extract classIds
        const classIds = enrollments.map((enroll) => new ObjectId(enroll.classId));

        // Step 3: Get class details from classes collection
        const classes = await classesCollection
            .find({ _id: { $in: classIds } })
            .toArray();

        // Optional: Attach enrollment info with each class
        const mergedData = classes.map((classItem) => {
            const enrollment = enrollments.find(
                (e) => e.classId === classItem._id.toString()
            );

            return {
                ...classItem,
                enrollmentInfo: {
                    enrollmentStatus: enrollment.enrollmentStatus,
                    paymentStatus: enrollment.paymentStatus,
                    paymentDate: enrollment.paymentDate,
                    enrollmentDate: enrollment.enrollmentDate,
                    amountPaid: enrollment.amountPaid,
                },
            };
        });

        res.status(200).json(mergedData);
    } catch (err) {
        console.error("Error fetching enrollments with class details:", err);
        res.status(500).json({ message: "Failed to fetch enrollments." });
    }
};




// ✅ GET: /api/user-enrollments?email=user@example.com

export const getUserEnrollments = async (req, res) => {
    try {
        const db = database.getDB();
        const enrollmentsCollection = db.collection("enrollments");
        const email = req.query.email;

        const enrolledClasses = await enrollmentsCollection.find({ userEmail: email }).toArray();

        const classIds = enrolledClasses.map((e) => e.classId);

        res.status(200).json(classIds);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch enrollments." });
    }
};
