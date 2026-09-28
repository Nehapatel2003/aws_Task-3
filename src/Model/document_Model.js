const pool = require('../Config/db_Connection')

const uploadDocumentModel = async( id,originalname,key,documentURL,size,mime_type)=>{
    const query = "INSERT INTO documents(user_Id,originalName,s3_key,s3_url,file_size,mime_type) values(?,?,?,?,?,?)"
    return await pool.execute(query,[id,originalname,key,documentURL,size,mime_type])
}

const listDocumentModel = async(id)=>{
    return await pool.execute("SELECT * from documents WHERE user_Id = ?",[id])
}

const accessKeyModel =  async (id)=>{
    return await pool.execute("SELECT s3_key from documents WHERE id = ?",[id])
}

const deleteDocumentModel = async (id)=>{
    return await pool .execute("DELETE from documents WHERE id = ?",[id])
}


module.exports = {uploadDocumentModel,listDocumentModel,accessKeyModel,deleteDocumentModel}