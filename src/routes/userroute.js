const express=require('express');
const router=express.Router();
const {protect}=require('../middleware/authMiddleWare');

const {createUser,loginUser, getMe}=require('../controlles/usercontrole');

router.post('/register',createUser);
router.post('/login',loginUser);
router.get('/me',protect,getMe);

module.exports=router;