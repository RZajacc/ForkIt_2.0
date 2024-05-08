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
    e.preventDefault();

    // Get the form data
    const formData = new FormData(e.currentTarget);
    const commentData = formData.get("comment_text") as string;

    // Create new comment data
    const newComment: commentsType = {
      authorID: user!.uid as string,
      recipeID: recipeId,
      author: user!.displayName as string,
      picUrl: user!.photoURL as string,
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
      {comments?.length != 0 ? (
        <div className="comments-grid">
          <h4>Comments:</h4>
          {comments &&
            comments.map((comment, idx) => {
              return <Comment key={idx} comment={comment} />;
            })}
        </div>
      ) : (
        ""
      )}
      {/* Add new comment */}
      <form onSubmit={submitNewComment} className="comment-form">
        <h4>Add new comment:</h4>
        <textarea
          placeholder="Leave your comment here"
          id="comment"
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
