import ProfilePicture from "../assets/Profile.jpeg";

type AvatarProps = {
  iconStyle: string;
};

function Avatar({ iconStyle }: AvatarProps) {
  return (
    <>
      <div className="avatar">
        <div className={iconStyle}>
          <img className="" src={ProfilePicture} />
        </div>
      </div>
    </>
  );
}

export default Avatar;
