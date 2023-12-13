function Cover() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="h-screen w-screen p-20">
        <div className="relative flex flex-col h-full w-full bg-gradient-to-r from-fuchsia-500 to-yelp-red rounded-3xl">
          <button className="flex flex-col justify-center items-center absolute bg-white w-24 h-24 bottom-0 right-0 rounded-tl-3xl">
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
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center h-screen w-screen p-20">
        <div className="relative flex space-x-12 justify-center items-center h-full w-5/6 rounded-3xl">
          <div className="border-2 h-3/5 w-2/5"></div>
          <div className="border-2 h-3/5 w-3/5"></div>
        </div>
      </div>

      <div className="flex justify-center items-center h-screen w-screen p-20">
        <div className="relative flex space-x-12 justify-center items-center h-full w-5/6 rounded-3xl">
          <div className="border-2 h-3/5 w-3/5"></div>
          <div className="border-2 h-3/5 w-2/5"></div>
        </div>
      </div>

      <div className="flex justify-center items-center h-screen w-screen p-20">
        <button className="font-inter text-3xl font-black border px-8 py-4 rounded-full bg-slate-200">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Cover;
