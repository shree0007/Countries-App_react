import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (user) navigate('/countries')
    }, [user, loading])

    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />

            <Button onClick={(e) => loginWithEmailAndPassword}>Login</Button>

            <div>
                Already have an account?
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
};

export default Login;