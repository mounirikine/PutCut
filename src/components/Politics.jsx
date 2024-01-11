import { useEffect, useState } from "react";
import SinglePost from "./SinglePost";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Authors from "./Authors";
import { Link } from "react-router-dom";

const Politics = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);

  const blogsCollection = collection(db, "blogs");

  const getBlogs = async () => {
    try {
      const querySnapshot = await getDocs(blogsCollection);
      const blogsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setBlogs(blogsData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const BusinessBlogs = blogs.filter((blog) => blog.category === 'Politics');
//   const BusinessBlogs = blogs.filter((blog) => blog.category === 'Politics');

  if (!Array.isArray(blogs) || blogs.length === 0) {
    return <p>No trending posts available.</p>;
  }

  const indexOfLastBlog = currentPage * itemsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;
  const currentBlogs = BusinessBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <section className="bg-gray-900">
        <div className="container mx-auto flex flex-wrap py-10 px-5">
          <div className="w-full px-4 lg:w-12/12 ">
            <h1 className="text-2xl font-bold py-10 ">Politics</h1>
            <div className=" grid grid-cols-2 space-y-4">
                {currentBlogs.map((blog, blogIndex) => (
                  <SinglePost
                    key={blogIndex}
                    id={blog.id} 
                    description={blog.description}
                    title={blog.title}
                    isTrending={blog.isTrending}
                    img={blog.image.imgUrl}
                    category={blog.category}
                    author={blog.author}
                    timestamp={blog.timestamp}
                  />
                ))}
              </div>
              <div className="join flex gap-1 mt-10   w-12/12 ">
                <button
                  className="join-item btn w-3/12"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous page
                </button>
                <button
                  className="join-item btn   w-3/12"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={indexOfLastBlog >= blogs.length}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
       
    
      </section>
    </>
  );
};

export default Politics;
