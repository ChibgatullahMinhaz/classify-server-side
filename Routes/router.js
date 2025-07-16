import { Router } from "express";
import { getPopularClasses, serverStart } from "../Controllers/initial.js";
import { getApprovedClasses, getClassById } from "../Controllers/classController.js";
import { existingTeacherRequest, retryTeacherRequest, submitTeacherRequest } from "../Controllers/teacherRequestController.js";
import { approveTeacherRequest, getAllTeacherRequests, rejectTeacherRequest } from "../Controllers/adminTeacherController.js";
import { getAllUsers, makeUserAdmin } from "../Controllers/userAdminController.js";
import { approveClass, getAllClasses, rejectClass } from "../Controllers/adminClassController.js";
import { addNewClass } from "../Controllers/addClassController.js";
import { createAssignment, deleteClass, getClassDetails, getClassProgress, getMyClasses, updateClass } from "../Controllers/teacherClassController.js";
import { getUserRole, saveUser } from "../Controllers/userController.js";
import { getDashboardStats } from "../Controllers/dashboardStatsController.js";
const router = Router();

// running the server
router.get('/', serverStart);//✅
//get popular classes 
router.get("/classes/popular", getPopularClasses);

// get all approved class
router.get("/api/ApprovedClasses", getApprovedClasses); //✅
// get one class for show details 
router.get("/api/classDetails/:id", getClassById); //✅
// request as a teacher 
router.post("/api/teacher-request", submitTeacherRequest);//✅
router.get("/api/teacher-request", existingTeacherRequest); //✅
router.patch("/api/teacher-request/retry/:email", retryTeacherRequest);//✅

// admin teacher controller
router.get("/teacher-requests", getAllTeacherRequests);//✅
router.patch("/teacher-requests/approve/:id", approveTeacherRequest);//✅
router.patch("/teacher-requests/reject/:id", rejectTeacherRequest);//✅

// GET all users with optional search ?search=abc
router.get("/admin/users", getAllUsers);//✅

// PATCH make admin
router.patch("/users/make-admin/:id", makeUserAdmin);//✅

// GET all classes (admin view)
router.get("/admin/classes", getAllClasses);//✅

// PATCH approve class
router.patch("/admin/classes/approve/:id", approveClass); //✅

// PATCH reject class
router.patch("/admin/classes/reject/:id", rejectClass); //✅
//teacher side api

// POST route to add a new class
router.post("/addClasses", addNewClass); //✅



// Teacher's Classes
router.get("/my-classes", getMyClasses); //✅
router.put("/class/:id", updateClass); //✅
router.delete("/class/:id", deleteClass);//✅
router.get("/class/:id", getClassDetails);

// Assignments
router.post("/assignments", createAssignment);

// Class Progress Data
router.get("/class-progress/:id", getClassProgress);

// authentication
router.post('/save/users', saveUser); //✅
router.get('/users/role', getUserRole); //✅


// get dashboard-stats
router.get('/dashboard-stats', getDashboardStats);



// middleware usage example 
// router.get('/admin-only', verifyFirebaseJWT, requireAdmin, (req, res) => {
//   res.send('Hello Admin!');
// });

// router.post('/add-class', verifyFirebaseJWT, requireTeacher, (req, res) => {
//   res.send('Class created by teacher');
// });

// router.get('/my-profile', verifyFirebaseJWT, requireOwnAccess, (req, res) => {
//   res.send(`This is your profile, ${req.user.email}`);
// });

export default router;