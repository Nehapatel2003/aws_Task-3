const {uploadS3,downloadS3,deleteS3} = require('../Services/s3_Services')
const {listDocumentModel} = require('../Model/document_Model')

const uploadDocumentController = async (req,res,next)=>{
    try{
        await uploadS3(req)
        // await sendLog({INFO: "SNS notification published"})
        return res.status(200).json({message: "Document uploaded successfully !"})             //single
    }catch(err){
        // await cloudWatchCustomMetrics("DocumentsUploadFailed")
        // await sendLog({INFO: "S3 upload Failed !"}) 
        next(err)
    }
}


const listDocumentController =async (req,res,next)=>{
    try{
        console.log(req.user.id)
        const [result] = await listDocumentModel(req.user.id)
        res.status(200).json({message:"Current user documents list found ",result:result})
    }catch(err){
        next(err)
    }
}


const downloadDocumentController = async (req,res,nex) =>{
    try{
        const url = await downloadS3(req) 
        res.status(200).json({message:"Pre-signed URL " ,result:url})
    }catch(err){
        next(err)
    }
}


const deleteDocumentController = async (req,res,next) =>{
    try{
        const result = await deleteS3(req)
        res.status(200).json({message :result}) 
    }catch(err){
        next(err)
    }
}

module.exports = {uploadDocumentController,listDocumentController,downloadDocumentController,deleteDocumentController}