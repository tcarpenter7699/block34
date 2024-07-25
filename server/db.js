const pg = require("pg");

const client = new pg.Client("postgres://localhost/reservation_planner");


//getting all customers
const fetchCustomers = async () => {
  const response = await client.query(`SELECT * FROM "Customer" ORDER BY id ASC`);
  return response.rows;
};


//getting a signle customer
const fetchSingleCustomer = async (id) => {
    const response = await client.query(`SELECT * FROM "Customer" WHERE id = $1`, [
      id,
    ]);
    return response.rows[0];
  };


//getting all restaurants
const fetchRestaurants = async () => {
    const response = await client.query(
      `SELECT * FROM "Restaurant" ORDER BY id ASC`
    );
    return response.rows;
  };


//getting all reservations
const getAllReservations = async () => {
  const response = await client.query(
    `SELECT * FROM "Reservation" ORDER BY id ASC`
  );
  return response.rows;
};


//adding a reservation
const addReservation = async (body) => {
  await client.query(
    `INSERT INTO "Reservation"(date, party_count, restaurant_id, customer_id) VALUES(now(), $1, $2, $3)`,
    [body.party_count, body.restaurant_id, body.customer_id]
  );
  return {
    party_count: body.party_count,
    restaurant_id: body.restaurant_id,
    customer_id: body.customer_id,
  };
};


//deleting a reservation
const destroyReservation = async (id) => {
  await client.query(`DELETE from "Reservation" WHERE id = $1`, [Number(id)]);
  return {
    id: id,
  };
};


//getting a single reservation by a cusomter's id
const getSingleReservationByCustomerId = async (params_id) => {
  const response = await client.query(`SELECT * FROM "Customer" WHERE id = $1`, [
    params_id,
  ]);
  const { id, name } = response.rows[0];
  const res_response = await client.query(
    `SELECT * FROM "Reservation" WHERE customer_id = $1`,
    [params_id]
  );
  return {
    id,
    name,
    reservation: res_response.rows,
  };
};


//getting a single reservation by a restaurant's id
const getSingleReservationByRestaurantId = async (params_id) => {
  const response = await client.query(
    `SELECT * FROM "Restaurant" WHERE id = $1`,
    [params_id]
  );
  const { id, name } = response.rows[0];
  const res_response = await client.query(
    `SELECT * FROM "Reservation" WHERE restaurant_id = $1`,
    [params_id]
  );
  return {
    id,
    name,
    reservation: res_response.rows,
  };
};

module.exports = {
  fetchCustomers,
  fetchSingleCustomer,
  fetchRestaurants,
  getAllReservations,
  addReservation,
  destroyReservation,
  getSingleReservationByCustomerId,
  getSingleReservationByRestaurantId,
  client,
};