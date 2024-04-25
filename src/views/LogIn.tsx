import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "../style/login.scss";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginEmail } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginEmail(email, password);
    navigate("/dashboard");
  };

  return (
    <>
      <Container className="account-container">
        <Row className="justify-content-md-center">
          <Col
            xxl="4"
            xl="5"
            lg="5"
            md="10"
            sm="10"
            xs="10"
            className="colStyle"
          >
            <Form onSubmit={handleLogin} className="text-center">
              <h5>
                If you already have an account simply log in using preferred
                option:
              </h5>
              <Form.Group className="mb-3" controlId="login-email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={handleEmailChange}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="login-password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="loginButtonStyle"
              >
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LogIn;
