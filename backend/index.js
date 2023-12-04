const express = require("express")
const app = express()
const cors = require("cors")
const mysql = require('mysql')
app.use(express.json())
app.use(cors())

const mydb = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"mgp"
})

app.post("/add",(req,res)=>{
    console.log("insidse",req.body)
    const date = new Date(req.body.date)
    const q = "insert into mgp_details(serialNumber,item,quantity,toP,fromP,dates,cleared) values(?,?,?,?,?,?,?)";
    mydb.query(q,[req.body.serialNumber,req.body.item,req.body.quantity,req.body.to,req.body.from,req.body.date,req.body.cleared],(err,data)=>{
        if(err) res.send({message:err})
        else {
         res.send({message:"Added Successfully"})
        }

    })
})


app.get("/modifies/:chosenVal",(req,res)=>{
    console.log("insidse for modification",req.params.chosenVal)
    if(req.params.chosenVal == 'all'){
        const q = "select * from mgp_details order by dates desc";
        mydb.query(q,(err,data)=>{
            if(err) res.send({err:err})
            else if(data.length>0){
                res.send(JSON.stringify(data))
            }
            else {
                
             res.send({message:"No detils to modify"})
            }
    
        })
    }
    else{
        console.log("insside backend",req.params.chosenVal)
        const q = "select * from mgp_details where cleared = ? order by dates desc";
        mydb.query(q,[req.params.chosenVal],(err,data)=>{
            if(err) res.send({message:err})
            else if(data.length>0){
                res.send(JSON.stringify(data))
            }
            else {
                
             res.send({message:"No details to fetch"})
            }
    
        })
    }


})


app.get("/modify/:id",(req,res)=>{
    console.log("insides",req.params.id)
    const q = "select * from mgp_details where id = ? order by dates desc" ;
    mydb.query(q,[req.params.id],(err,data)=>{
        if(err) res.send({err:err})
        else if(data.length>0){ 
            res.send(JSON.stringify(data))
        }
        else {

         res.send({message:"No details to modify"})
        }

    })
})

app.get("/modifies/date/:getSearchVal",(req,res)=>{
    console.log("inside date",req.params.getSearchVal)
    const q = "select * from mgp_details where dates = ?" ;
    mydb.query(q,[req.params.getSearchVal],(err,data)=>{

         if(data.length>0){ 
            res.send(JSON.stringify(data))
        }
        else {

         res.send({message:"No details to fetch"})
        }

    })
})


app.get("/searchBySerialNum/:searchBySerialNum",(req,res)=>{
    console.log("inside the search",req.params.searchBySerialNum)
    const q = "select * from mgp_details where serialNumber = ?" ;
    mydb.query(q,[req.params.searchBySerialNum],(err,data)=>{
     if(data.length>0){ 
            res.send(JSON.stringify(data))
        }
    else{
        res.send({message:"No details to fetch"})
    }


    })
})

app.get("/history",(req,res)=>{
    console.log("inside history")
    const condition = 'yes'
    const q = "select * from mgp_details where cleared = ? order by dates desc";
    mydb.query(q,[condition],(err,data)=>{
        if(err) res.send({message:err})
        else if(data.length>0){ 
            console.log(data)
            res.send(JSON.stringify(data))
        }
        else {

         res.send({message:"No details to fetch"})
        }

    })
})
app.delete("/delete/:id",(req,res)=>{
    console.log("inside dle",req.params.id)
    const deleteq = "delete from mgp_details where id = ?"
    mydb.query(deleteq,[req.params.id],(err,data)=>{
        if(err){
         res.send({error:"err"})
        }
        else{
        res.send({message:"Deleted successfully"})

        }
    })
})



app.post("/updates",(req,res)=>{
     console.log("inside update function",req.body)

     const beforeq = "select * from mgp_details where id=?"
     mydb.query(beforeq , [req.body.id],(err,data)=>{
        if(data.length>0)
          if(data.cleared == req.body.cleared)
          res.send({message:"Nothing to update"})
        else

     

{
     const q = "update mgp_details set serialNumber = ?,item = ?,quantity = ?,toP = ?,fromP=?,dates=?,cleared=? where id = ?"
     mydb.query(q,[req.body.serialNumber,req.body.item,req.body.quantity,req.body.toP,req.body.fromP,req.body.dates,req.body.cleared,req.body.id],(err,data)=>{
        if(err) res.send({message:err})
        else {
         res.send({message:"Updated successfully"})
        }

    })
}
})


    })



app.listen(8700,()=>{
    console.log("backend connected")
})

/*{
    "serialNumber":"bcu11",
    "item":"cu",
    "quantity":1,
    "to":"deepak",
    "from":"em",
    "dates":"10-02-1222",
    "cleared":"no"
    }*/