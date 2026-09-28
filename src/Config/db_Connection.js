const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
    waitForConnections:true,
    connectionLimit:2
})

async function checkConnection() {
    try{
        let connection = await pool.getConnection()
        console.log("DB Connected !")
    }catch(err){
        console.log("DB not connected !",err.message)
    }
}
checkConnection()
module.exports = pool