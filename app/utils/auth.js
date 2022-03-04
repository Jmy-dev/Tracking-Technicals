import jwt from 'jsonwebtoken'
import {config} from '../config/dev' 
import { User } from '../src/user/user.model'
import { validateLoginInput } from '../validation/login'
import { validateRegisterInput } from '../validation/register'



export const newToken = user => {
    return jwt.sign({id: user.id} , config.secrets.jwtSecret , {
        expiresIn : config.secrets.jwtExp
    })
}


export const verifyToken = token => {
   return new Promise ( (resolve , reject) => {
        jwt.verify(token , config.secrets.jwtSecret , (err , payload) => {
            if(err) {
                return reject(err);
            }

            resolve(payload)
        })
    })
}


export const signup = async (req , res) => {

    try {

        const {errors , isValid} = validateRegisterInput(req.body) ; 

        if(!isValid) {
            return res.status(400).json({errors})
        }

        if(!req.body.name || !req.body.email || !req.body.password){
            return res.status(400).send({message:"email , name and password are required!"})
        }

        const existEmail= await User.findOne({email: req.body.email})
        .lean()
        .exec()

        const existName = await User.findOne({name: req.body.name})
        .lean()
        .exec()

        if(existEmail || existName){
            return res.status(400).json({error: "Email and Name must be unique!"})
        }

       const user = await User.create(req.body);

      return  res.status(201).send({user})

    } catch (e) {
    console.error(e);
    return res.status(400).end()
} 

}

export const signin = async (req , res) => {
    
    const {errors , isValid} = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json({errors})
    }
    
    if( !req.body.email || !req.body.password){
         return res.status(400).send({message:"email and password are required!"})
    }

    const user = await User.findOne({email:req.body.email})
    .exec()
    

    if(!user) {
         return res.status(400).json({error: "You have to register first in order to signin"})
    }

    try {
        console.log(user)

        const match = await user.checkPassword(req.body.password);


        if (!match) {
            return res.status(401).send({message: "Incorrect Password!"})
        }

        const token = newToken(user);

        if(!token) {
            return res.status(400).end();
        }

        return res.status(201).json({data:token})



        
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }

}

export const protect = async (req , res , next) => {

    if(!req.headers.authorization) {
        return res.status(401).json({error:"Not authorized!"});
    }

    let token = req.headers.authorization.split('Bearer ')[1];  
    
    if(!token){
        return res.status(400).end();
    }
    try {
        const payload = await verifyToken(token);

        if(!payload) {
            res.redirect('/signin');
            
            return res.status(401).json({error:"Not authorized"});
        }

        const user = await User.findById(payload.id)
        .select('-password')
        .lean()
        .exec()

        req.user = user;
        next()
        
       
     
    } catch (e) {
        console.error(e);
        res.redirect('/');
     
 }
 

}