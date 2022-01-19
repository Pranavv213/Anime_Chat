const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/chatting',{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("connection successful !!!! U can start building the app now");
}).catch((err)=>{
    console.log("could not connect")
})
const chatSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
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
const Comment=mongoose.model('Comment',chatSchema);
module.exports =Comment;
