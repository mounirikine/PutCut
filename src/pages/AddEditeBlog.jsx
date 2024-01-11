import { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const AddEditeBlog = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");
  const [isTrending, setIsTrending] = useState(false);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState(null);
  const [perc, setPerc] = useState(null);
  const [user, setUser] = useState(null);
  const [uploading, setuploading] = useState(false);
  const [imageUploadin, setimageUploadin] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const categoryOptions = [
    "Fashion",
    "Technology",
    "Health",
    "Food",
    "Politics",
    "Sports",
    "Business",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser || null);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const uploadFile = async () => {
      try {
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {

            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");

            setPerc(progress);
            setimageUploadin(true)
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            
            setImage((prev) => ({ ...prev, imgUrl: downloadURL }));
            setimageUploadin(false)
          }
        );
      } catch (error) {
        console.error(error);
      }
      
    };
    file && uploadFile();
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (title && description) {
      setuploading(true);
      
      try {
        const blogId = uuidv4(); // Generate a unique ID for the blog post
        
        const docRef = id
          ? doc(db, "blogs", id)
          : await addDoc(collection(db, "blogs"), { id: blogId }); // Include the generated ID when creating a new blog
        
        await setDoc(docRef, {
          title,
          description,
          tags,
          isTrending,
          category,
          image: image, // Handle image URL or storage path accordingly
          timestamp: serverTimestamp(),
          author: user.displayName,
          userId: user.uid,
        });
    
        if (!id) {
          toast.success("Blog created successfully");
          navigate(`/`); // Navigate to the detailsBlog page with the generated ID
        } else {
          toast.success("Blog updated successfully");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setuploading(false);
      }
    } else {
      toast.error("All fields are mandatory to fill");
    }
  };
  

  return (
    <div className="bg-gray-900 h-screen">
      <div className="max-w-xl mx-auto p-6 bg-gray-900 rounded-md w-full">
        <h1 className="text-center py-2 text-2xl font-bold text-white">
          Create Blog
        </h1>
        <form>
          <div className="mb-4">
            <label htmlFor="title" className="text-white">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-3 py-2 bg-gray-800 text-white outline-none rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tags" className="text-white">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    className="ml-2 focus:outline-none"
                    onClick={() => handleTagRemove(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder="Add tags..."
                className="w-full px-3 py-2 bg-gray-800 text-white outline-none rounded-md"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="text-white">
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-3 py-2 bg-gray-800 text-white outline-none rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="isTrending" className="text-white">
              <input
                type="checkbox"
                id="isTrending"
                checked={isTrending}
                onChange={() => setIsTrending(!isTrending)}
              />
              Trending Blog
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="text-white">
              Category
            </label>
            <select
              id="category"
              className="w-full px-3 py-2 bg-gray-800 text-white outline-none rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categoryOptions.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="text-white">
              Image
            </label>
            <input
              type="file"
              id="image"
              className="w-full px-3 py-2 bg-gray-800 text-white outline-none rounded-md"
              onChange={handleImageChange}
            />


          <progress style={{display : `${imageUploadin ? '' : 'none' }`}} id="progress" className="progress progress-accent w-56 bg-white" value={perc} max="100"></progress>
          </div>
          <button
            onClick={handleSubmit}
            type="button"
            className="bg-violet-500 text-white px-4 py-2 rounded-md w-5/12 flex items-center"
          >
            {
            uploading ? <span className="loading loading-spinner loading-sm"></span>
                          :'Create Blog' 
          }
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditeBlog;
