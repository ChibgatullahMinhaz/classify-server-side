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


export const getUserRole = async (req, res) => {
  const { email } = req.params; 

  try {
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ email: user.email, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user role", error });
  }
};
