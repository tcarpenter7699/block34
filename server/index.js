const express = require("express");
const app = express();
const baseQuery = "/api";
const { client } = require("./db")

app.use(express.json())
client.connect();



app.use(baseQuery + "/customers", require("./customers"));
app.use(baseQuery + "/restaurants", require("./restaurants"));
app.use(baseQuery + "/reservations", require("./reservations"));

app.listen(8080, () => {
  console.log("App is running at port 8080");
});