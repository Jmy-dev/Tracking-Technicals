import {Router} from 'express'
import {createCategory , getAllCategories , getCategory , updateCategory , deleteCategory} from './category.controller'

const router = Router();



//api/category
// get getall 
//post create

router
.route('/')
.get(getAllCategories)
.post(createCategory)



// api/category/:id

//get one
//put updateone
//delete  deleteOne

router
.route('/:id')
.get(getCategory)
.put(updateCategory)
.delete(deleteCategory)



export  default router;