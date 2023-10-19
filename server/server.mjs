import express from "express";
import morgan from "morgan";
import cors from "cors";
import pool from "./db/index.mjs";
const app = express();

app.use(express.json()); // built-in body-parser
app.use(morgan("dev")); // third-party logger
app.use(cors());

app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await pool.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*) AS review_count, TRUNC(AVG(rating), 1) AS avg_rating FROM reviews GROUP BY restaurant_id) AS reviews ON restaurant_id = reviews.restaurant_id"
    );
    res.json({
      length: restaurants.rows.length,
      data: restaurants.rows,
    });
  } catch (err) {
    console.error(err);
  }
});

app.get("/restaurants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await pool.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*) AS review_count, TRUNC(AVG(rating), 1) AS avg_rating FROM reviews GROUP BY restaurant_id) AS reviews ON restaurant_id = reviews.restaurant_id WHERE id = $1",
      [id]
    );
    const reviews = await pool.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1",
      [id]
    );
    res.json({
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

app.post("/restaurants", async (req, res) => {
  try {
    const { name, location, price_range } = req.body;
    const restaurant = await pool.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
      [name, location, price_range]
    );
    res.json(restaurant.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

app.put("/restaurants/:id", async (req, res) => {
  try {
    const { name, location, price_range } = req.body;
    const { id } = req.params;

    const restaurant = await pool.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
      [name, location, price_range, id]
    );
    res.json(restaurant.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

app.delete("/restaurants/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM reviews WHERE reviews.restaurant_id = $1", [
      id,
    ]);

    const restaurant = await pool.query(
      "DELETE FROM restaurants WHERE id = $1 RETURNING *",
      [id]
    );
    res.json(restaurant.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

app.post("/restaurants/:id/reviews", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, review, rating } = req.body;
    const addedReview = await pool.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *",
      [id, name, review, rating]
    );
    res.json(addedReview.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
