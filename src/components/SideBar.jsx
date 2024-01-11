import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import clearImg from "../../public/clear.png";
import cloudImg from "../../public/cloud.png";
import rainImg from "../../public/rain.png";
import snowImg from "../../public/snow.png";
import humidityImg from "../../public/humidity.png";
import windImg from "../../public/wind.png";

const SideBar = () => {
  const categoryOptions = [
    "Fashion",
    "Technology",
    "Health",
    "Food",
    "Politics",
    "Sports",
    "Business",
  ];
  const [location, setLocation] = useState("London");
  const [city, setCity] = useState("London");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [temperature, setTemperature] = useState("");
  const [icon, setIcon] = useState(clearImg);

  const apiKey = "77050147aa06f2f40dc3a4fa1801cfb1"; // Replace with your valid API key

  const handleSearch = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemperature(data.main.temp);
      setCity(data.name);

      switch (data.weather[0].icon) {
        case "01d":
        case "01n":
          setIcon(clearImg);
          break;
        case "02d":
        case "03d":
        case "03n":
        case "04d":
        case "04n":
          setIcon(cloudImg);
          break;
        case "09d":
        case "09n":
          setIcon(rainImg);
          break;
        case "13d":
        case "13n":
          setIcon(snowImg);
          break;
        default:
          setIcon(clearImg);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="flex flex-col items-center p-4 lg:p-8">
      <div className="relative w-full mb-4 lg:mb-8">
        <RiSearchLine
          className="absolute text-3xl p-1 font-bold left-4 top-1/2 transform -translate-y-1/2 text-gray-100 bg-violet-600 cursor-pointer rounded-full"
          onClick={handleSearch}
        />
        <input
          type="text"
          className="pl-14 pr-6 py-3 text-lg w-full lg:w-[410px] rounded-3xl bg-gray-600 outline-none text-white"
          placeholder="Search ..."
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="rounded-3xl p-4 w-full lg:w-10/12 bg-slate-700">
        <div className="flex flex-col justify-center items-center">
          <div>
            <img src={icon} alt="weather" width={140} />
          </div>
          <div>
            <h1 className="text-5xl text-center font-semibold">
              {temperature}°C
            </h1>
            <h1 className="text-3xl text-center font-semibold py-5">{city}</h1>
          </div>

          <div className="flex justify-between items-center gap-5 pb-5 w-full lg:w-8/12 pt-20">
            <span className="flex items-center gap-2">
              <img src={humidityImg} alt="" width={30} />
              <h1 className="text-2xl">{humidity}%</h1>
            </span>
            <span className="flex items-center gap-2">
              <img src={windImg} alt="" width={30} />
              <h1 className="text-2xl">{wind}k/h</h1>
            </span>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-10/12">
        <h1 className="flex items-center text-2xl py-6 lg:py-10">Categories</h1>
      </div>

      <div className="flex flex-col w-full ">
        {categoryOptions.map((item, index) => (
          <Link
            key={index}
            className="flex justify-between items-center py-1"
            to={`/category/${item}`}
          >
            {item} <FaArrowRight />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
