import { useEffect, useState } from "react";
import SinglePost from "./SinglePost";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";



const TrendingPosts = () => {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);

  const blogsCollection = collection(db, "blogs");

  const getBlogs = async () => {
    try {
      const querySnapshot = await getDocs(blogsCollection);
      const blogsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setBlogs(blogsData);
      console.log(blogs)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

 

  if (!Array.isArray(blogs) || blogs.length === 0) {
    return <p>No trending posts available.</p>;
  }

  const indexOfLastBlog = currentPage * itemsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <section className="bg-gray-900">
        <div className="container mx-auto flex flex-wrap py-5 px-3">
          <div className="w-full px-4 lg:w-12/12 ">
            
            <div className="">
              <div className="flex flex-col space-y-8">
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
        </div>
      </section>
    </>
  );
};

export default TrendingPosts;
