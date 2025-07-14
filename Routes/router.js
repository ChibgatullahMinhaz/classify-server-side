import { Router } from "express";
import { serverStart } from "../Controllers/initial.js";
import { getApprovedClasses, getClassById } from "../Controllers/classController.js";
import { submitTeacherRequest } from "../Controllers/teacherRequestController.js";
import { approveTeacherRequest, getAllTeacherRequests, rejectTeacherRequest } from "../Controllers/adminTeacherController.js";
import { getAllUsers, makeUserAdmin } from "../Controllers/userAdminController.js";
import { approveClass, getAllClasses, rejectClass } from "../Controllers/adminClassController.js";
import { addNewClass } from "../Controllers/addClassController.js";
const router = Router();

// running the server
router.get('/', serverStart);
// get all approved class
router.get("/api/ApprovedClasses", getApprovedClasses);
// get one class for show details 
router.get("/api/classDetails/:id", getClassById);
// request as a teacher 
router.post("/api/teacher-request", submitTeacherRequest);


// admin teacher controller
router.get("/teacher-requests", getAllTeacherRequests);
router.patch("/teacher-requests/approve/:id", approveTeacherRequest);
router.patch("/teacher-requests/reject/:id", rejectTeacherRequest);

// GET all users with optional search ?search=abc
router.get("/users", getAllUsers);

// PATCH make admin
router.patch("/users/make-admin/:id", makeUserAdmin);

// GET all classes (admin view)
router.get("/admin/classes", getAllClasses);

// PATCH approve class
router.patch("/admin/classes/approve/:id", approveClass);

// PATCH reject class
router.patch("/admin/classes/reject/:id", rejectClass);
//teacher side api

// POST route to add a new class
router.post("/addClasses", addNewClass);


export default router;