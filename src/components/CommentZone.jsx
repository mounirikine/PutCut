import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { auth, db } from "../firebase";

const CommentZone = () => {
  const { id } = useParams();
  const [uploading, setuploading] = useState(false);


  const [commentText, setCommentText] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser || null);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim() || !id) {
      toast.error("Comment text cannot be empty, and PostId must be defined");
      return;
    }

    try {
      setuploading(true)
      const commentId = uuidv4(); // Generate a unique ID for the comment

      const docRef = await addDoc(collection(db, "comments"), {
        id: commentId,
        postId: id,
        text: commentText,
        userId: user?.uid,
        userName: user?.displayName,
        timestamp: serverTimestamp(),
      });

      await setDoc(docRef, {
        id: commentId,
        postId: id,
        text: commentText,
        userId: user?.uid,
        userName: user?.displayName,
        timestamp: serverTimestamp(),
      });
      setCommentText("");
      toast.success("Comment added successfully");
    } catch (err) {
      console.error(err);
      toast.error("Error adding comment");
    }
    setuploading(false)
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
  <input
    type="text"
    value={commentText}
    onChange={(e) => setCommentText(e.target.value)}
    className="w-full md:w-96 lg:w-2/3 xl:w-1/2 bg-gray-700 px-5 py-2 rounded-3xl text-white outline-none mb-4"
    placeholder="Write Your Comment ..."
  />
  <button type="submit" className="bg-violet-700 px-4 md:px-10 py-1 rounded-3xl text-white">
  {
            uploading ? <span className="loading loading-spinner loading-sm w-100"></span>
                          :'Submit' 
          }  </button>
</form>

    </>
  );
};

export default CommentZone;
