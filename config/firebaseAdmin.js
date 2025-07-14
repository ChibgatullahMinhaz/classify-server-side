// firebaseAdmin.js
import admin from 'firebase-admin';
import { readFileSync } from 'fs';

// Use service account JSON (from Firebase console)
const serviceAccount = JSON.parse(
  readFileSync('./serviceAccountKey.json', 'utf8')
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
