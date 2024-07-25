const express = require("express");
const router = express.Router();
const {
  fetchRestaurants,
  getSingleReservationByRestaurantId,
} = require("./db");



//all restaurants
router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchRestaurants());
  } catch (err) {
    next(err);
  }
});


//single restaurants reservation by id
router.get("/:id/reservations", async (req, res, next) => {
  try {
    res.send(await getSingleReservationByRestaurantId(req.params.id));
  } catch (err) {
    next(err);
  }
});
module.exports = router;