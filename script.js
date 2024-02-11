import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { title } from "process";

//User Operations
class Post{
    constructor(title,content){
        this.title = title;
        this.content = content;
    }
}

const blogs = [];

//Server Body
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.listen(port,()=>{console.log("Server is started from port "+port);});
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

//HTTP Requests
app.get("/",(req,res)=>{
    if(blogs.length>0)res.render("home.ejs",{blogList: blogs});
    else res.render("home.ejs");
});
app.get("/post",(req,res)=>{
    res.render("post.ejs");
});
app.get("/contact",(req,res)=>{
    res.render("contact.ejs");
});


app.post("/post",(req,res)=>{
    const newPost = new Post(req.body["title"],req.body["content"]);
    blogs.push(newPost);
    res.redirect("/");
});