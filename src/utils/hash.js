const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};


const comparePassword=async(password,hashPassword)=>{
    return bcrypt.compare(password,hashPassword);
}
module.exports={hashPassword,comparePassword}