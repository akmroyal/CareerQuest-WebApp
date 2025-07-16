import jwt from 'jsonwebtoken';

const isAuthenticated = async (req,res,next) => {
    try{
        const token = req.cookies.token;
        if(!token) 
            return res.status(401).json({
            message: 'User Not Authenticated',
            success: false
        });
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        if(!decode){
            return res.status(401).json({
                message: 'Invalid token',
                success: false
            });
        }
        req.id = decode.userId;
        next();
    }
    catch(err){
        console.error(err);
        return res.status(401).json({message: 'Authentication failed'});
    }
}

export default isAuthenticated;