import { Button, Col, Row } from 'react-bootstrap'
import { commentsType } from '../types/types'
import { formatDate } from '../utils/Utils'
import { MouseEvent, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../config/firebaseConfig'
import "../style/Comment.css"

type Props = {
  comment: commentsType,
}

function Comment({ comment }: Props) {

  const { user } = useContext(AuthContext);
  const handleDelete = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    const buttonVal = e.target as HTMLButtonElement;
    const q = query(collection(db, "Comments"), where("message", "==", buttonVal.value));
    let docID = '';
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      docID = doc.id;
    });
    await deleteDoc(doc(db, "Comments", docID));
  }

  return (
    <Row className="rowStyle">
      <Col xs lg="2">
        <img src={comment.picUrl} alt="" className="picStyle" />
      </Col>
      <Col xs lg="8">
        <p><strong>{comment.author}</strong></p>
        <p>{comment.message}</p>
        <p className="dateStyle">{formatDate(comment.date)}</p>
      </Col>
      <Col xs lg="2">
        {comment.authorID === user?.uid ? <Button variant='danger' className='delete-button' value={comment.message} onClick={handleDelete}>Delete</Button> : ""}
      </Col>
    </Row>
  )
}

export default Comment