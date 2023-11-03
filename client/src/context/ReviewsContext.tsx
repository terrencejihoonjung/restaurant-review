import { useContext, createContext } from "react";

export type Review = {
  name: string;
  rating: number;
  review: string;
  date: Date;
  readonly id: number;
  readonly restaurant_id: number;
};

export type SortedReviewProps = {
  sortedReviews: Review[];
};

export type ReviewProps = {
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
};

export const ReviewsContext = createContext<ReviewProps>({
  reviews: [],
  setReviews: () => [],
});

export const useReviewsContext = () => useContext(ReviewsContext);
