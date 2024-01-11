import { useEffect, useState } from "react";
import { CiClock2 } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const SinglePost = ({ id, title, img, category, timestamp, description, isTrending, author }) => {
  const [timeFor, setTimeFor] = useState("");

  useEffect(() => {
    function formatTimestamp(timestamp) {
      const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
      const options = { month: "short", day: "numeric", year: "numeric" };
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
      setTimeFor(formattedDate);
    }

    formatTimestamp(timestamp);
  }, [timestamp]);

  function truncateDescription(text, limit) {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  }

  return (
    <div>
      <Link
        to={`/${id}`}
        className={`flex flex-col lg:flex-row items-center gap-5 w-full py-2`}
      >
        <div className="w-full lg:w-5/12">
          <img src={img} alt={`post`} className="w-full img" />
        </div>
        <div className="w-full lg:w-5/12">
          <div className="flex items-center gap-2">
            <span className="px-5 py-1 rounded-3xl bg-violet-800 text-sm">{category}</span>
            <span className="flex justify-center items-center bg-white text-sm text-black px-2 py-1 rounded-3xl gap-1">
              <CiClock2 className="text-sm" /> {timeFor}
            </span>
          </div>
          <div className="flex items-center w-full lg:w-12/12 py-4">
            <h1 className="text-2xl font-bold">{truncateDescription(title, 7)}</h1>
          </div>
          <div className="flex items-center">
            <p className="mb-4 text-base text-slate-300">{truncateDescription(description, 10)}</p>
          </div>
          <span className="px-5 py-1 rounded-xl bg-blue-500 text-sm">Created by : {author}</span>

          <div className="flex items-center">
            <button className="hover:translate-x-4 transition-all text-lg text-slate-300 flex items-center gap-5">
              Read More <FaArrowRight />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SinglePost;
