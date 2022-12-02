const express = require("express");
const router = express.Router();
const ReviewController = require("../../controllers/ReviewController");
router.get("/my-reviews", ReviewController.getMyReviews);
router.get(
  "/my-courses/:id/get-my-reviews",
  ReviewController.getTraineeReviews
);
router.post(
  "/my-courses/:id/instructors/:id/add-review",
  ReviewController.addInstructorReview
);
router.post("/my-courses/:id/add-review", ReviewController.addCourseReview);
router.put(
  "/my-courses/:id/instructors/:id/edit-review",
  ReviewController.editInstructorReview
);
router.put("/my-courses/:id/edit-review", ReviewController.editCourseReview);

module.exports = router;
