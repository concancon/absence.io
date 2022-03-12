const express = require("express")
const { json } = require("express/lib/response")
const { default: mongoose } = require("mongoose")
const User = require("./models/User")
const app = express()
app.use(express.json())
const router = express.Router()


mongoose.connect("mongodb://127.0.0.1/newtestdb", { useUnifiedTopology: true, useNewUrlParser: true })

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.use("/", router)
app.listen(3000, ()=> console.log("listening on 3000"))


// User login api
router.post('/login', (req, res) => {
  
  // Find user with requested email
  User.findOne({ userName : req.body.userName }, function(err, user) {
      if (user === null) {
          return res.status(400).send({
              message : "User not found."
          });
      }
      else {
          if (user.validPassword(req.body.password)) {
              return res.status(201).send({
                  message : "User Logged In",
              })
          }
          else {
              return res.status(400).send({
                  message : "Wrong Password"
              });
          }
      }
  });
});



router.route("/register").post(function(req,res) {
      

  let newUser = new User();
  newUser.userName= req.body.userName,
  newUser.setPassword(req.body.password)
  


  newUser.save( (err) =>  {
      
      if (err) {
        res.send(err);
      } else {
        res.send(newUser);
      }
    });
   
})