import Jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        res.json({ success: false, message: "Not Authrisied login again" })
    }

    try {
        if (!req.body) {
            req.body = {};
        }
        
        const token_decode = Jwt.verify(token, process.env.JWT_SECRET)
        req.body.userid = token_decode.id;
        next();
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: " middlewar error" })
    }
}

export default authMiddleware 