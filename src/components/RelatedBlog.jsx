import  { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RelatedBlog = () => {
  const [blogs, setBlogs] = useState([]);

  const blogsCollection = collection(db, 'blogs');
  const{id} = useParams()

  const getBlogs = async () => {
    try {
      const querySnapshot = await getDocs(blogsCollection);
      const blogsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBlogs(blogsData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const healthBlogs = blogs.filter(blog => blog.id !== id);

  function truncateDescription(text, limit) {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  }

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-gray-900 px-4 sm:px-8 lg:px-20 py-10">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold py-10 text-center lg:text-left">
        Related post
        </h1>

        <Slider {...sliderSettings}>
          {healthBlogs.map((blog, blogIndex) => (
            <div className="flex flex-col lg:w-1/3 mx-8" key={blogIndex}>
              <img src={blog.image.imgUrl} alt={`post`} className="w-full img mb-4 h-[240px]" />
              <div className="flex items-center gap-2">
                <span className="px-5 rounded-3xl bg-violet-800 text-sm w-4/12 text-center py-1 my-2">
                  {blog.category}
                </span>
              </div>
              <Link to="/" className="text-xl font-bold hover:underline ">
                {truncateDescription(blog.title, 7)}
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default RelatedBlog;
