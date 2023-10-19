import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

type StarRatingProps = {
  rating: number;
};

function StarRating({ rating }: StarRatingProps) {
  const stars = [];
  for (let i: number = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className="text-warning" />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<FaStarHalfAlt key={i} className="text-warning" />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }
  return <div className="flex">{stars}</div>;
}

export default StarRating;
