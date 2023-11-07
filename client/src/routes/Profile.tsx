import { useUsersContext } from "../context/UsersContext";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Avatar from "../components/Avatar";
import ProfileStats from "../components/ProfileStats";
import ProfileFriends from "../components/ProfileFriends";
import ProfileReviews from "../components/ProfileReviews";
import { Review } from "../context/ReviewsContext";

const iconStyle: string = "w-64 rounded-full";

function Profile() {
  const { user } = useUsersContext();
  const [userReviews, setUserReviews] = useState<Review[]>([] as Review[]);
  const profileRef: React.RefObject<HTMLInputElement> = useRef(null);
  const friendsRef: React.RefObject<HTMLInputElement> = useRef(null);
  const reviewsRef: React.RefObject<HTMLInputElement> = useRef(null);

  const totalLikes = userReviews.reduce((count, review) => {
    return count + review.likes;
  }, 0);

  function handleProfileScroll(e: React.MouseEvent<HTMLButtonElement>) {
    profileRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "center",
    });
  }

  function handleFriendsScroll(e: React.MouseEvent<HTMLButtonElement>) {
    friendsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "center",
    });
  }

  function handleReviewsScroll(e: React.MouseEvent<HTMLButtonElement>) {
    reviewsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "center",
    });
  }

  async function getUserReviews() {
    try {
      const response = await fetch(`http://localhost:3000/users/reviews`, {
        credentials: "include",
      });
      const jsonData = await response.json();
      setUserReviews(jsonData.userReviews);
    } catch (err: unknown) {
      console.error(err);
    }
  }

  useEffect(() => {
    getUserReviews();
  }, []);

  return (
    <>
      <Link
        to="/restaurants"
        className="px-24 font-inter font-black text-sm breadcrumbs"
      >
        {"< Back"}
      </Link>
      <div className="flex px-24 py-8 text-2xl">
        <div className="flex flex-col items-center w-1/3">
          <Avatar iconStyle={iconStyle} />
          <h1 className="my-4 text-3xl font-inter font-black">
            {user.username}
          </h1>

          <ul className="menu mt-12 w-fit sticky top-48">
            <li>
              <button
                onClick={(e) => handleProfileScroll(e)}
                className="font-inter text-2xl"
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={(e) => handleFriendsScroll(e)}
                className="font-inter text-2xl"
              >
                Friends
              </button>
            </li>
            <li>
              <button
                onClick={(e) => handleReviewsScroll(e)}
                className="font-inter text-2xl"
              >
                Reviews
              </button>
            </li>
          </ul>
        </div>
        <div className="w-2/3">
          <ProfileStats
            profileRef={profileRef}
            userReviewsLength={userReviews.length}
            totalLikes={totalLikes}
          />
          <ProfileFriends friendsRef={friendsRef} />
          <ProfileReviews reviewsRef={reviewsRef} reviews={userReviews} />
        </div>
      </div>
    </>
  );
}

export default Profile;
