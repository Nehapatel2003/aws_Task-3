const {PutObjectCommand,DeleteObjectCommand, GetObjectCommand} = require('@aws-sdk/client-s3')
const { v4: uuid } = require("uuid");
const {s3} = require('../Config/aws_Config');
const {uploadDocumentModel ,accessKeyModel,deleteDocumentModel} = require('../Model/document_Model')
const sendNotification = require('../Services/sns_Services')
const path = require("path")

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");   //pre-sign URL


const uploadS3 = async (req) =>{
    const safeName = path.basename(req.file.originalname).replace(/[^a-zA-Z0-9._-]/g, "_");
    let documentKey =`documents/${req.user.id}/${uuid()}-${safeName}`
    // await sendLog({INFO:`Upload started - UserID : ${req.body.id}, fileName : ${req.file.originalname}`,})

    let baseObjectURL =`https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/`
    let documentURL =`${baseObjectURL}${documentKey}`
      
    await uploadDocumentModel(req.user.id,req.file.originalname,documentKey,documentURL,req.file.size,req.file.mimetype); 
    await s3.send(       
        new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: documentKey,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
            ServerSideEncryption: "AES256"
        })
    );
    await sendNotification(req, documentKey);

// await sendLog({INFO: "S3 upload successful"})  
// await cloudWatchCustomMetrics("DocumentsUploaded") 

// try{
//     // await sendNotification(req)
//     await cloudWatchCustomMetrics("SNSNotificationsSent")
//     // await cloudWatchCustomMetrics("SNSNotificationsFailed")
//     }catch{
//         await cloudWatchCustomMetrics("SNSNotificationsFailed")
//     }
};


const  downloadS3 = async(req) =>{
    const [document] = await accessKeyModel(req.params.id)
    const url = await getSignedUrl(s3,new GetObjectCommand({
        Bucket:process.env.AWS_S3_BUCKET,
        Key : document[0].s3_key
    }) ,{expiresIn:300})
    return url;
}


const  deleteS3 = async (req) => {
    try {
        const [result] = await accessKeyModel(req.params.id);
        // console.log("DB result:", result);
        if (result.length === 0) { 
            return("Document not exit ");
        }
        const s3_key = result[0].s3_key;
        await s3.send(
            new DeleteObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: s3_key
            })
        );
        await deleteDocumentModel(req.params.id);
        return ("Document Deleted Successfully . ")
    } catch (err) {
        console.log("Delete error:", err);
    }
};

module.exports ={uploadS3,downloadS3,deleteS3}