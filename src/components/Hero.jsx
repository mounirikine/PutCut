import { CiClock2 } from "react-icons/ci"

const Hero = () => {
  return (
    <>
    <div className="absolute inset-0 flex items-end pb-10 md:pb-20">
          <div className="text-white px-4 md:px-10 lg:px-20">
            <div className="flex items-center md:flex-row gap-3">
              <span className="px-4 py-1 rounded-3xl bg-violet-800">World</span>
              <span className="flex justify-center items-center bg-white text-black px-2 py-1 rounded-3xl gap-1">
                <CiClock2 className="text-xl" /> Mar 4, 2023
              </span>
            </div>

            <div className="flex flex-col items-center md:flex-row w-full py-4 md:py-6">
              <h1 className="text-2xl md:text-4xl font-bold md:text-left lg:text-left">
              Don't leave your thoughts and opinions alone, share them with us              </h1>
            </div>

            <div className="flex items-center">
              <p className="text-sm md:text-lg mb-4 md:mb-6 text-slate-300">
              On our website you will find thousands of opinions on more than one topic
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 mb-6 md:mb-10">
              <img
                className="w-12 h-12 md:w-16 md:h-16 rounded-full"
                src="https://cdn-icons-png.flaticon.com/512/9203/9203764.png"
                alt=""
              />
              <h2 className="text-sm md:text-lg font-bold text-slate-300">
                Post by:{" "}
                <span className="font-semibold text-xs md:text-sm">
                  Mounir Ikine
                </span>
              </h2>
            </div>
          </div>
        </div>
    </>
  )
}

export default Hero