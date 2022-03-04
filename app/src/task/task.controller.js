import {Task} from './task.model'



export const createTask = async (req , res) => {
    const task = await Task.create(req.body)
    if(task) {
        return res.status(201).json({data: task})
    }

    res.status(400).end();

}

export const updateTask = async (req , res) => {
    const updatedTask = await Task.findByIdAndUpdate({_id: req.params.id} , req.body , {new:true})
    .lean()
    .exec()

    if(updatedTask) {
        return res.status(201).json({data:updatedTask})
    }

    res.status(400).end();

}

export const deleteTask = async (req , res) => {

    const deletedTask = await Task.findByIdAndDelete({_id: req.params.id})
    .lean()
    .exec()

    if(deletedTask) {
        return res.status(200).json({"message" : "deleted!"})
    }
    
    res.status(400).end()
}

export const getTask = async (req , res) =>{
    const task = await Task.findById({id: req.params.id})
    .lean()
    .exec()

    if(task){
        return res.status(200).json({task})
    }

    res.status(400).end()

}


export const getAllTasks = async (req ,res) => {
    const tasks = await Task.find({})
    .lean()
    .exec()

    if(tasks) {
        return res.status(200).json({tasks});
    }

    res.status(400).json()
}