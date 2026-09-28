const errHandling = (err,req,res,next) =>{
    if(err){
        return res.status(500).json({err : err.message})
    }
}

module.exports = {errHandling}