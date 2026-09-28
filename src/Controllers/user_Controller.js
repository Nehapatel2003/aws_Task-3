const {createUserModel ,loginUserModel} = require('../Model/user_Model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUserController = async (req,res,next)=>{
    // console.log(req.body)
    try{
        const [result] = await createUserModel(req.body)
        res.status(200).json({message:"User Register Successfully",result:result})
    }catch(err){
        // console.log(err)
        next(err)
    }
}


const loginUserController = async (req,res,next)=>{
    try{
        const [result] = await loginUserModel(req.body)
        let check = await bcrypt.compare(req.body.password,result[0].password)
        if(!check){
            return res.status(401).json({message:"Wrong email / Password"})
        }
        const token = jwt.sign({id:result[0].id,name:result[0].name,email:result[0].email,password:result[0].password},process.env.JWT_KEY,{expiresIn:"20m"})
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:10*1000
        })
        res.status(200).json({message:"User Login Successfully",result:result})
    }catch(err){
        next(err)
    }
}


module.exports = {createUserController,loginUserController}