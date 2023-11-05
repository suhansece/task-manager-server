const mongoose = require('mongoose');
const Schema =mongoose.Schema;
const userModels=require('./usermodel');

const taskSchema = new Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:userModels,
            require:true,
        },
        title:{
            type :String,
            require:true,
        },
        type:{
            type:String,
            require:true,
        },
        details:{
            type:String,
            require:true,
        },
        currentstatus:{
            type:String,
        },
        completedstatus:{
            type:Boolean,
            require:true
        },


    },
    {timestamps:true}
);

module.exports=mongoose.model("task",taskSchema);