const mongoose= require('mongoose');
const taskModels =require('../models/taskmodel')

//to create task
const createtask= async(req,res)=>{
    const {title,details,type}= req.body
    try{
        const task=await taskModels.create({
            title,
            details,
            type,
            user:req.user.id,
            completedstatus:false
        });
        res.status(200).json(task)
    }catch(e){
        res.status(400).json({erroe:e.message})
    }
};
//to get all task
const gettasks=async(req,res)=>{
    try{
    const tasks=await taskModels.find({user:req.user.id})
    res.status(200).json(tasks);
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}
const getSingleTask=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({message:"task not found"})
    }
    try{
    const singletask=await taskModels.findById({user:req.user.id,_id:id});
    res.status(200).json(singletask);
    }catch(e){
        res.status(400).json({error:e.message})
    }
}
// update task
const updateTask=async (req,res)=>{
    const {id} =req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error:"Invalid task"})
    }
    try{
        const task=await taskModels.findByIdAndUpdate(
            {
                _id: id,
            },
            {
                ...req.body,
            },
    )
    res.status(200).json(task)
    }catch(e){
        res.status(400).json({error:e.message})
    }
}

// delete a task

const deleteTask=async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message:"invalid task"})
    }
    try{
    const task= await taskModels.findByIdAndDelete(id)
    res.status(200).json(task)
    }catch(e)
    {
        res.status(400).json({error:e.message})
    }
}
const updateCurrentstatus= async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error:"Invalid task"})
    }
    try{
        const task=await taskModels.findOneAndUpdate(
            {
                _id: id,
            },
            {
                ...req.body,
            },
    )
    res.status(200).json(task)
    }catch(e){
        res.status(400).json({error:e.message})
    }
}

module.exports={createtask,gettasks,getSingleTask,updateTask,deleteTask,updateCurrentstatus}