import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button, Col, Form } from "react-bootstrap";

function Register() {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswrod, setConfirmPasswrod] = useState("");
  const [passwordErr, setPasswordErr] = useState<string[] | null>(null);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswrodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPasswrod(e.target.value);
  };

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValidation: string[] = [];

    if (password !== confirmPasswrod) {
      formValidation.push("Provided passwords don't match!");
    }

    if (password.length < 8 || confirmPasswrod.length < 8) {
      formValidation.push("Password is too short!");
    }

    if (!/[A-Z]/.test(password) || !/[A-Z]/.test(confirmPasswrod)) {
      formValidation.push(
        "Password needs to have at least one uppercase letter!"
      );
    }

    if (
      !/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g.test(password) ||
      !/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g.test(confirmPasswrod)
    ) {
      formValidation.push(
        "Password needs to contain at least 1 special character!"
      );
    }

    if (!/[0-9]/.test(password) || !/[0-9]/.test(confirmPasswrod)) {
      formValidation.push("Password needs to contain at least one number!");
    }

    setPasswordErr(formValidation);

    if (passwordErr?.length == 0) {
      register(email, password);
      //   Navigate("/dashboard");
      return <Navigate to={"/"} />;
    }
  };
  return (
    <Col xxl="4" xl="5" lg="5" md="10" sm="10" xs="10" className="colStyle">
      <Form onSubmit={handleRegister} className="text-center">
        <h5>If you don't have an account yet please use this register form:</h5>
        <Form.Group className="mb-3" controlId="register-email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleEmailChange}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
          <Form.Label>Repeat password</Form.Label>
          <Form.Control
            type="password"
            placeholder="confirm password"
            onChange={handleConfirmPasswrodChange}
          />
        </Form.Group>
        <div className="reg-errors">
          {passwordErr &&
            passwordErr.map((err, idx) => {
              return <p key={idx}>{err}</p>;
            })}
        </div>
        <Button variant="primary" type="submit" className="loginButtonStyle">
          Register
        </Button>
        <div className="password-req">
          <p>*Password needs to have at least 8 characters</p>
          <p>*Password needs to contain at least 1 uppercase character</p>
          <p>*Password needs to contain at least 1 number</p>
          <p>*Password needs to contain at least 1 special character</p>
        </div>
      </Form>
    </Col>
  );
}

export default Register;
