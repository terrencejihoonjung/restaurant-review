import pool from "../db/index.mjs";
import Restaurant from "../models/restaurantModel.mjs";

export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.getRestaurants();

    res.json({
      restaurants,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Restaurant.getRestaurant(id);

    res.json({
      restaurant: data.restaurant,
      reviews: data.reviews,
    });
  } catch (err) {
    console.error(err);
  }
};

export const addRestaurant = async (req, res) => {
  try {
    const { name, location, price_range } = req.body;

    const restaurant = await Restaurant.addRestaurant(
      name,
      location,
      price_range
    );

    res.json({ restaurant });
  } catch (err) {
    console.error(err);
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, price_range } = req.body;

    const restaurant = await Restaurant.updateRestaurant(
      id,
      name,
      location,
      price_range
    );

    res.json({ restaurant });
  } catch (err) {
    console.error(err);
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.deleteRestaurant(id);

    res.json({ restaurant });
  } catch (err) {
    console.error(err);
  }
};

export const addRestaurantReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, review, rating, user_id, author } = req.body;

    const newReview = await Restaurant.addReview(
      id,
      name,
      review,
      rating,
      user_id,
      author
    );

    res.json({ review: newReview });
  } catch (err) {
    console.error(err);
  }
};

export const getLikes = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { id } = req.session.user;

    const likes = await Restaurant.getReviewLikes(id, reviewId);

    if (!likes.liked) {
      return res.json({
        likers: likes.likers,
        liked: false,
      });
    }

    res.json({
      likers: likes.likers,
      liked: true,
    });
  } catch (err) {
    console.error(err);
  }
};

export const likeReview = async (req, res) => {
  try {
    const { id } = req.session.user;
    const { reviewId } = req.params;
    await Restaurant.likeReview(id, reviewId);

    res.json({ liked: true });
  } catch (err) {
    console.error(err);
  }
};

export const dislikeReview = async (req, res) => {
  try {
    const { id } = req.session.user;
    const { reviewId } = req.params;
    await Restaurant.dislikeReview(id, reviewId);

    res.json({ liked: false });
  } catch (err) {
    console.error(err);
  }
};
