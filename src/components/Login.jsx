import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (user) navigate('/countries')
    }, [user, loading])

    return (

        <Container className="bg-#191919">
            <Row className="vh-100 d-flex justify-content-center align-items-center">
                <Col md={8} lg={6} xs={12}>
                    <div className="border border-3 border-success"></div>
                    <Card className="shadow">
                        <Card.Body>
                            <div className="mb-3 mt-md-4">
                                <h2 className="fw-bold mb-2 text-uppercase ">Countries App</h2>
                                <p className=" mb-5">Please enter your login and password!</p>
                                <div className="mb-3">
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-center">
                                                Email address
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter email" />
                                        </Form.Group>

                                        <Form.Group
                                            className="mb-3"
                                            controlId="formBasicPassword"
                                        >
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Password" />
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="formBasicCheckbox"
                                        >

                                        </Form.Group>
                                        <div className="d-grid">
                                            <Button onClick={() => loginWithEmailAndPassword(email, password)} variant="success">
                                                Login
                                            </Button>
                                        </div>
                                    </Form>
                                    <div className="mt-3">
                                        <p className="mb-0  text-center">
                                            Don't have an account ?{" "}
                                            <Link to="/register" className="text-success fw-bold">
                                                Sign Up
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>


    );
};

export default Login;


















