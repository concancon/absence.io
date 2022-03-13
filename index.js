const express = require("express")
const jwt = require('jsonwebtoken');
const { json } = require("express/lib/response")
const { default: mongoose } = require("mongoose")
const User = require("./models/User")
const app = express()
app.use(express.json())
const router = express.Router()
const bcrypt= require("bcrypt")


async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
 }
  
 async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
 }


mongoose.connect("mongodb://127.0.0.1/newtestdb", { useUnifiedTopology: true, useNewUrlParser: true })

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.use("/", router)
app.listen(3000, ()=> console.log("listening on 3000"))


// User login api
router.post('/login', async function(req, res, next) {
  
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user) return next(new Error('Username does not exist'));
    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) return next(new Error('Password is not correct'))
    const accessToken = jwt.sign({ userId: user._id }, "ThisIsAnIncredibleSecret", {
     expiresIn: "1d"
    });
    await User.findByIdAndUpdate(user._id, { accessToken })
    res.status(200).json({
     data: { userName: user.email, role: user.role },
     accessToken
    })
   } catch (error) {
    next(error);
   }
  

});



router.route("/register").post( async function(req,res, next) {
  try{

    const {userName, password, role} = req.body;
    const hashedPassword = await hashPassword(password)
    const newUser = new User({userName, password: hashedPassword, role: role || "guest"})
    const accessToken = jwt.sign({userId: newUser._id}, "ThisIsAnIncredibleSecret", {
      expiresIn: "1d"
    })
    newUser.accessToken = accessToken

    await newUser.save()
    res.json({data: newUser, password: newUser.password,
    accessToken} 
    )} catch(error){
      next(error)
    }
   
})