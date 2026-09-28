const jwt = require('jsonwebtoken')

// const cookieToken = (req,res,next)=>{
//     const token = req.cookies.token
//     console.log(cookie)
//     if(!token){
//         return res.status(401).json({message:"Invalid Token"})
//     }
//     try{
//         const decode = jwt.verify(token,process.env.JWT_KEY)
//         req.user = decode
//         console.log(req.user)
//         next()
//     }catch(err){
//         return res.status(500).send({message:err.message})
//     }
// }


const cookieToken = (req, res, next) => {
    const token = req.cookies.token;
    // console.log("Token:", token); 
    if (!token) {
        return res.status(401).json({message: "Authentication required"});
    }
    try {
        const decode = jwt.verify(token,process.env.JWT_KEY);
        req.user = decode;
        // console.log("Authenticated user:", req.user);
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = cookieToken;

