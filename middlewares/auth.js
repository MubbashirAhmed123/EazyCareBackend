import jwt from 'jsonwebtoken'
export const isAuth=(req,res,next)=>{

    const authHeader=req.headers['authorization']
    const token =authHeader && authHeader.split(' ')[1]
    if(!token){
        return res.status(404).json({message:"access denied"})
    }

    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,data)=>{
        if(err) return res.status(404).json({message:"access denied"})
        req.user=data
    next()

    })
    


}