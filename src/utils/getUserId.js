import jwt from 'jsonwebtoken';

const getUserId = (req, requireAuth=true) => {
    const header = req.request ?
        req.request.headers.authorization :
        req.connection.context.Authorization;
    if (header) {
        const token = header.replace('Bearer ', '');
        console.log('------------------------------------------');
        console.log('process.env.JWT_SECRET ',process.env.JWT_SECRET);
        console.log('------------------------------------------');
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log('------------------------------------------');
        console.log('decoded ',decoded);
        console.log('------------------------------------------');
        return decoded.userId;
    }
    // if no auth header provided and requireAuth is true
    if (requireAuth) throw new Error('Authentication required');
    // if no auth header provided and requireAuth is false
    return null;
}

export {getUserId as default}