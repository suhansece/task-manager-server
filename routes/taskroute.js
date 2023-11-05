const express=require('express');
const { createtask, gettasks, getSingleTask, updateTask, deleteTask } = require('../controlles/taskcontrole');
const {protect}=require('../middleware/authMiddleWare');

const router=express.Router();

router.post('/',protect,createtask);
router.get('/',protect,gettasks);
router.get('/:id',protect,getSingleTask);
router.patch('/:id',protect,updateTask);
router.delete('/:id',protect,deleteTask);


module.exports=router;