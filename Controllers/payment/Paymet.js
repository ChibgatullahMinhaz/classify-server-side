import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import database from '../../config/db.js'
import { ObjectId } from "mongodb";

export const processPayment = async (req, res) => {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
        return res.status(400).send({ message: "Amount and currency are required." });
    }
    try {

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            automatic_payment_methods: { enabled: true },
        });

        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        console.error("Stripe error:", err.message);
        res.status(500).send({ success: false, message: err.message });
    }
};


export const enrollment = async (req, res) => {
    try {
        const db = database.getDB();
        const data = req.body;
        const enrollmentsCollection = db.collection('enrollments');
        const paymentHistory = db.collection("paymentHistory");
        const classesCollection = db.collection("classes");

        // same payment history 
        const paymentResult = await paymentHistory.insertOne(data?.bookingHistory);
        
        //  prevent duplicate enrollments
        const exists = await enrollmentsCollection.findOne({
            userEmail: data?.enrollmentInfo?.userEmail,
            classId: data?.enrollmentInfo?.classId,
        });

        // redefine enrollment data 
        const enrollment = {
            ...data?.enrollmentInfo,
            userEmail: data?.enrollmentInfo?.userEmail,
            paymentStatus: "paid",
            createdAt: new Date(),
        };
        // save enrolment
        await enrollmentsCollection.insertOne(enrollment)
        const id = data?.enrollmentInfo?.classId;
        const query = { _id: new ObjectId(id) };
        const update = { $inc: { totalEnrollment: 1 } };
        // incr enrollment count
        const enrollmentCount = await classesCollection.updateOne(query, update);

        res.status(201).json({
            message: "Enrollment and payment recorded successfully.",
            enrollmentInserted: true,
            totalEnrollmentUpdated: enrollmentCount.modifiedCount > 0,
        });
    } catch (error) {
        console.error("Error saving booking:", error);
        res.status(500).json({ message: "Failed to save booking." });
    }
};