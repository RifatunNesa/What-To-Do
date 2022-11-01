const express = require("express");
const router = express.Router();

const routeHit = (req, res, next) => {
  return res.status(200).send("hit");
};

// get all tasks
router.route("/").get(routeHit);

// task by taskId endpoints
router
  .route("/task/:taskId")
  .post(routeHit)
  .get(routeHit)
  .put(routeHit)
  .delete(routeHit);

// get all task of a user
router.route("/user/:userId").get(routeHit);

module.exports = router;
