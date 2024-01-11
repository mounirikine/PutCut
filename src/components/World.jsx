import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import SinglePost from "./SinglePost";

const World = () => {
  const [blogs, setBlogs] = useState([]);

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
    getBlogs();
  }, []);

  const worldBlogs = blogs.filter((blog) => blog.category === "Health").slice(0, 4);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
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
        <h1 className="text-2xl font-bold py-10 text-center lg:text-left">World</h1>

        <Slider {...sliderSettings}>
          {worldBlogs.map((blog, blogIndex) => (
            <div className="flex flex-col mx-4" key={blogIndex}>
              <SinglePost
                id={blog.id}
                description={blog.description}
                title={blog.title}
                isTrending={blog.isTrending}
                img={blog.image.imgUrl}
                category={blog.category}
                author={blog.author}
                timestamp={blog.timestamp}
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default World;
