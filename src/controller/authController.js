const {registerUser,loginUser}=require("./../services/authService")
const register=async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password ){
        return res.status(400).json({message:"Please enter the valid feilds"})
    }
    const result=await registerUser({username,email,password});
    return res.status(result.status).json({message:result.message})
}
const login=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({message: "Please enter the valide feilds"});
    }
    const result=await loginUser({email,password});
    return res.status(result.status).json({message: result.message, token: result.token});
}
module.exports={register,login};