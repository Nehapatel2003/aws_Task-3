const pool = require('../Config/db_Connection')
const bcrypt = require('bcrypt')


const createUserModel = async (user) => {
    // console.log(user.password)
    let hashPass = await bcrypt.hash(user.password ,10)
    return await pool.execute("INSERT INTO users (id,name,email,password) VALUES (?, ?,?,?)" ,[user.id,user.name,user.email,hashPass]);
};

const loginUserModel = async (user) =>{
    return await pool.execute("SELECT * from users WHERE email=?",[user.email]);
}

module.exports = {createUserModel,loginUserModel}
