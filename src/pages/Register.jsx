import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      setLoading(true);
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(res.user, { displayName: name });
        toast.success('Account Create Successfully')
        // Store user data in localStorage
        setUserInfo(res.user);
        navigate("/");
  
        console.log(res);
      } catch (err) {
        toast.error(err.message);
      }
      setLoading(false);
    }
  };
  
  const SignWIthGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <>
      <section className="bg-gray-900 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-gray-900 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-700 dark:border-gray-700">
            <div className="text-3xl font-bold text-center py-4">PŪŢCŪŢ</div>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight text-white tracking-tight md:text-2xl dark:text-white">
                Create your account
              </h1>
              <div className="flex">
                <button onClick={SignWIthGoogle} className="px-4 py-2 bg-white border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-black dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-black dark:hover:text-slate-300 hover:shadow transition duration-150">
                  <span>Register with Google</span>
                  <img
                    className="w-6 h-6"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="google logo"
                  />
                </button>
              </div>

              <form
                className="space-y-4 md:space-y-5"
                onSubmit={handleRegister}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    placeholder="username..."
                    className="bg-gray-800  outline-none text-text sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    placeholder="example@gmail.com"
                    className="bg-gray-800  outline-none text-text sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-800  outline-none text-text sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password2"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="password2"
                    onChange={(e) => setPassword2(e.target.value)}
                    id="password2"
                    placeholder="••••••••"
                    className="bg-gray-800  outline-none text-text sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-300 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-violet-800 px-10 py-2 rounded-xl flex items-center justify-center w-7/12 hover:bg-violet-600"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Create Account"
                  )}
                </button>
                <p className="text-sm font-light text-gray-300 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-violet-500 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
