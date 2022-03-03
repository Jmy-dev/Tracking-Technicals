import {User} from './user.model';

import { verifyToken } from '../../utils/auth';

export const me = (req , res) =>{
    res.status(200).json({data: req.user})
}

export const getUser = async (req , res) =>{
    try {
        const user = await User 
        .findOne({_id : req.params.id})
        .lean()
        .exec()

        if (!user){
            return res.status(400).end();
        }
        return res.status(200).json({data: user})
        
    } catch (e) {
        console.error(e) 
        res.status(400).end();
    }
}

export const updateUser = async (req , res) =>{
    try {
        //OWNER
        const ownerId = req.params.id;
        //EXECUTER 
        const executer = req.user.id;

        
     if(req.user.isAdmin  || (executer === ownerId)) {
        
        const updatedUser = await User.findOneAndUpdate({id:ownerId} , req.body , {new: true})
        .lean()
        .exec()

        if(!updatedUser) {
            return res.status(400).end();
        }

        return res.status(201).json({data: updatedUser})

     }

     return res.status(401).json({error: "You are not authorized to perform such an action!"});
    
       
    }
    catch(e) {
        console.log(e);
        res.status(400).json({error : e})
        .end();
    }
}


export const deleteUser = async (req , res) => {
    try {

        if(req.user.isAdmin) {
            const deletedUser = await User.findOneAndRemove({
                _id:req.params.id
            })

            if(!deletedUser){
                 return res.status(400).end();
            }
            return res.status(200).json({data: deletedUser})
        }
        else {
           return res.status(401).json({errors: "You aren't authorized to perform this action"})
        }
        
    } catch (e) {
        res.status(400).json({error :e}).end()
    }
}

export const getAllTechnicals = async (req , res) => {
    try {
        const allTechnicals = await User.find({isAdmin: false})
        .lean()
        .exec()

        if(!allTechnicals) {
            return res.status(400).json({error: "There is no technicals! "});
        }
        
        return res.status(200).json({data: allTechnicals});

    } catch (e) {
        res.status(400).json({error : e});
    }

}

































/* 
let token = req.headers.authorization.split('Bearer ')[1];  

        if(!token){
            return res.status(400).end();
        }
            const payload = await verifyToken(token);
            console.log("payload" ,payload.id)
    
            const tokenUser = await User.findById(payload.id)
            .select('-password')
            .lean()
            .exec()
        console.log(tokenUser)

        const requestedUser = await User.findById(req.params.id)
        .lean()
        .exec()

        console.log(requestedUser);

        if(!requestedUser){
            return res.status(400).end();
        }
        console.log("Here")
        console.log(requestedUser.id , tokenUser.id)

        if(requestedUser.isAdmin || (req.user.id === tokenUser.id)) {
           const updatedUser = await User.updateOne(requestedUser.id , req.body , {new: true})
           .lean()
           .exec()
           if (!updatedUser){
            return res.status(400).end()
           }
        res.status(201).json({data : updatedUser});
        }
        else {
            res.status(400).json({error: "You are not authorized to perform this action!"})
        }

    

*/