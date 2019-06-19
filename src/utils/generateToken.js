import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    console.log(process.env.JWT_SECRET); // the secret is there
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '7 days'})
    console.log('------------------------------------------');
    console.log('token ',token);         // the token is there
    console.log('------------------------------------------');
    return token;
}

export {generateToken as default}
