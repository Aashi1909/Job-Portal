import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { postJob, getAllJobs, getJobById, getAdminJobs} from "../controllers/job.controller.js";

const router = express.Router();

router.route("/postJob").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/getAdminJobs").get(isAuthenticated, getAdminJobs);

export default router;