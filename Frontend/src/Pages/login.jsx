import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Box, TextField, Stack, AppBar, Toolbar, Divider, Snackbar, Alert, AlertTitle, Modal, Fade, Backdrop, Select, FormControl, MenuItem, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CloudIcon from '@mui/icons-material/Cloud';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [severity, setSeverity] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [titulo, setTitulo] = useState('');
    const [codigo, setCodigo] = useState('');
    const [showCodigo, setShowCodigo] = useState(false);
    const navigate = useNavigate();

    const handleToggleShowCodigo = () => {
        setShowCodigo((prev) => !prev);
    };

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
                setTitulo("Éxito");
                setMensaje(res.message);
                setSeverity("success");
                localStorage.setItem('datosLogin', JSON.stringify({
                    token: res.token
                }));
                setTimeout(() => {
                    navigate('/Dashboard');
                }, 2000);
            } else {
                setTitulo("Error");
                setMensaje(res.message);
                setSeverity("error");
                setUsername('');
                setPassword('');
            }
        } catch (error) {
            setTitulo("Error");
            setMensaje('Usuario y/o contraseñas incorrectas');
            setSeverity("error");
            setUsername('');
            setPassword('');
        }
    };

    return (
        <>
            <Snackbar
                open={Boolean(mensaje)}
                autoHideDuration={4000}
                onClose={() => setMensaje(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{ mt: "2rem" }}
            >
                {mensaje && (
                    <Alert variant="filled" severity={severity} sx={{ color: "#ffffff", width: { xs: "100%", sm: "100%", md: 450, lg: 450, xl: 450 }, height: 85 }}>
                        <AlertTitle>{titulo}</AlertTitle>
                        {mensaje}
                    </Alert>
                )}
            </Snackbar>
            <Stack
                flexDirection={{ xs: 'column', sm: 'column', md: 'row-reverse', lg: 'row-reverse', xl: 'row-reverse' }}
                justifyContent="center"
                alignItems="stretch"
                sx={{
                    width: "100%",
                    minHeight: '100dvh'
                }}>
                <Box
                    sx={{
                        width: { xs: "100%", sm: "100%", md: "65%", lg: "85%", xl: "65%" },
                        height: '100dvh',
                        overflow: 'hidden',
                        boxShadow: 6,
                        display: { xs: 'none', sm: 'none', md: 'block' }
                    }}
                >
                    <Box
                        component="img"
                        src="/images/storm.jpg"
                        alt="RauloCoinImage"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            boxShadow: 6
                        }}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'column', md: 'row-reverse', lg: 'row-reverse', xl: 'row-reverse' },
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: { xs: '100%', xl: '50%' },
                    minHeight: '100dvh',
                    boxSizing: "border-box",
                    p: 2,
                    backgroundImage: "url(/images/fondoLogin.png)",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                }}>
                    <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: { xs: '100%', sm: '100%', md: '100%', lg: '60%', xl: '55%' }, p: 3, borderRadius: 2, backgroundColor: '#00000081', boxShadow: 6 }}>
                        <Box sx={{ width: '100%', mb: 4, textAlign: 'center' }}>
                            <Typography variant='h1' sx={{ fontSize: { xs: '2rem', sm: '2rem', md: '2rem', lg: '2.2rem', xl: '2.2rem' }, color: 'white' }}><CloudIcon sx={{ mr: 1 }} fontSize="large"></CloudIcon> Weather API <CloudIcon sx={{ ml: 1 }} fontSize="large"></CloudIcon></Typography>
                            <Divider />
                        </Box>
                        <Box sx={{ width: '100%', mb: 3 }}>
                            <Typography variant='h2' sx={{ fontSize: { xs: '1.7rem', sm: '1.7rem', md: '1.7rem', lg: '1.8rem', xl: '1.8rem' }, color: 'white' }}>Inicio de sesión</Typography>
                            <Divider />
                        </Box>
                        <TextField
                            label="Usuario"
                            type="text"
                            variant="filled"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            InputLabelProps={{ required: false, style: { color: "white" } }}
                            InputProps={{
                                style: { color: "white" },
                            }}
                            required
                            sx={{
                                marginBottom: "1rem",
                                width: "100%",
                                "& .MuiFilledInput-root": {
                                    "&:after": { borderBottomColor: "white" },
                                },
                                "& .MuiInputLabel-root": { color: "white" }
                            }}
                        />
                        <TextField
                            label="Contraseña"
                            type={showCodigo ? 'text' : 'password'}
                            variant="filled"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputLabelProps={{ required: false, style: { color: 'white' } }}
                            required
                            sx={{
                                marginBottom: "1rem",
                                width: "100%",
                                "& .MuiFilledInput-root": {
                                    "&:after": { borderBottomColor: "white" },
                                },
                                "& .MuiInputLabel-root": { color: "white" },
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleToggleShowCodigo}
                                            edge="end"
                                            sx={{ color: "white" }}
                                        >
                                            {showCodigo ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                style: {
                                    color: "white"
                                }
                            }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    width: "100%",
                                    mt: 1,
                                    boxShadow: 2,
                                    backgroundColor: "#2485e9",
                                    "&:hover": {
                                        backgroundColor: "#1f73ca",
                                        color: "white",
                                    },
                                    "&.Mui-disabled": {
                                        backgroundColor: "#1f73ca",
                                        color: "white",
                                    },
                                }}>Ingresar</Button>
                        </Box>
                    </Box>
                </Box>
            </Stack>
        </>
    );
}

export default Login;
