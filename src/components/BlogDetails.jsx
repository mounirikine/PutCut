import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "./Navbar";
import { CiClock2 } from "react-icons/ci";
import RelatedBlog from "./RelatedBlog";
import Footer from "./Footer";
import CommentZone from "./CommentZone";
import SingleComment from "./SingleComment";

const BlogDetails = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [timeFor, setTimeFor] = useState("");
  const blogsCollection = collection(db, "blogs");

  const getBlogs = async () => {
    try {
      const querySnapshot = await getDocs(blogsCollection);
      const blogsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBlogs(blogsData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getBlogs();
    };

    fetchData();
  }, []);

  const detailsBlog = blogs.find((blog) => blog.id === id) || {}; // Provide a default empty object
  console.log(detailsBlog);

  useEffect(() => {
    function formatTimestamp(timestamp) {
      const date = new Date(timestamp.seconds * 1000);
      const options = { month: "short", day: "numeric", year: "numeric" };
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
      );
      setTimeFor(formattedDate);
    }

    if (detailsBlog.timestamp) {
      formatTimestamp(detailsBlog.timestamp);
    }
  }, [detailsBlog.timestamp]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center px-10 py-20 bg-gray-900  w-full">
        <div className="flex items-center gap-2 py-10">
          <span className="px-7 py-1 rounded-3xl bg-violet-800 text-sm">
            {detailsBlog.category}
          </span>
          <span className="flex justify-center items-center bg-white text-sm text-black px-2 py-1 rounded-3xl gap-1">
            <CiClock2 className="text-sm" /> {timeFor}
          </span>
        </div>

        <div className="w-full lg:w-7/12">
          {detailsBlog.image && detailsBlog.image.imgUrl && (
            <img
              src={detailsBlog.image.imgUrl}
              alt={`post`}
              className="w-full"
            />
          )}
           <div className="flex flex-col md:flex-row items-center mx-auto py-10 gap-4 mb-6 md:mb-10">
             
              <h2 className="text-sm md:text-lg font-bold mx-auto text-slate-300">
                Post by:{" "}
                <span className="font-semibold text-xs md:text-sm">
                  {detailsBlog.author}
                </span>
              </h2>
            </div>

          <div className="flex items-center w-full  py-2">
            <h1 className="text-5xl text-center font-bold py-5">
              {detailsBlog.title}
            </h1>
          </div>
          
        </div>
        <div className="flex items-center w-full  px-10  py-4">
            <p className="text-lg text-slate-300  py-4">
              {detailsBlog.description}
            </p>
          </div>

      </div>

      <div className="w-9/12 mx-auto py-10">
       <CommentZone />
      </div>
      <div className="w-9/12 mx-auto py-10 flex flex-col gap-1">
        <SingleComment />
      </div>

      <hr className="w-11/12 mx-auto" />

      <RelatedBlog />
      <hr className="w-11/12 mx-auto" />
      <Footer />

    </>
  );
};

export default BlogDetails;
