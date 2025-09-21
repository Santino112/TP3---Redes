import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { motion } from "framer-motion"; // <-- para la animación

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
        <div className="w-full min-h-screen flex items-center justify-center bg-black">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md"
            >
                <h1 className="text-white text-2xl font-semibold text-center mb-6">
                    Iniciar Sesión
                </h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <input
                        placeholder="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition duration-300"
                    >
                        Ingresar
                    </button>
                </form>
            </motion.div>
        </div>
    );
}

export default Login;
