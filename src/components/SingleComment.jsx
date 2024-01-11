import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { useParams } from "react-router-dom";

const SingleComment = () => {
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const commentCollection = collection(db, 'comments');

    useEffect(() => {
        const unsubscribe = onSnapshot(commentCollection, (querySnapshot) => {
            const commentsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setComments(commentsData);
        });

        return () => unsubscribe(); // Cleanup the listener when the component unmounts
    }, [commentCollection, id]);

    const filteredComments = comments.filter(comment => comment.postId === id);

    const handleAddComment = async () => {
        if (newComment.trim() !== "") {
            try {
                // Add a new comment to the collection
                await addDoc(commentCollection, {
                    postId: id,
                    userName: "YourUserName", // Replace with the actual user name
                    text: newComment,
                    timestamp: serverTimestamp(),
                });

                // Clear the comment input
                setNewComment("");
            } catch (error) {
                console.error("Error adding comment:", error);
            }
        }
    };

    return (
        <>
            {filteredComments.length > 0 ? (
                filteredComments.map((item, index) => (
                    <div key={index} className="flex justify-between items-center shadow-xl px-5 rounded-2xl">
                        <span className="flex items-center justify-between gap-3">
                            <img
                                className="w-7 h-7 md:w-16 md:h-16 rounded-full"
                                src="https://cdn-icons-png.flaticon.com/512/9203/9203764.png"
                                alt=""
                            />
                            <div className="flex flex-col">
                                <h1>{item.userName}</h1>
                                <p className="text-gray-400 text-sm">{item.text}</p>
                            </div>
                        </span>
                        <span>
                        {item.timestamp && (
                                <p className="text-sm text-gray-300">{item.timestamp.toDate().toLocaleString()}</p>
                            )}                        </span>
                    </div>
                ))
            ) : (
                <p>No Comments In This Post</p>
            )}
        </>
    );
};

export default SingleComment;
