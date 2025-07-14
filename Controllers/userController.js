import db from '../config/db.js';

export const saveUser = async (req, res) => {
    const { name, email, image, role = "student" } = req.body;

    try {
        // Check for existing user
        const existingUser = await db.collection('users').findOne({ email });

        if (existingUser) {
            return res.status(200).json({ message: "User already exists", user: existingUser });
        }

        const newUser = {
            name,
            email,
            image,
            role: 'student',
            createdAt: new Date(),
        };

        const result = await db.collection('users').insertOne(newUser);
        res.status(201).json({ message: "User created successfully", insertedId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: "Failed to save user", error });
    }
};
