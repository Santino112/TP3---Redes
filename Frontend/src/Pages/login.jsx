import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const data = {
            username: username,
            password: password
        };
        try {
            const response = await axios.post('http://localhost:3000/auth/login', data);
            const res = response.data;

            if (res.message.endsWith('exitoso')) {
                localStorage.setItem('datosLogin', JSON.stringify({
                    token: res.token
                }));
                setTimeout(() => {
                    navigate('/Dashboard');
                }, 1000);
            };
        } catch (error) {
            console.log('Error al loguear al usuario', error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <input
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                ></input>
                <input
                    placeholder="Contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button type="submit">Ingresar</button>
            </div>
        </form>
    );
}

export default Login;
