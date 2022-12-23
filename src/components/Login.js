import React, {useState} from 'react'
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import {Link} from 'react-router-dom';
import { useLoginMutation } from '../storeService/appApi';
import '../styles/Signup.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, { isError, isLoading, error }] = useLoginMutation();


   function handleLogin(e) {
        e.preventDefault();
        login({ email, password });
    }

  return (
    <Container>
        <Row>
            <Col md={6} className="login_form_container">
                <Form style={{ width: "100%"}} onSubmit={handleLogin}>
                    <h1>Login to your account</h1>
                    {isError && <Alert variant="danger">{error.data}</Alert>}
                    <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} required onChange={(e) => setEmail(e.target.value)} /><br></br>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                            <Button className="login_button" type="submit" disabled={isLoading}>
                                Login
                            </Button>
                           
                        </Form.Group>
<p>Don't have an account?<Link to="/signup">Create account</Link></p>
                </Form>
            </Col>
            <Col md={6} className="login_image_container"></Col>
        </Row>
    </Container>
  )
}

export default Login