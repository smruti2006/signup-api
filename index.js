const express=require('express')
const app=express()
const connectDB=require('./Model/db')
const userRoutes=require('./Routes/route')
app.use(express.json());
app.use('/api',userRoutes);
connectDB();
app.get('/',(req,res)=>{
    res.send("I am from home page")
})
app.listen(3000,()=>{
    console.log("app is listen at port number 3000")
})