import { Router } from "express";
import { serverStart } from "../Controllers/initial.js";
import { getApprovedClasses, getClassById } from "../Controllers/classController.js";
import { submitTeacherRequest } from "../Controllers/teacherRequestController.js";
const router = Router();

// running the server
router.get('/', serverStart);
// get all approved class
router.get("/api/ApprovedClasses", getApprovedClasses);
// get one class for show details 
router.get("/api/classDetails/:id", getClassById);
// request as a teacher 
router.post("/api/teacher-request", submitTeacherRequest);

export default router;