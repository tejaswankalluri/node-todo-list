const express = require("express")
const app = express()
const path = require("path")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")
const port = process.env.PORT||8000
const templatepath = path.join(__dirname+"/template/views")

require("dotenv").config()
app.use(express.static("public"))

// express middleware
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.set("view engine","hbs")
app.set("views",templatepath)

// mongo connect
console.log("connecting to Database")
mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
}).then(
    ()=> {console.log("connected to Database!")},
    (err)=>{console.log(err)}
)

app.use("/", require("./routes/routes"))
app.listen(port,()=>{
    console.log(`server is up and running on http://localhost:${port}`);
})