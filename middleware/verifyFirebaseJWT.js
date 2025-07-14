// middlewares/verifyFirebaseJWT.js
import admin from '../firebaseAdmin.js';
import { usersCollection } from '../config/db.js';

export const verifyFirebaseJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).send({ error: 'Unauthorized - No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // contains email, uid, etc.

    // OPTIONAL: fetch user role from DB
    const user = await usersCollection.findOne({ email: decodedToken.email });
    if (!user) return res.status(403).send({ error: 'User not found in database' });

    req.user.role = user.role; // attach role to req.user
    next();
  } catch (error) {
    return res.status(403).send({ error: 'Forbidden - Invalid token', details: error.message });
  }
};



// Only Admin
export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).send({ error: 'Access denied - Admins only' });
  }
  next();
};

// Only Teacher
export const requireTeacher = (req, res, next) => {
  if (req.user?.role !== 'teacher') {
    return res.status(403).send({ error: 'Access denied - Teachers only' });
  }
  next();
};

// Only Self (Own data access)
export const requireOwnAccess = (req, res, next) => {
  const targetEmail = req.query.email || req.body.email;
  if (req.user?.email !== targetEmail) {
    return res.status(403).send({ error: 'Access denied - Only your own data' });
  }
  next();
};
