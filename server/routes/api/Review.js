const express = require("express");
const router = express.Router();
const ReviewController = require("../../controllers/ReviewController");
router.get("/my-reviews", ReviewController.getMyReviews);
router.post(
  "/instructors/:id/add-review",
  ReviewController.addInstructorReview
);
router.post("/courses/:id/add-review", ReviewController.addCourseReview);
router.put(
  "/instructors/:id/edit-review",
  ReviewController.editInstructorReview
);
router.put("/courses/:id/edit-review", ReviewController.editCourseReview);

module.exports = router;
