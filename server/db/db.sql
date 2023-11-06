CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL CHECK(rating >= 1 and rating <= 5)
);

SELECT * FROM restaurants LEFT JOIN  
    (SELECT restaurant_id, COUNT(*) AS review_count, TRUNC(AVG(rating), 1) AS avg_rating FROM reviews GROUP BY restaurant_id) AS reviews 
    ON restaurant_id = reviews.restaurant_id;

/* Add date property to reviews table */
ALTER TABLE reviews ADD COLUMN date DATE;

/* Add Likes Column to Reviews Table */
ALTER TABLE reviews ADD COLUMN likes INT NOT NULL DEFAULT 0;

/* Create a Users Table */
CREATE TABLE Users (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password TEXT NOT NULL
);

/* Create a Likes join table */
CREATE TABLE Likes (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    review_id BIGINT NOT NULL REFERENCES reviews(id)
);