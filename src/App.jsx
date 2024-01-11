import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import AddEditeBlog from "./pages/AddEditeBlog";
import BlogDetails from "./components/BlogDetails";
import Categorie from "./components/Categorie";

function App() {
  return (
    <>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<BlogDetails />} />
        <Route path="/category/:categoryName" element={<Categorie />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-edit-blog" element={<AddEditeBlog />} />
      </Routes>
    </>
  );
}

export default App;
