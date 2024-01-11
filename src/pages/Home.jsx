import HeroBg from "../../public/blogBg.jpg";
import { CiClock2 } from "react-icons/ci";
import FirstSection from "../components/FirstSection";
import SecondSection from "../components/SecondSection";
import HealthSection from "../components/HealthSection";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import Politics from "../components/Politics";
import World from "../components/World";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        
      } else {
        setUser(null);
      }
    });


    return () => unsubscribe(); // Cleanup on component unmount
    
  }, []);

  return (
    <>
      <Navbar />
      <main
        className="hero h-screen relative"
        style={{
          backgroundImage: `url(${HeroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Hero />
      </main>
      <div className="w-full">
        <hr className="w-11/12 mx-auto" />
      </div>
      <FirstSection />
      <div className="w-full">
        <hr className="w-11/12 mx-auto" />
      </div>
      <HealthSection />
      <div className="w-full">
        <hr className="w-11/12 mx-auto" />
      </div>
      <SecondSection />
      <hr className="w-11/12 mx-auto" />
      <Politics />
      <hr className="w-11/12 mx-auto" />
      <World />
      <hr className="w-11/12 mx-auto" />
      <Footer />
    </>
  );
};

export default Home;
