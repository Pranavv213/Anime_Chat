const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/chatting',{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("connection successful !!!! U can start building the app now");
}).catch((err)=>{
    console.log("could not connect")
})
const chatSchema=new mongoose.Schema({
    comment:[{
        type:String,
        required:true,
    }],
    sender:{
        type:String,
        required:true,
    },
    receiver:{
        type:String,
        required:true,
    }
    // send:[{
    //     id:String,
    //     message:String
    // }],
    // receive:[{
    //     id:String,
    //     message:String
    // }]
})
const Comment2=mongoose.model('Comment2',chatSchema);
module.exports =Comment2;
