const express=require('express');
const mongoose=require('mongoose');
const Comment = require('./models/schema')
const Comment2 = require('./models/schema2')
const methodOverride=require('method-override')
const {v4:uuid}=require('uuid')
const app=express();
const ejs=require('ejs');
const { urlencoded } = require('express');


app.use(express.static('public'))
function delete_db()
{
    Comment.remove({}).then(()=>{
        console.log("db cleared successfully")
        res.send("db cleared successfully")
    }).catch((err)=>{console.log("error cleaning db")})
}

app.get('/db_find',(req,res)=>{
    Comment.find({}).then((data)=>{
        console.log(data)
        res.send(data)
    }).catch((err)=>{console.log("error")})
})
app.get('/db2_find',(req,res)=>{
    Comment2.find({}).then((data)=>{
        console.log(data)
        res.send(data)
    }).catch((err)=>{console.log("error")})
})


app.use(express.static('views'))
app.use(express.urlencoded({extended:true}))
app.set('view engine',ejs);

app.use(methodOverride('_method'))
app.patch('/comments/:id',async (req,res)=>{
   
    Comment.updateMany({_id:req.params.id.substr(0,24)},{$set:{comment:req.body.comment}}).then(()=>{
        console.log(req.body.comment)
    res.redirect('/comments')
    }).catch((err)=>{
        console.log("an error occured")
    })
  
   
   
})
app.get('/home',(req,res)=>{
    res.render('home.ejs')
})
app.get('/chat_search/:username',(req,res)=>{
    const username=req.params.username
    res.render('chats.ejs',{username})
})
//guygyngyntg67ty
// app.get('/searched/:username',(req,res)=>{
//     const p1=req.query.username;
//     const p2=req.params.username;
//     Comment.find({username: p1}).then((data1)=>{
//         if(data1.length==0)
//         {
//             res.send("not found")
//         }
//         Comment.find({username: p2}).then((data2)=>{
            
//             // res.send(data1+"   "+data2)
//             Comment.find({username: p2}).then((data2)=>{
            
//                 Comment2.find({sender:p2,receiver:p1}).then((data3)=>{
//                    console.log(data3)
//                    const arr=[data3,p1,p2]
//                    //console.log(arr)
//                     res.render('output.ejs',{arr})
//                    // res.send("found")
//                 }).catch((err)=>{
//                     res.send(err)
//                 })
//             }).catch((err)=>{
//                 res.send(err)
//             })
            
//         }).catch((err)=>{
//             res.send(err)
//         })
        
//     }).catch((err)=>{
//         res.send("not found")
//     })
// })

app.get('/searched/:username',(req,res)=>{
    const p1=req.query.username;
    const p2=req.params.username;
    Comment.find({username: p1}).then((data1)=>{
        if(data1.length==0)
        {
            res.send("not found")
        }
        Comment.find({username: p2}).then((data2)=>{
            
            // res.send(data1+"   "+data2)
            Comment.find({username: p2}).then((data2)=>{
            
                Comment2.find({$or:[{sender:p2,receiver:p1},{sender:p1,receiver:p2}]}).then((data3)=>{
                   console.log(data3)
                   const arr=[data3,p1,p2]
                   //console.log(arr)
                    res.render('output.ejs',{arr})
                   // res.send("found")
                }).catch((err)=>{
                    res.send(err)
                })
            }).catch((err)=>{
                res.send(err)
            })
            
        }).catch((err)=>{
            res.send(err)
        })
        
    }).catch((err)=>{
        res.send("not found")
    })
})
// app.post('/send/:p1/:p2',(req,res)=>{
//     const p1 = req.params.p1;
//     const p2 = req.params.p2;
//     const message = req.body.messege;
//     Comment2.insertMany({sender:p2,receiver:p1,comment:message}).then(()=>{
//         console.log("messege sent");
//         //res.render('output.ejs')
//     }).catch(err=>{console.log(err)})
// })
app.post('/send/:p1/:p2',(req,res)=>{
    const p1 = req.params.p1;
    const p2 = req.params.p2;
    const message = req.body.messege;
    Comment2.insertMany({sender:p2,receiver:p1,comment:message}).then(()=>{
        console.log("messege sent");
        res.redirect(`/searched/${p1}?username=${p2}`)
    }).catch(err=>{console.log(err)})
})
app.get('/signup_form',(req,res)=>{
    res.render('signup.ejs')
})
app.get('/login_form',(req,res)=>{
    res.render('login.ejs')
})
app.post('/signup',(req,res)=>{
    console.log(req.body);
    const data=req.body;
    Comment.find({username:data.username}).then((data)=>{
       if(data.length!=0){
           res.send("username already taken . Try with some other username")
       }
        
    })
    Comment.insertMany({username:data.username,password:data.password}).then((data)=>{
        //res.send(data);
        res.redirect('/home')
    }).catch((err)=>{
        res.send("error signing up")
    })
    
})


app.post('/login',(req,res)=>{
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
  
    Comment.find({username:username, password:password}).then((data)=>{
        if(data.length==0){
            res.send("wrong username or password")
        }
        console.log(data.length);
        console.log("logged in successfully")
        res.redirect(`/chat_search/${username}`)
    }).catch((err)=>{console.log("error")})
})

app.listen(5000,()=>{
    console.log("listening to port number 5000")
})