import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useContext, useEffect, useRef, useState } from "react";
import Comment from "./comment/Comment";
import { commentsType } from "../../types/types";
import { AuthContext } from "../../context/AuthContext";

import "./comments.scss";

type Props = {
  recipeId: number;
};

function Comments({ recipeId }: Props) {
  const [comments, setComments] = useState<commentsType[] | null>(null);
  const { user } = useContext(AuthContext);
  const commentInput = useRef<HTMLTextAreaElement>(null);

  // Add new comment
  const submitNewComment = async (e: React.FormEvent<HTMLFormElement>) => {
    // ! This part was necessary because data varied depending if user logged in with google or account created here
    // ! But in the end I will stick to just manually created accounts so it will be modified later
    e.preventDefault();

    // Get the form data
    const formData = new FormData(e.currentTarget);
    const commentData = formData.get("comment_text") as string;

    // Collect user data
    const authorData = user
      ? user.displayName
        ? user.displayName
        : user.email
      : "No user";
    const authorImage = user
      ? user.photoURL
        ? user.photoURL
        : "https://firebasestorage.googleapis.com/v0/b/forkit-d574f.appspot.com/o/noUser.png?alt=media&token=37607a3a-371b-40a9-9947-a0005991680b"
      : "No user";

    // Create new comment data
    const newComment: commentsType = {
      authorID: user!.uid,
      recipeID: recipeId,
      author: authorData!,
      picUrl: authorImage,
      message: commentData,
      date: new Date(),
    };

    // Add a new document with a generated id.
    await addDoc(collection(db, "Comments"), newComment);
    // Reset the input value
    commentInput.current!.value = "";
  };

  useEffect(() => {
    // Get comments assigned to this recipe sorted by date
    const q = query(
      collection(db, "Comments"),
      where("recipeID", "==", recipeId),
      orderBy("date", "desc")
    );
    // Refresh whenever new comment is added or old deleted
    onSnapshot(q, (querySnapshot) => {
      const comments: commentsType[] = [];
      querySnapshot.forEach((doc) => {
        // Assign data to variable
        const data = doc.data() as commentsType;
        // Assign optional document id value
        data.documentId = doc.id;
        comments.push(data);
      });
      setComments(comments);
    });
  }, [recipeId]);

  return (
    <>
      {/* Display all comments */}
      <div className="comments-grid">
        <h4>Comments:</h4>
        {comments &&
          comments.map((comment, idx) => {
            return <Comment key={idx} comment={comment} />;
          })}
      </div>
      {/* Add new comment */}
      <form onSubmit={submitNewComment} className="comment-form">
        <h4>Add new comment:</h4>
        <textarea
          placeholder="Leave your comment here"
          rows={3}
          name="comment_text"
          ref={commentInput}
        />
        <button type="submit">Add comment</button>
      </form>
    </>
  );
}

export default Comments;
