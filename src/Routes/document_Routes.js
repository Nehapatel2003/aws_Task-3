const {uploadDocumentController,listDocumentController,downloadDocumentController,deleteDocumentController} = require('../Controllers/document_Controller')
const cookieToken  = require('../Middleware/auth_Middleware')
const upload = require('../Middleware/upload_Multer')
const express = require('express');
const documentRouter = express.Router();


documentRouter.post("/api/documents/upload",cookieToken,upload.single('document'),uploadDocumentController);
documentRouter.get("/api/documents",cookieToken,listDocumentController)
documentRouter.get("/api/documents/:id/download",cookieToken,downloadDocumentController)
documentRouter.delete("/api/documents/:id",cookieToken,deleteDocumentController)

module.exports = documentRouter;