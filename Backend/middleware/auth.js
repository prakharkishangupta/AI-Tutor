import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = await req.cookies.jwt;
        console.log("token", token);
        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedData.userId;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default auth;
