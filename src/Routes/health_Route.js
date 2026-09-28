const express = require("express");

const router = express.Router();

router.get("/api/health", (req, res) => {
    res.status(200).json({status: "OK",message: "Application is running"});
});

router.get("/api/ready", (req, res) => {
    res.status(200).json({status: "READY",message: "Application is ready to receive traffic"});
});

module.exports = router;
