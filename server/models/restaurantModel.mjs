import pool from "../db/index.mjs";

class Restaurant {
  async getRestaurants() {
    try {
      const restaurants = await pool.query(
        "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*) AS review_count, TRUNC(AVG(rating), 1) AS avg_rating FROM reviews GROUP BY restaurant_id) AS reviews ON id = reviews.restaurant_id"
      );

      return restaurants.rows;
    } catch (err) {
      throw err;
    }
  }

  async getRestaurant(id) {
    const client = await pool.connect(); // Opening pool connection since we have multiple queries
    try {
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

      return { restaurant: restaurant.rows[0], reviews: reviews.rows };
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }

  async addRestaurant(name, location, price_range) {
    try {
      const restaurant = await pool.query(
        "INSERT INTO restaurants (name, location, price_range, date) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, location, price_range, new Date()]
      );

      return restaurant.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async updateRestaurant(id, name, location, price_range) {
    try {
      const restaurant = await pool.query(
        "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
        [name, location, price_range, id]
      );

      return restaurant.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async deleteRestaurant(id) {
    try {
      const restaurant = await pool.query(
        "DELETE FROM restaurants WHERE id = $1 RETURNING *",
        [id]
      );

      return restaurant.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async addReview(id, name, review, rating, user_id, author) {
    try {
      const newReview = await pool.query(
        "INSERT INTO reviews (restaurant_id, name, review, rating, date, user_id, author) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [id, name, review, rating, new Date(), user_id, author]
      );

      return newReview.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async getReviewLikes(id, reviewId) {
    const client = await pool.connect(); // Opening pool connection since we have multiple queries
    try {
      // Grab all users that liked the review
      const usersWhoLikedReview = await pool.query(
        "SELECT users.id, username FROM users JOIN likes ON users.id = likes.user_id JOIN reviews ON likes.review_id = reviews.id WHERE review_id = $1",
        [reviewId]
      );

      // Check if user + reviewId row exists in likes table
      const userLiked = usersWhoLikedReview.rows.find((user) => user.id === id);

      return {
        likers: usersWhoLikedReview.rows,
        liked: userLiked ? true : false,
      };
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }

  async likeReview(id, reviewId) {
    const client = await pool.connect(); // Opening pool connection since we have multiple queries
    try {
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
      await pool.query(
        "INSERT INTO likes (review_id, user_id) VALUES ($1, $2)",
        [reviewId, id]
      );

      // Increment like for this review
      await pool.query("UPDATE reviews SET likes = likes + 1 WHERE id = $1", [
        reviewId,
      ]);
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }

  async dislikeReview(id, reviewId) {
    const client = await pool.connect(); // Opening pool connection since we have multiple queries
    try {
      const existingLike = await pool.query(
        "SELECT * FROM likes WHERE review_id = $1 AND user_id = $2",
        [reviewId, id]
      );

      if (existingLike.rows.length < 1) {
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
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }
}

export default new Restaurant();
