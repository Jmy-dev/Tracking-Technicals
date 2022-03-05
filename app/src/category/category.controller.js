import { Category } from "./category.model";
import { validateCategoryInput } from "../../validation/category";



export const getCategory = async (req , res) => {

    try {
        
        const category = await Category.findById(req.params.id)
        .populate('tasks')
        .populate('technicals')
        .lean()
        .exec()
        
        if(category) {

          return res.status(200).json({category}); 
        }
        return res.status(400).end()
    } catch (e) {
        console.error(e)
        res.status(400).json();
    }
}

export const createCategory = async (req , res) => {
    try {
        const {isValid , errors} = await validateCategoryInput(req.body)

        if(!isValid){
            return res.status(400).json({errors})
        }
        if(req.user.isAdmin) {

            const category = await Category.create(req.body);

            if(category) {
                return res.status(201).json({category})
            }
            return res.status(400).end()
        }

        res.status(401).json({message: "Not authorized"});
        
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }

}

export const updateCategory = async (req , res) => {
    try {

        if(req.user.isAdmin) {

            const updatedCategory = await Category.findByIdAndUpdate({id:req.params.id} , req.body , {new:true})
            .lean()
            .exec()

            if(updateCategory){
                return res.status(201).json({updateCategory})
            }
            return res.status(400).end()
        }
        return res.status(401).json({message:"Not aurhorized"})
        
    } catch (e) {      
        console.error(e)
        res.status(400).end()         
    }
}

export const deleteCategory = async (req ,res) => {
    try {

        if(req.user.isAdmin) {
            const deletedCategory = await Category.findByIdAndRemove({id:req.params.id})

            if(deletedCategory) {
                return res.status(200).json({message:"Category Deleted!"})
            }

            return res.status(400).end()
        }

        return res.status(401).json({message: "Not authorized"})
        
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

export const getAllCategories = async (req ,res) => {
    try {
        const categories = await Category.find({})
        .populate('tasks')
        .populate('technicals')
        .lean()
        .exec()

    if(categories){
        return res.status(200).json({categories})
    }

    res.status(400).end()
        
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
    
}