const express =require('express');
const cors = require('cors');

require('dotenv').config();

const app =express();

const cookieParser=require('cookie-parser');
const mongoose =require('mongoose');

const tastroutes=require('./routes/taskroute');
const userrouters=require('./routes/userroute');
app.use(cors()); 
app.use(cookieParser());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("s");
    });


mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log("listening at "+process.env.PORT);
        }); 
    })
    .catch((err)=>{
        console.log(err);
        console.log("DB connection error");
    });

app.use("/api/tasks",tastroutes);
app.use("/api/user",userrouters);