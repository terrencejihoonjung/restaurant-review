import RestaurantImage from "../../assets/restaurants.png";
import ReviewImage from "../../assets/review.png";
import ProfileImage from "../../assets/profile.png";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Cover() {
  const ref = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
    },
    initial: {
      scale: 1,
    },
  };

  const scrollDown = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="font-inter flex flex-col justify-center items-center">
      <div className="h-screen w-screen p-20">
        <div className="relative flex flex-col h-full w-full bg-gradient-to-r from-fuchsia-500 to-yelp-red rounded-3xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="h-full w-full p-12 font-black text-white text-title"
          >
            <motion.h1 variants={childVariants}>Restaurant</motion.h1>
            <motion.h1 variants={childVariants}>Review</motion.h1>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.2 }}
            onClick={scrollDown}
            className="flex flex-col justify-center items-center absolute bg-white w-24 h-24 bottom-0 right-0 rounded-tl-3xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
              />
            </svg>
          </motion.button>
        </div>
      </div>

      <div
        ref={ref}
        className="flex justify-center items-center h-screen w-screen p-20"
      >
        <div className="relative flex space-x-12 justify-center items-center h-full w-5/6 rounded-3xl">
          <div className="flex flex-col justify-center items-start h-3/5 w-2/5 space-y-8">
            <h1 className="font-bold text-3xl bg-gradient-to-r from-fuchsia-500 to-yelp-red text-transparent bg-clip-text">
              Adding Restaurants
            </h1>
            <p className="font-regular text-lg">
              Have access to a public list of restaurants and add your own
              favorite restaurants for others to review. Upon adding to a list,
              you can edit your restaurant listing, as well as delete from the
              list (reviews are also removed).
            </p>
          </div>
          <div className="w-3/5">
            <img src={RestaurantImage} className="object-fill" />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center h-screen w-screen p-20">
        <div className="relative flex space-x-12 justify-center items-center h-full w-5/6 rounded-3xl">
          <div className="w-3/5">
            <img src={ReviewImage} className="object-fill" />
          </div>
          <div className="flex flex-col justify-center items-start h-3/5 w-2/5 space-y-8">
            <h1 className="font-bold text-3xl bg-gradient-to-r from-fuchsia-500 to-yelp-red text-transparent bg-clip-text">
              Adding Reviews
            </h1>
            <p className="font-regular text-lg">
              For each restaurant, users can add reviews that include a message,
              star-rating, and name input. Other users can like restaurant
              reviews and can view who liked each review. Users can then access
              other user profiles and add them as friends.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center h-screen w-screen p-20">
        <div className="relative flex space-x-12 justify-center items-center h-full w-5/6 rounded-3xl">
          <div className="flex flex-col justify-center items-start h-3/5 w-2/5 space-y-8">
            <h1 className="font-bold text-3xl bg-gradient-to-r from-fuchsia-500 to-yelp-red text-transparent bg-clip-text">
              User Profile
            </h1>
            <p className="font-regular text-lg">
              Users can view their own (or other users') profile pages and view
              user-statistics, friends, and personal reviews. When a user adds
              another user as a friend, a request is first sent and the other
              user must accept the request for a friendship to be established.
            </p>
          </div>
          <div className="w-3/5">
            <img src={ProfileImage} className="object-fill" />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center h-screen w-screen p-20">
        <Link to="/login">
          <motion.button
            className="text-3xl font-black border-2 border-black px-8 py-4 rounded-full hover:border-none hover:bg-gradient-to-r from-fuchsia-500 to-yelp-red"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
          >
            Get Started
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

export default Cover;
