type HeartProps = {
  likeToggle: boolean;
};

function Heart({ likeToggle }: HeartProps) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill={likeToggle ? "#FF1A1A" : "none"}
        viewBox="0 0 24 24"
        stroke={likeToggle ? "#FF1A1A" : "currentColor"}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </>
  );
}

export default Heart;
