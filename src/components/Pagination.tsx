import { useState, MouseEvent } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import "../style/Global.css";

type Props = {
  setOffset: (offset: number) => void,
  offset: number,
}


function Pagination({ setOffset, offset }: Props) {

  const [counter, setCounter] = useState<number>(1);

  const moveToPage = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {

    const buttonElement = e.target as HTMLButtonElement;
    const buttonValue = buttonElement.innerHTML;

    if (offset === 0 && buttonValue === "Next") {
      setOffset(offset + 6);
      setCounter(counter + 1);
    } else if (offset != 0 && offset != 900) {
      if (buttonValue === "Previous") {
        setOffset(offset - 6);
        setCounter(counter - 1);
      } else {
        setOffset(offset + 6);
        setCounter(counter + 1);
      }
    } else if (offset === 900 && buttonValue === "Previous") {
      setOffset(offset - 6);
      setCounter(counter - 1);
    }
  }

  return (
    <Container className='recipe-pagination'>
      <Row className="justify-content-md-center">
        <Col xs="12" sm="11" md="8" lg="6" xl="5" xxl="5">
          <Button disabled={false} className="pag-button" variant="warning" onClick={moveToPage}>Previous</Button>
          <strong className="current-page-text">You are currently on page:</strong> <span className="target-page current-page-number">{counter}</span>
          <Button disabled={false} className="pag-button" variant="warning" onClick={moveToPage}>Next</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Pagination