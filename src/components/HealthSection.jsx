import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import SinglePost from "./SinglePost";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HealthSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'blogs'));
        const blogsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBlogs(blogsData);
      } catch (err) {
        console.error(err);
      }
    };

    getBlogs();
  }, []);

  const healthBlogs = blogs.filter(blog => blog.category === 'Health');

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
          Health
        </h1>

        <Slider {...sliderSettings} className="">
          {healthBlogs.map((blog, blogIndex) => (
            <div key={blogIndex} className="px-4">
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

export default HealthSection;
