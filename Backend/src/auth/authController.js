import { getConnection } from '../database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Faltan ingresar datos.' })
    };
    try {
        const connection = getConnection();
        const existente = await connection.query(
            'SELECT * FROM Usuarios WHERE username = $1',
            [username]
        );
        if (existente.rows.length > 0) {
            return res.status(409).json({ message: 'El usuario que intenta registrar ya existe' })
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        await connection.query('INSERT INTO Usuarios (username, password_hash) VALUES ($1, $2)',
            [username, hashedPassword]
        );
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al registrar al usuario' });
    }
};

export const login = async (req, res) => {
    const { username, password} = req.body;
    try {
        const connection = getConnection();
        const existente = await connection.query(
            'SELECT * FROM Usuarios WHERE username = $1',
            [username]
        );
        if (existente.rows.length === 0) {
            return res.status(401).json({message: 'Usuario y/o contraseñas incorrectas'})
        }
        const user = existente.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({message: 'Usuario y/o contraseñas incorrectas'})
        };
        const token = jwt.sign (
            {
                id: user.id,
                username: user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || '1h'
            }
        );
        res.json({
            message: 'Logueo de usuario exitoso',
            token: token,
        });
    } catch (error) {
        console.error('Error al loguear al usuario', error);
        return res.status(500).json({message: 'Error al loguear al usuario'})
    };
};