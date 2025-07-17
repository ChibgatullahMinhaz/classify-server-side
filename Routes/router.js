import { Router } from "express";
import { getAllTeacherFeedbacks, getPopularClasses, serverStart } from "../Controllers/initial.js";
import { getAllAssignment, getApprovedClasses, getClassById, getEnrollmentCount, getSubmissionCount } from "../Controllers/classController.js";
import { existingTeacherRequest, retryTeacherRequest, submitTeacherRequest } from "../Controllers/teacherRequestController.js";
import { approveTeacherRequest, getAllTeacherRequests, rejectTeacherRequest } from "../Controllers/adminTeacherController.js";
import { getAllUsers, makeUserAdmin } from "../Controllers/userAdminController.js";
import { approveClass, getAllClasses, rejectClass } from "../Controllers/adminClassController.js";
import { addNewClass } from "../Controllers/addClassController.js";
import { createAssignment, deleteClass, getClassDetails, getClassProgress, getMyClasses, updateClass } from "../Controllers/teacherClassController.js";
import { getUserRole, saveUser } from "../Controllers/userController.js";
import { getDashboardStats } from "../Controllers/dashboardStatsController.js";
import { enrollment, processPayment } from "../Controllers/payment/Paymet.js";
import { getMyEnrollments, getUserEnrollments } from "../Controllers/Enrollments.js";
import { assignmentSubmission, reviewSubmission } from "../Controllers/assignments.js";
import { requireAdmin, requireOwnAccess, requireTeacher, verifyFirebaseJWT } from "../middleware/verifyFirebaseJWT.js";
import { getCountOfData } from "../Controllers/getTotalCount.js";
const router = Router();

// running the server
router.get('/', serverStart);//✅
//get popular classes 
router.get("/classes/popular", getPopularClasses); //✅
//get feedback
router.get("/feedbacks", getAllTeacherFeedbacks); //✅

// get all approved class
router.get("/api/ApprovedClasses", getApprovedClasses); //✅
// get one class for show details 
router.get("/api/classDetails/:id", getClassById); //✅
// request as a teacher 
router.post("/api/teacher-request", verifyFirebaseJWT, requireOwnAccess, submitTeacherRequest);//✅
router.get("/api/teacher-request", existingTeacherRequest); //✅
router.patch("/api/teacher-request/retry/:email", retryTeacherRequest);//✅

// admin teacher controller
router.get("/teacher-requests", verifyFirebaseJWT, requireAdmin, getAllTeacherRequests);//✅
router.patch("/teacher-requests/approve/:id", verifyFirebaseJWT, requireAdmin, approveTeacherRequest);//✅
router.patch("/teacher-requests/reject/:id", verifyFirebaseJWT, requireAdmin, rejectTeacherRequest);//✅

// GET all users with optional search ?search=abc
router.get("/admin/users", verifyFirebaseJWT, requireAdmin, getAllUsers);//✅

// PATCH make admin
router.patch("/users/make-admin/:id", verifyFirebaseJWT, requireAdmin, makeUserAdmin);//✅

// GET all classes (admin view)
router.get("/admin/classes", verifyFirebaseJWT, requireAdmin, getAllClasses);//✅

// PATCH approve class
router.patch("/admin/classes/approve/:id", verifyFirebaseJWT, requireAdmin, approveClass); //✅

// PATCH reject class
router.patch("/admin/classes/reject/:id", verifyFirebaseJWT, requireAdmin, rejectClass); //✅
//teacher side api

// POST route to add a new class
router.post("/addClasses", verifyFirebaseJWT, requireTeacher, addNewClass); //✅



// Teacher's Classes
router.get("/my-classes", verifyFirebaseJWT, requireOwnAccess, requireTeacher, getMyClasses); //✅
router.put("/class/:id", verifyFirebaseJWT, requireTeacher, updateClass); //✅
router.delete("/class/:id", verifyFirebaseJWT, requireTeacher, deleteClass);//✅
router.get("/class/:id", verifyFirebaseJWT, getClassDetails);

// Assignments
router.post("/assignments", verifyFirebaseJWT, requireTeacher, createAssignment);//✅

// Class Progress Data
router.get("/class-progress/:id", verifyFirebaseJWT, getClassProgress); //✅ pending.......

// authentication
router.post('/save/users', saveUser); //✅
router.get('/users/role', getUserRole); //✅


// get dashboard-stats
router.get('/dashboard-stats', getDashboardStats); //✅


//payment system  using stripe 
router.post('/api/create-checkout-session', processPayment)//✅
// make payment history and enrollment
router.post("/api/enrollments", enrollment) //✅
router.get("/my-enrollments", verifyFirebaseJWT, requireOwnAccess, getMyEnrollments)//✅
router.get("/api/user-enrollments", verifyFirebaseJWT, requireOwnAccess, getUserEnrollments)//✅


//already have class progress api need review for this 

// get all assignments  of the class  
router.get("/getAll/assignments/:id", verifyFirebaseJWT, getAllAssignment);

router.post("/api/assignments/submit", verifyFirebaseJWT, assignmentSubmission);
router.post("/api/evaluation", verifyFirebaseJWT, reviewSubmission);

// total count for pagination
router.get("/get/total/count/data",  getCountOfData);
// verifyFirebaseJWT,
export default router;