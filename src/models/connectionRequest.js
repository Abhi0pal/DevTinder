const mongoose=require('mongoose')

const connectionRequestSchema=new mongoose.Schema({
    fromUSerId:{
        type:mongoose.Schema.Types.ObjectId
    },
})