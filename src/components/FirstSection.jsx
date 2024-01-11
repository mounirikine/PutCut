import TrendingPosts from "./TrendingPosts";
import SideBar from "./SideBar";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const FirstSection = () => {
  const [blogs, setBlogs] = useState([]);

  const blogsCollection = collection(db, 'blogs');

  const getBlogs = async () => {
    try {
      const querySnapshot = await getDocs(blogsCollection);
      const blogsData = querySnapshot.docs.map((doc) => doc.data());
      setBlogs(blogsData);

     
      
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <section className="bg-gray-900">
      <div className="container mx-auto flex flex-wrap py-10">
        <div className="w-full px-4 lg:w-8/12">
          <h1 className="text-2xl font-bold py-10 lg:px-20">Trending</h1>
          <div className="lg:px-20">
            <TrendingPosts blogs={blogs} />
          </div>
        </div>
        <div className="w-full px-4 lg:w-4/12">
          <SideBar />
        </div>
      </div>
    </section>
  );
};

export default FirstSection;
