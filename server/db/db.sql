CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL CHECK(rating >= 1 and rating <= 5)
);

INSERT INTO reviews (restaurant_id, name, review, rating) VALUES (17, 'Terrence', 'Yummy', 4);

SELECT TRUN(AVG(rating), 2) AS average_review FROM reviews WHERE restaurant_id = $1;

SELECT COUNT(reviews) FROM reviews WHERE restaurant_id = $1; 

SELECT restaurant_id, COUNT(reviews) FROM reviews GROUP BY restaurant_id;

SELECT * FROM restaurants LEFT JOIN  
    (SELECT restaurant_id, COUNT(*) AS review_count, TRUNC(AVG(rating), 1) AS avg_rating FROM reviews GROUP BY restaurant_id) AS reviews 
    ON restaurant_id = reviews.restaurant_id;