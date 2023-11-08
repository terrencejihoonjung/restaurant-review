import { ReviewLiker } from "../context/ReviewsContext";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

type LikerRowProps = {
  liker: ReviewLiker;
};

function LikerRow({ liker }: LikerRowProps) {
  const navigate = useNavigate();

  return (
    <tr className="hover ">
      <td
        onClick={() => navigate(`/profile/${liker.id}`)}
        className="font-inter flex items-center"
      >
        <Avatar iconStyle={"w-12 rounded-full mr-4"} />
        {liker.username}
      </td>
    </tr>
  );
}

export default LikerRow;
