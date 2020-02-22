import jwt from 'jsonwebtoken';
import { SECRET } from '../config/env.config';
import { AuthenticationError } from 'apollo-server-express'
console.log('process env intoken', SECRET);
const generateToken = (user) => {
    console.log('genereate token', user.id)
    let token = jwt.sign({
        id: user.id, email: user.email, username: user.username
    }, 'secretkey', { expiresIn: '1h' });
    console.log('token', token)
    return token;
}

const verifyToken = async (req) => {
    const token = req.headers['x-token'];
    console.log('token---', token)
    if (token) {
        try {
            return await jwt.verify(token, SECRET);
        } catch (e) {
            console.log('token validateion failed', e);
            throw new AuthenticationError('Your session has been expired ! Sign in again');
        }
    }
}

export { generateToken, verifyToken }