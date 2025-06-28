const {Schema,model}=require('mongoose')
const mySchema=new Schema(
    {
        Name:{
            type:String,
            required:true
        },
        Email:{
            type:String,
            required:true,
            unique:true
        },
        Password:{
            type:String,
            required:true,
        }
    }
)
const taskmodel=model('Users',mySchema)
module.exports=taskmodel;