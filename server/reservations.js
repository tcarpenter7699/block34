const express = require("express");
const router = express.Router();
const {
  getAllReservations,
  addReservation,
  destroyReservation,
  destroyReservation,
} = require("./db");


//all reservations
router.get("/", async (req, res, next) => {
  try {
    res.send(await getAllReservations());
  } catch (err) {
    next(err);
  }
});

//creating/adding a reservation
router.post("/", async (req, res, next) => {
  try {
    res.send(await addReservation(req.body));
  } catch (err) {
    next(err);
  }
});


//deleting a reservation
router.delete("/:id", async (req, res, next) => {
  try {
    res.send(await destroyReservation(req.params.id));
  } catch (err) {
    next(err);
  }
});
module.exports = router;