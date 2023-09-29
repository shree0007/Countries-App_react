import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";
import { Button, Container, Form } from "react-bootstrap";
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
        <Container style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Form style={{ width: "30rem", height: "50vh", border: "solid 2px gray", borderRadius: "8px", padding: "6rem" }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password" />
                </Form.Group>

                <Button
                    onClick={() => loginWithEmailAndPassword(email, password)} variant="primary"
                >
                    Login
                </Button>

                <br />

                <Form.Text className="text-muted">
                    Doesn't have an account?
                </Form.Text>
                <Link to="/register">Register</Link>
            </Form>

        </Container>


    );
};

export default Login;






// <div>
//     <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//     />

//     <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//     />

//     <Button onClick={() => loginWithEmailAndPassword(email, password)}>Login</Button>

//     <div>
//         Doesn't have an account?
//         <Link to="/register">Register</Link>
//     </div>
// </div>
