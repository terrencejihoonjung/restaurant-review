import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom";
import { User } from "../context/UsersContext";

type ProfileFriendsProps = {
  friends: User[];
};

const ProfileFriends = ({ friends }: ProfileFriendsProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="card w-full bg-base-100 shadow-md mt-32 border border-slate-50 max-w-full">
        <div className="card-body w-full">
          <h2 className="card-title">Friends</h2>
          <div className="flex mt-4 space-x-16 overflow-x-auto">
            {friends.map((friend) => {
              return (
                <div
                  key={friend.id + friend.username}
                  onClick={() => navigate(`/profile/${friend.id}`)}
                  className="flex flex-col items-center"
                >
                  <Avatar iconStyle={"w-14 rounded-full"} />
                  <p className="text-sm mt-1">{friend.username}</p>
                </div>
              );
            })}
          </div>
          <div className="card-actions justify-end">
            <a className="link link-neutral text-sm mt-2">See All</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileFriends;
