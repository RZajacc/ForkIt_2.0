import { addDoc, collection, onSnapshot, query, where } from "firebase/firestore";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap"
import { db } from "../config/firebaseConfig";
import { ChangeEvent, useContext, useEffect, useState } from "react"
import Comment from "./Comment";
import { commentsType } from "../types/types";
import "../style/Comment.css"
import { AuthContext } from "../context/AuthContext";


type Props = {
    recipeId: number;
}


function Comments({ recipeId }: Props) {

    const [comments, setComments] = useState<commentsType[] | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const { user } = useContext(AuthContext)


    const handleMessageInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value);
    }

    const submitMessage = async () => {
        const authorData = user ? user.displayName ? user.displayName : user.email : "No user";
        const authorImage = user ? user.photoURL ? user.photoURL : "https://firebasestorage.googleapis.com/v0/b/forkit-d574f.appspot.com/o/noUser.png?alt=media&token=37607a3a-371b-40a9-9947-a0005991680b" : "No user";
        const newChatMsg: commentsType = {
            authorID: user!.uid,
            recipeID: recipeId,
            author: authorData!,
            picUrl: authorImage,
            message: newMessage,
            date: new Date(),
        }
        // Add a new document with a generated id.
        await addDoc(collection(db, "Comments"), newChatMsg);
    }


    // * Get messages with live update
    const getCommentsLive = () => {
        const q = query(collection(db, "Comments"), where("recipeID", "==", recipeId));
        onSnapshot(q, (querySnapshot) => {
            const comments: commentsType[] = [];
            querySnapshot.forEach((doc) => {
                comments.push(doc.data() as commentsType);
            });
            setComments(comments);
        });
    }

    useEffect(() => {
        getCommentsLive();
    }, [])


    return (
        <>
            <Container className="commentsContainer">
                <h5>Comments:</h5>
                {comments && comments.map((comment, idx) => {
                    return <Comment key={idx} comment={comment} />
                })}

                <FloatingLabel controlId="comment-textarea" label="Leave a comment here">
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }}
                        onChange={handleMessageInput}
                    />
                </FloatingLabel>
                <div className="text-center">
                    <Button onClick={submitMessage} className="submit-message-button" variant="success">Submit your message</Button>
                </div>
            </Container>
        </>
    )
}

export default Comments