const express = require("express")
const { json } = require("express/lib/response")
const { default: mongoose } = require("mongoose")
const app = express()
app.use(express.json())
const user = require('./models/User')
const router = express.Router()


mongoose.connect("mongodb://127.0.0.1/testdb", { useUnifiedTopology: true, useNewUrlParser: true })

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.use("/", router)
app.listen(3000, ()=> console.log("listening on 3000"))


router.route("/register").post(function(req,res) {
      
  user.create(req.body, function(err, result) {
      
      
      
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
   
})