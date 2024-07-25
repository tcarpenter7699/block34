const express = require("express");
const router = express.Router();


const {
  fetchCustomers,
  getSingleReservationByCustomerId,
  fetchSingleCustomer,
} = require("./db");


//all customers
router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchCustomers());
  } catch (err) {
    next(err);
  }
});


//single customer by id
router.get("/:id", async (req, res, next) => {
  try {
    res.send(await fetchSingleCustomer(req.params.id));
  } catch (err) {
    next(err);
  }
});

//getting reservation by customer id
router.get("/:id/reservations", async (req, res, next) => {
  try {
    res.send(await getSingleReservationByCustomerId(req.params.id));
  } catch (err) {
    next(err);
  }
});
module.exports = router;