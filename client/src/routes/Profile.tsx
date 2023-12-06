import { User, useUsersContext } from "../context/UsersContext";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Avatar from "../components/Avatar";
import ProfileStats from "../components/ProfileStats";
import ProfileFriends from "../components/ProfileFriends";
import ProfileReviews from "../components/ProfileReviews";
import { Review } from "../context/ReviewsContext";

const iconStyle: string = "w-64 rounded-full";

function Profile() {
  const [profileUser, setProfileUser] = useState<User>({} as User);
  const [userReviews, setUserReviews] = useState<Review[]>([] as Review[]);
  const [friends, setFriends] = useState<User[]>([] as User[]);

  const [friendStatus, setFriendStatus] = useState<
    | "Add Friend"
    | "Pending Request"
    | "Accept Request"
    | "Friends"
    | "Unknown Status"
  >("Add Friend");

  const { user } = useUsersContext();
  const { userId } = useParams();
  const navigate = useNavigate();

  const totalLikes = userReviews.reduce((count, review) => {
    return count + review.likes;
  }, 0);

  async function checkFriendStatus() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/friends/${userId}`,
        { credentials: "include" }
      );
      const jsonData = await response.json();
      if (jsonData.status == "Pending Request") {
        if (jsonData.requester == user.id) setFriendStatus("Pending Request");
        else setFriendStatus("Accept Request");
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
        `http://localhost:3000/api/users/friends/request/${userId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        setFriendStatus("Pending Request");
      }
    } catch (err: unknown) {
      console.error(err);
    }
  }

  async function acceptFriendRequest() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/friends/accept/${userId}`,
        { method: "POST", credentials: "include" }
      );

      if (response.ok) {
        setFriends([...friends, profileUser]);
        setFriendStatus("Friends");
      }
    } catch (err: unknown) {
      console.error(err);
    }
  }

  async function removeFriend() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/friends/remove/${userId}`,
        { method: "DELETE", credentials: "include" }
      );

      if (response.ok) {
        setFriends(friends.filter((friend) => friend.id !== user.id));
        setFriendStatus("Add Friend");
      }
    } catch (err: unknown) {
      console.error(err);
    }
  }

  async function getProfileUser() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${userId}`,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setProfileUser(data.user);
        setFriends(data.friends);
      }
    } catch (err: unknown) {
      console.error(err);
    }
  }

  async function getUserReviews() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${userId}/reviews`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      setUserReviews(data.reviews);
    } catch (err: unknown) {
      console.error(err);
    }
  }

  useEffect(() => {
    checkFriendStatus();
    getProfileUser();
    getUserReviews();
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

          <span className="flex items-center justify-between space-x-3">
            {user.id != profileUser.id ? (
              <button
                disabled={
                  friendStatus == "Pending Request" ||
                  friendStatus == "Friends" ||
                  friendStatus == "Accept Request" ||
                  friendStatus == "Unknown Status"
                }
                onClick={() => sendFriendRequest()}
                className="btn btn-md"
              >
                {friendStatus}
              </button>
            ) : null}

            {friendStatus == "Accept Request" ? (
              <>
                <button
                  onClick={() => acceptFriendRequest()}
                  className="btn btn-md btn-circle btn-success"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => removeFriend()}
                  className="btn btn-md btn-circle btn-error"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </>
            ) : null}

            {friendStatus == "Friends" ? (
              <button onClick={() => removeFriend()} className="btn btn-md">
                Remove Friend
              </button>
            ) : null}
          </span>
        </div>
        <div className="w-2/3">
          <ProfileStats
            numFriends={friends.length}
            userReviewsLength={userReviews.length}
            totalLikes={totalLikes}
          />
          <ProfileFriends friends={friends} />
          <ProfileReviews reviews={userReviews} />
        </div>
      </div>
    </>
  );
}

export default Profile;
