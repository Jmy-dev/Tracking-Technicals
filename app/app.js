import express from 'express'
import mongoose from 'mongoose'
import {config} from './config/dev'
import {json , urlencoded} from 'body-parser'
import userRouter from './src/user/user.router'
import { signin , signup , protect } from './utils/auth'

// app setup
const app = express();
const PORT = process.env.PORT || 3000 ;


//body-parser setup

app.use(urlencoded({extended:true}))
app.use(json())


//routes
app.get('/' , (req , res) => {
    res.send("Hello")
})

app.post('/signup' , signup)
app.post('/signin' , signin)
app.use('/api' , protect)
app.use('/api/user' , userRouter)


mongoose.connect(config.secrets.dbConnection , {useNewUrlParser:true , useUnifiedTopology: true })
.then( () => {
    console.log("Mongodb is connected!!")
    app.listen(PORT , () => {
        console.log(` server is runing on port ${PORT}`)
    })
})
.catch( (e) => console.log(e))
