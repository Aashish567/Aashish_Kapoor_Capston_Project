const UserModel= require('../models/user_model')

const register=async (req,res)=>{

    const {title,price,phone,firstName,lastName,email,address}=req.body;

    if(!title || !price || !phone || !firstName || !lastName || !email || !address){
        return res.status(400).send('All fields are mandatory');
    }

    
    const newUser= new UserModel({title,price,phone,firstName,lastName,email,address});

    try{
        const resp= await newUser.save();
        res.redirect(201, '/');

        return res.status(201).send({message:"User Created",resp});
        
    }catch(err){
        return res.status(500).send({message:"Error while creating User",err})
    }
}

module.exports={register}