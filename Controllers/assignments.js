import db from '../config/db.js';
import { ObjectId } from 'mongodb';

export const assignmentSubmission = async (req, res) => {
  const submissionData = req.body;
  const { email } = req.query;

  if (!email || !submissionData.assignmentId) {
    return res.status(400).json({ message: "Email and assignment ID are required." });
  }

  try {
    const dataBase = db.getDB()

    const submissionsCollection = dataBase.collection('submissions');

    // Check if this user already submitted this assignment
    const alreadySubmitted = await submissionsCollection.findOne({
      email,
      assignmentId: submissionData.assignmentId
    });

    if (alreadySubmitted) {
      return res.status(409).json({ message: "You have already submitted this assignment." });
    }

    // Save the submission
    const result = await submissionsCollection.insertOne(submissionData);

    if (result.insertedId) {
      return res.status(201).json({ message: "Assignment submitted successfully." });
    } else {
      return res.status(500).json({ message: "Submission failed." });
    }

  } catch (error) {
    console.error("Submission Error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};
export const reviewSubmission = async (req, res) => {
  const reviewData = req.body;
  try {
    const dataBase = db.getDB()

    const reviewCollection = dataBase.collection('feedbacks');

    // Save the submission
    const result = await reviewCollection.insertOne(reviewData);

    if (result.insertedId) {
      return res.status(201).json({ message: "review submitted successfully." });
    } else {
      return res.status(500).json({ message: "Submission failed." });
    }

  } catch (error) {
    console.error("Submission Error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};
