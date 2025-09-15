import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Api/AuthApi.js"; // <-- importamos la API

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser(username, password);

            if (res.message.endsWith('exitoso')) {
                localStorage.setItem('datosLogin', JSON.stringify({ token: res.token }));
                setTimeout(() => {
                    navigate('/Dashboard');
                }, 1000);
            };
        } catch (error) {
            console.log('Error al loguear al usuario', error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <input
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    placeholder="Contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Ingresar</button>
            </div>
        </form>
    );
}

export default Login;