const express = require("express")
const router = express()
const mongoose = require("mongoose")
const templatepath = require('app-root-path').resolve("/template/views")

//mongoose
const todoSchema = new mongoose.Schema({
    name : String,
})
const todos = mongoose.model("todos",todoSchema)
router.set("views",templatepath)

router.get("/",async (req,res)=>{
    const task = await todos.find({})
    res.render("index",{task})
})
router.post("/",async(req,res)=>{
    const {task} = req.body
    const newtask = new todos({
        name : task
    })
    await newtask.save()
    res.redirect("/")
})
router.get("/todo/:id",async(req,res)=>{
    const {id} = req.params
    await todos.deleteMany({_id: id}).then((
        res.redirect("/")
    )).catch((e)=>{
        console.log(e)
    })
})
router.get("/router",(req,res)=>{
    res.send("hello to router")
})

module.exports = router