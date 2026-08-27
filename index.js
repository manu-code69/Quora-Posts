
//om
const express = require("express");
const path = require("path");
var methodOverride = require('method-override')

const app = express();

const {v4 : uuidv4} = require('uuid');
uuidv4();

let port = 8080;

app.listen(8080,()=>{
    console.log( "listening requests ");
});

app.use(methodOverride('_method'))      // html support nahi karta 

app.use(express.urlencoded({ extended : true}));        // HtML se ana wale data read

app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname , "public")));

// bhai abhi db connect nahi kiya to hardcode kar raha hu

let posts = [ 
    {
        id : uuidv4(),
        username : "mohak",
        content : "Work Hard"
},
  {
        id : uuidv4(),
        username : "dev",
        content : " karnal is Best"
},
  {
        id : uuidv4() ,
        username : "Athrav",
        content : "FF khele"
},
];

app.listen(port , ()=>{
    console.log("on");
})

app.get("/" , (req,res) =>{
    res.render("mainpage.ejs")
})

app.get("/posts" , (req,res)=>{  
    res.render("posts.ejs" , {posts})
} );

app.get("/posts/new" , (req,res)=>{
    res.render("new.ejs");
})

app.post("/posts" , (req,res)=>{
    
    let username  = req.body.username;
    let content = req.body.content
    let id = uuidv4();
    posts.push({id,username,content,})
    
    res.redirect("/posts");
    
})

app.patch("/posts/:id" , (req,res)=>{
    let {id} = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content = newcontent;

   // res.send("patch req work")
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;

    let post = posts.find((p) => id === p.id);

    if (!post) {
        return res.send("Invalid ID");
    }

    res.render("edit.ejs", { post });
});

app.get("/posts/:id" , (req,res) =>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    console.log(post);;

    if(post)
    res.render("show.ejs",{post});
    else
        res.send("Invalid ID");
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params ;

   posts = posts.filter((p) => p.id !== id);

   res.redirect("/posts");
})
