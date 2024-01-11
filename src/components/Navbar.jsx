import  { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { IoCreateOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const [user, setUser] = useState(null);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  const handleLogout = async () =>{
    try{
      signOut(auth)
      toast.success('Logout Successfully')

    } catch(err){
      toast.error(err)
    }
 


  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    // Add event listener to track scroll position
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  return (
    <>
      <header
        className={`flex fixed w-full items-center px-4 sm:px-6 lg:px-8 py-2 z-50 text-white ${
          scrollY > 20 ? "bg-gray-950" : ""
        }`}
      >
        <div className="flex items-center py-2 w-full justify-between max-w-screen-xl mx-auto">
          <Link to='/' className="text-2xl font-bold">PŪŢCŪŢ</Link>
          {
            user ? (<Link to='/add-edit-blog' className="text-2xl font-bold"><IoCreateOutline /></Link>) : ''
          }

          <div className="flex justify-center items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">          
                <span className="badge bg-slate-500 border-none text-white">{user.displayName}</span>
                <button onClick={handleLogout} className="hover:text-violet-200 bg-violet-800 px-10 py-1 rounded-lg hover:bg-violet-700">Logout</button>
              </div>
            ) : (
              <>
                <Link to='/login' className="hover:text-violet-200">Login</Link>
                <Link
                  to="/register"
                  className="bg bg-violet-800 px-6 sm:px-8 py-2 rounded-xl hover:bg-violet-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
