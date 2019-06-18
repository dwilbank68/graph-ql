import jwt from 'jsonwebtoken';

const getUserId = (req, requireAuth=true) => {
    const header = req.request ?
        req.request.headers.authorization :
        req.connection.context.Authorization;
    if (header) {
        const token = header.replace('Bearer ', '');
        const decoded = jwt.verify(token, 'jwtSecret')
        return decoded.userId;
    }
    // if no auth header provided and requireAuth is true
    if (requireAuth) throw new Error('Authentication required');
    // if no auth header provided and requireAuth is false
    return null;
}

export {getUserId as default}