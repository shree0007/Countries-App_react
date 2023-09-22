import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, regesterWithEmailAndPassword } from "../auth/firebase";
import { Button } from "react-bootstrap";


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [user, loading, error] = useAuthState('');
    const navigate = useNavigate();

    const register = () => {
        if (!name) alert("Please enter name")
        regesterWithEmailAndPassword(name, email, password);
    }

    useEffect(() => {
        if (loading) return;
        if (user) navigate('/countries')
    }, [user, loading])


    return (
        <div>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
            />
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

            {/* //add enter password again section */}

            <Button onClick={register}>Register</Button>

            <div>
                Already have an account?
                <Link to="/login">Login</Link>
            </div>


        </div>
    );
};

export default Register;