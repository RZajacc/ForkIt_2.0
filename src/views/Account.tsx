import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import TopSection from '../components/TopSection';
import { AuthContext } from '../context/AuthContext';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import '../style/Account.css';

function Account() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPasswrod, setConfirmPasswrod] = useState('');
  const [passwordErr, setPasswordErr] = useState<string[] | null>(null);
  const { loginEmail, loginGoogle, loginGithub, loginFacebook, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswrodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPasswrod(e.target.value);
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginEmail(email, password);
    navigate('/dashboard');
  };

  const handleLoginGoogle = () => {
    loginGoogle();
    navigate('/dashboard');
  };

  const handleGithubLogin = () => {
    loginGithub();
    navigate('/dashboard');
  };

  const handleFacebookLogin = () => {
    loginFacebook();
    navigate('/dashboard');
  };

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValidation: string[] = [];

    if (password !== confirmPasswrod) {
      formValidation.push("Provided passwords don't match!");
    }

    if (password.length < 8 || confirmPasswrod.length < 8) {
      formValidation.push('Password is too short!');
    }

    if (!/[A-Z]/.test(password) || !/[A-Z]/.test(confirmPasswrod)) {
      formValidation.push('Password needs to have at least one uppercase letter!');
    }

    if (
      !/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g.test(password) ||
      !/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g.test(confirmPasswrod)
    ) {
      formValidation.push('Password needs to contain at least 1 special character!');
    }

    if (!/[0-9]/.test(password) || !/[0-9]/.test(confirmPasswrod)) {
      formValidation.push('Password needs to contain at least one number!');
    }

    setPasswordErr(formValidation);

    if (passwordErr?.length == 0) {
      register(email, password);
      navigate('/dashboard');
      return <Navigate to={'/'} />;
    }
  };


  return (
    <>
      <TopSection />
      <Container className='account-container'>
        <Row className='justify-content-md-center'>
          <Col xxl='4' xl='5' lg='5' md='10' sm='10' xs='10' className="colStyle">
            <Form onSubmit={handleLogin} className='text-center'>
              <h5>If you already have an account simply log in using preferred option:</h5>
              <Form.Group className='mb-3' controlId='login-email'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type='email' placeholder='Enter email' onChange={handleEmailChange} />
                <Form.Text className='text-muted'>
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className='mb-3' controlId='login-password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  onChange={handlePasswordChange}
                />
              </Form.Group>
              <Button variant='primary' type='submit' className="loginButtonStyle">
                Login
              </Button>
            </Form>

            <div className="otherLoggingOptions">
              <h5 className='text-center'>Or select one of alternative logging options:</h5>
              <Button variant='light' onClick={handleLoginGoogle} className="loginButtonStyle">
                <img src='https://firebasestorage.googleapis.com/v0/b/forkit-d574f.appspot.com/o/googleIcon.svg?alt=media&token=acf1418a-c215-4ecc-87d8-e0f5e6ea051a' /> Log in with Google
              </Button>

              <Button variant='light' onClick={handleGithubLogin} className="loginButtonStyle">
                <img src='https://firebasestorage.googleapis.com/v0/b/forkit-d574f.appspot.com/o/github.png?alt=media&token=4f7440c9-6b84-4434-80d2-970c13a0301b' width={'45px'} />
                Login in with Github
              </Button>

              <Button variant='light' onClick={handleFacebookLogin} className="loginButtonStyle">
                <img src='https://firebasestorage.googleapis.com/v0/b/forkit-d574f.appspot.com/o/facebook.png?alt=media&token=011fb176-e357-48df-a263-cb03e4ebabc6' width={'45px'} />
                Login in with Facebook
              </Button>
            </div>
          </Col>

          <Col xxl='4' xl='5' lg='5' md='10' sm='10' xs='10' className="colStyle">
            <Form onSubmit={handleRegister} className='text-center'>
              <h5>If you don't have an account yet please use this register form:</h5>
              <Form.Group className='mb-3' controlId='register-email'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  onChange={handleEmailChange}
                  required
                />
                <Form.Text className='text-muted'>
                  We'll never share your email with anyone else.
                </Form.Text>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  onChange={handlePasswordChange}
                />
                <Form.Label>Repeat password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='confirm password'
                  onChange={handleConfirmPasswrodChange}
                />
              </Form.Group>
              <div className='reg-errors'>
                {passwordErr &&
                  passwordErr.map((err, idx) => {
                    return <p key={idx}>{err}</p>;
                  })}
              </div>
              <Button variant='primary' type='submit' className="loginButtonStyle">
                Register
              </Button>
              <div className='password-req'>
                <p>*Password needs to have at least 8 characters</p>
                <p>*Password needs to contain at least 1 uppercase character</p>
                <p>*Password needs to contain at least 1 number</p>
                <p>*Password needs to contain at least 1 special character</p>
              </div>
            </Form>
          </Col>
        </Row>
      </Container >
    </>
  );
}

export default Account;
