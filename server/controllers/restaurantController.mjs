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

    // Get restaurant
    const restaurant = await pool.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*) AS review_count, TRUNC(AVG(rating), 1) AS avg_rating FROM reviews GROUP BY restaurant_id) AS reviews ON id = reviews.restaurant_id WHERE id = $1",
      [id]
    );

    // Get restaurant reviews
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
    const { name, review, rating, user_id, author } = req.body;
    const addedReview = await pool.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating, date, user_id, author) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [id, name, review, rating, new Date(), user_id, author]
    );
    res.json(addedReview.rows[0]);
  } catch (err) {
    console.error(err);
  }
};

export const getLikes = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { id } = req.session.user;

    // Check if user + reviewId row exists in likes table
    const userLike = await pool.query(
      "SELECT * FROM likes WHERE review_id = $1 AND user_id = $2",
      [reviewId, id]
    );

    if (userLike.rows.length < 1) {
      return res.json({
        liked: false,
        message: "The user did not like this review",
      });
    }

    res.json({ liked: true, message: "The user liked this review" });
  } catch (err) {
    console.error(err);
  }
};

export const likeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { id } = req.session.user;

    const existingLike = await pool.query(
      "SELECT * FROM likes WHERE review_id = $1 AND user_id = $2",
      [reviewId, id]
    );

    if (existingLike.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "User has already liked this review" });
    }

    // Add a row to Likes table
    await pool.query("INSERT INTO likes (review_id, user_id) VALUES ($1, $2)", [
      reviewId,
      id,
    ]);

    // Increment like for this review
    await pool.query("UPDATE reviews SET likes = likes + 1 WHERE id = $1", [
      reviewId,
    ]);

    res.json({ liked: true, message: "Review Liked Successfully" });
  } catch (err) {
    console.error(err);
  }
};

export const dislikeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { id } = req.session.user;

    const existingLike = await pool.query(
      "SELECT * FROM likes WHERE review_id = $1 AND user_id = $2",
      [reviewId, id]
    );

    if (existingLike.rows.length == 0) {
      return res
        .status(400)
        .json({ message: "User has not liked this review" });
    }

    // Remove like from Likes table
    await pool.query(
      "DELETE FROM likes WHERE review_id = $1 AND user_id = $2",
      [reviewId, id]
    );

    // Decrement like for this review
    await pool.query("UPDATE reviews SET likes = likes - 1 WHERE id = $1", [
      reviewId,
    ]);

    res.json({ liked: false, message: "Review Disliked Successfully" });
  } catch (err) {
    console.error(err);
  }
};
