import Heart from "../../components/ui/Heart";

type ProfileStatsProps = {
  userReviewsLength: number;
  totalLikes: number;
  numFriends: number;
};

const ProfileStats = ({
  userReviewsLength,
  totalLikes,
  numFriends: numFriends,
}: ProfileStatsProps) => {
  return (
    <>
      <div className="stats shadow-md w-full border border-slate-50">
        <div className="stat place-items-center">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </div>
          <div className="stat-title">Total Reviews</div>
          <div className="stat-value">{userReviewsLength}</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-figure text-secondary">
            <Heart likeToggle={true} />
          </div>
          <div className="stat-title">Total Likes</div>
          <div className="stat-value">{totalLikes}</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
          <div className="stat-title">Friends</div>
          <div className="stat-value">{numFriends}</div>
        </div>
      </div>
    </>
  );
};

export default ProfileStats;
