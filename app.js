const express = require("express");
const uuid = require("uuid").v4;
const fs = require("fs");
const app = express();

//register view engine
app.set("view engine", "ejs");

//views is the default folder where ejs looks for the views but
//you can set the folder of your own choice for views like below.
//app.set("views", "MyViews");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const brands = [ 
    {id: uuid(), name:"Alto", make: "Suzuki", model: "2010", variant:"vxr"},
    {id: uuid(), name:"WagonR", make: "Suzuki", model: "2012", variant:"vxr"},
    {id: uuid(), name:"Cultus", make: "Suzuki", model: "2014", variant:"vxl"},
    {id: uuid(), name:"City", make: "Honda", model: "2010", variant:"idsi"},
    {id: uuid(), name:"Corolla", make: "Toyota", model: "2016", variant:"GLI"},
    {id: uuid(), name:"Civic", make: "Honda", model: "2018", variant:"Turbo"}
];

app.get("/", (req, res) => {
    //res.send("<h1>When the request comes, please serve.the client</h1>");
    //res.sendFile("./index.html", {root: __dirname});
    //const books = ["Begining with Node.Js", "Advance Type Script", "AspNetCore MVC and Razor Pages"];
    
    res.render("index", {title :"Public Brands", brands});
});

app.get("/about", (req, res)=>{
    res.render("about", {title: "About Brands"});
});

app.get("/vehicles", (req, res)=>{
    res.render("brands", {title : "Public Brands" } );
});

app.get("/vehicles/:id", (req, res)=> {
    const id = req.params.id;
    let brand = brands.find(b => b.id === id);
    
    if(brand){
        res.render("details", {title: "Brand Detail", brand});
    }
    else{
        res.status(404).render("404", {title: "404", message:"Record couln't be found."});
    }
});

app.post("/vehicles", (req, res)=>{
    const brand = req.body;
    console.log(brand);

    if(brand.name.length > 3 && brand.make.length > 3){
        brand.id = uuid();
        brands.push(brand);
        console.log("brand added successfully.");
        res.redirect("/");
    }
    else{
        res.status(404).render("404", {title: "404", message:"Error while creating a new record."});
    }
});

app.delete("/vehicles/:id", (req, res)=>{
    const brand = brands.find(b => b.id === req.params.id);
    console.log(brand);
    if(brand){   
        const result = brands.splice(brands.indexOf(brand), 1);
        console.log("Brand deleted successfully.")
        res.send({result, redirect: true});
    }
    else{
        res.status(404).render("404", {title: "404", message:"Record couldn't be found."});
    }
});

app.use((req, res)=>{
    res.status(404).render("404", {title : "404"})
});

app.listen(4500, ()=>{
    console.log("Server is listening on port: 4500");
});
