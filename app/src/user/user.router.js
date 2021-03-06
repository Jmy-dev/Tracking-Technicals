import {Router} from 'express';

import {me , getUser , getAllTechnicals , updateUser, deleteUser , getTechnicalsByCategory } from './user.controller'


const router = Router();


//api/user/technicals
router.get('/technicals' , getAllTechnicals)

// api/user/category /:name

//router.get('/category/:name' ,getTechnicalsByCategory )


//api/user/me


router.get('/me' , me);


// api/user/:id

router
.route('/:id')
.get(getUser)
.put(updateUser)
.delete(deleteUser)

export default router;