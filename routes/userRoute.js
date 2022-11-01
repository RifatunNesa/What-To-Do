const express = require("express");
const router = express.Router();

const routeHit = (req, res, next) => {
  return res.status(200).send("hit");
};

router.post("/auth/signUp", routeHit);
router.post("/auth/logIn", routeHit);
router.post("/auth/logOut", routeHit);

// get all users
router.route("/").get(routeHit);

// user by username endpoints
router.route("/user/:userName").get(routeHit).put(routeHit).delete(routeHit);

// search user by userName by substring
router.route("/search/:userNameKey").get(routeHit);

module.exports = router;
