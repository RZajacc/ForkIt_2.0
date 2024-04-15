import { Button, Col, Container, Row } from "react-bootstrap";
import "../style/Dashboard.css";
import DashboardUser from "../components/DashboardUser";
import DashboardFavs from "../components/DashboardFavs";
import { useState } from "react";
import TopSection from "../components/TopSection";


function Dashboard() {

  const [displayToggle, setDisplayToggle] = useState(true);

  return (
    <>
      <TopSection />
      <Container className="dashboard-container">
        <Row className="justify-content-md-center dashboard-content">
          <Col className="dashboard-top-content" >
            <Button variant="info" className="dashboard-button" onClick={() => {
              setDisplayToggle(true)
            }}>Account details</Button>
          </Col>
          <Col className="dashboard-top-content">
            <Button variant="info" className="dashboard-button" onClick={() => {
              setDisplayToggle(false)
            }}>Saved recipes</Button>
          </Col>
        </Row>
        {displayToggle ? <DashboardUser /> : <DashboardFavs />}
      </Container >
    </>
  )
}

export default Dashboard