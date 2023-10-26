import pool from "../db/index.mjs";

export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await pool.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*) AS review_count, TRUNC(AVG(rating), 1) AS avg_rating FROM reviews GROUP BY restaurant_id) AS reviews ON id = reviews.restaurant_id"
    );
    res.json({
      length: restaurants.rows.length,
      data: restaurants.rows,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await pool.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*) AS review_count, TRUNC(AVG(rating), 1) AS avg_rating FROM reviews GROUP BY restaurant_id) AS reviews ON id = reviews.restaurant_id WHERE id = $1",
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
};

export const addRestaurant = async (req, res) => {
  try {
    const { name, location, price_range } = req.body;
    const restaurant = await pool.query(
      "INSERT INTO restaurants (name, location, price_range, date) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, location, price_range, new Date()]
    );
    res.json(restaurant.rows[0]);
  } catch (err) {
    console.error(err);
  }
};

export const updateRestaurant = async (req, res) => {
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
};

export const deleteRestaurant = async (req, res) => {
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
};

export const addRestaurantReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, review, rating } = req.body;
    const addedReview = await pool.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating, date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [id, name, review, rating, new Date()]
    );
    res.json(addedReview.rows[0]);
  } catch (err) {
    console.error(err);
  }
};
