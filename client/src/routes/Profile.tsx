import { User, useUsersContext } from "../context/UsersContext";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Avatar from "../components/Avatar";
import ProfileStats from "../components/ProfileStats";
import ProfileFriends from "../components/ProfileFriends";
import ProfileReviews from "../components/ProfileReviews";
import { Review } from "../context/ReviewsContext";

const iconStyle: string = "w-64 rounded-full";

function Profile() {
  const [profileUser, setProfileUser] = useState<User>({} as User);
  const [friendStatus, setFriendStatus] = useState<
    "add" | "pending" | "accept" | "friends"
  >("add");
  const { user } = useUsersContext();
  const { userId } = useParams();
  const navigate = useNavigate();

  const [userReviews, setUserReviews] = useState<Review[]>([] as Review[]);
  const profileRef: React.RefObject<HTMLInputElement> = useRef(null);
  const friendsRef: React.RefObject<HTMLInputElement> = useRef(null);
  const reviewsRef: React.RefObject<HTMLInputElement> = useRef(null);

  const totalLikes = userReviews.reduce((count, review) => {
    return count + review.likes;
  }, 0);

  const buttonText = (() => {
    switch (friendStatus) {
      case "add":
        return "Add Friend";
      case "pending":
        return "Pending Request";
      case "accept":
        return "Accept Request";
      case "friends":
        return "Friends";
      default:
        return "Unknown Status";
    }
  })();

  async function checkFriendStatus() {
    try {
      const response = await fetch(
        `http://localhost:3000/users/friends/${userId}`,
        { credentials: "include" }
      );
      const jsonData = await response.json();
      if (jsonData.status == "pending") {
        if (jsonData.requester == profileUser.id) setFriendStatus("pending");
        else setFriendStatus("accept");
      } else {
        setFriendStatus(jsonData.status);
      }
    } catch (err: unknown) {
      console.error(err);
    }
  }

  async function sendFriendRequest() {
    try {
      const response = await fetch(
        `http://localhost:3000/users/friends/request/${userId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        setFriendStatus("pending");
      }
    } catch (err: unknown) {
      console.error(err);
    }
  }

  async function acceptFriendRequest() {
    try {
      const response = await fetch(
        `http://localhost:3000/users/friends/accept/${userId}`,
        { method: "POST", credentials: "include" }
      );

      if (response.ok) {
        setFriendStatus("friends");
      }
    } catch (err: unknown) {
      console.error(err);
    }
  }

  async function removeFriend() {
    try {
      const response = await fetch(
        `http://localhost:3000/users/friends/remove/${userId}`,
        { method: "DELETE", credentials: "include" }
      );

      if (response.ok) {
        setFriendStatus("add");
      }
    } catch (err: unknown) {
      console.error(err);
    }
  }

  async function getUser() {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        credentials: "include",
      });
      if (response.ok) {
        const jsonData = await response.json();
        setProfileUser(jsonData.user);
      }
    } catch (err: unknown) {
      console.error(err);
    }
  }

  function handleProfileScroll() {
    profileRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "center",
    });
  }

  function handleFriendsScroll() {
    friendsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "center",
    });
  }

  function handleReviewsScroll() {
    reviewsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "center",
    });
  }

  async function getUserReviews() {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}/reviews`,
        {
          credentials: "include",
        }
      );
      const jsonData = await response.json();
      setUserReviews(jsonData.userReviews);
    } catch (err: unknown) {
      console.error(err);
    }
  }

  useEffect(() => {
    getUser();
    getUserReviews();
    if (user.id != profileUser.id) {
      checkFriendStatus();
    }
  }, [userId]);

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="px-24 font-inter font-black text-sm breadcrumbs"
      >
        {"< Back"}
      </button>
      <div className="flex px-24 py-8 text-2xl">
        <div className="flex flex-col items-center w-1/3">
          <Avatar iconStyle={iconStyle} />
          <h1 className="my-4 text-3xl font-inter font-black">
            {profileUser.username}
          </h1>
          {user.id != profileUser.id ? (
            <button
              disabled={friendStatus == "pending" || friendStatus == "friends"}
              onClick={() => sendFriendRequest()}
              className="btn btn-md"
            >
              {buttonText}
            </button>
          ) : null}

          {friendStatus == "accept" ? (
            <>
              <button
                onClick={() => acceptFriendRequest()}
                className="btn btn-md"
              >
                Accept
              </button>
              <button onClick={() => removeFriend()} className="btn btn-md">
                Decline
              </button>
            </>
          ) : null}

          {friendStatus == "friends" ? (
            <button onClick={() => removeFriend()} className="btn btn-md">
              Remove Friend
            </button>
          ) : null}

          <ul className="menu mt-12 w-fit sticky top-48">
            <li>
              <button
                onClick={() => handleProfileScroll()}
                className="font-inter text-2xl"
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => handleFriendsScroll()}
                className="font-inter text-2xl"
              >
                Friends
              </button>
            </li>
            <li>
              <button
                onClick={() => handleReviewsScroll()}
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
