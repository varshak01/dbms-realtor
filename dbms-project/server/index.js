const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT || 9002
// const router=express.Router();
require('dotenv').config()
const auth=require
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

const uri=process.env.ATLAS_URI
mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology: true}
); 
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("DB connected successfully")
})

const userSchema = new mongoose.Schema({
    fname: String,
    lname:String,
    email: String,
    phNumber:String,
    password: String,
    houseRent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'HouseRent'
    }],
    houseSale:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'HouseSale'
    }],
    ownerPG:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'PG'
    }],
    ownerRequests:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ReqDetails'
    }]
})

//schema and model
const User = new mongoose.model("User", userSchema)
const houseRentSchema=new mongoose.Schema({
    address:String,
    area:Number,
    city:String,
    cpm:Number,
    nameOfHouse:String,
    pincode:String,
    services:String,
    state:String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   }
})
const HouseRent=new mongoose.model("HouseRent",houseRentSchema)
const houseSaleSchema=new mongoose.Schema({
    address:String,
    area:Number,
    buArea:Number,
    city:String,
    cpSqFeet:Number,
    nameOfHouse:String,
    pincode:String,
    specs:String,
    state:String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   }
})
const HouseSale=new mongoose.model("HouseSale",houseSaleSchema)
const PGSchema=new mongoose.Schema({
    address:String,
    city:String,
    costPM:Number,
    nameOfHouse:String,
    peoplePerRoom:Number,
    pincode:String,
    services:String,
    state:String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   }
})
const PG=new mongoose.model("PG",PGSchema)
const RequestSchema=new mongoose.Schema({
    conditions:String,
    location:String,
    reqType:String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   }
})
const ReqDetails=new mongoose.model("ReqDetails",RequestSchema)

//Routes
const uniUser={}
app.post("/login", (req,res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password !== user.password ) {
                res.send({ message: "Password didn't match"})
            } else {
                res.send({message: "Login Successful", user: user})
            }
        } else {    
            res.send({message: "User not registered"})
        }
    })
})

app.post("/register", (req, res)=> {
    const { fname,lname, email,phNumber, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                fname,
                lname,
                email,
                phNumber,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 
// router.route('/houses').get((req,res)=>{
//     HouseRent.find()
//         .then(house=>res.json(house))
//         .catch(err=>res.send({message:"error!"}))
//     })

app.post("/houseRent/add", async(req, res)=> {
    try
    {const newHouse = new HouseRent(req.body)
        console.log('newhouse')
        console.log(newHouse)
        await newHouse.save()
        let newUser=await User.findOne({_id:newHouse.user})
        console.log(newUser)
        newUser.houseRent.push(newHouse);
        await newUser.save();
        // User.findOne(newHouse.user, function (err, docs) {
        //     if (err){
        //         res.send({message:'user prob'})
        //     }
        //     else{
        //         console.log("Result : ", docs);
        //     }
        // });
        res.status(200).send({message:"successfully inserted new house"})}
    catch (err) {
      res.status(400).json({success: false, message:err.message})
   }

}
)
app.post("/houseSale/add", async(req, res)=> {
    try
    {const newHouse = new HouseSale(req.body)
        console.log('newhouse')
        console.log(newHouse)
        await newHouse.save()
        let newUser=await User.findOne({_id:newHouse.user})
        console.log(newUser)
        newUser.houseSale.push(newHouse);
        await newUser.save();
        res.status(200).send({message:"successfully inserted new house"})}
    catch (err) {
      res.status(400).json({success: false, message:err.message})
   }

}
)
app.post("/pgData/add", async(req, res)=> {
    try
    {const newPg = new PG(req.body)
        console.log('newPg')
        console.log(newPg)
        await newPg.save()
        let newUser=await User.findOne({_id:newPg.user})
        console.log(newUser)
        newUser.ownerPG.push(newPg);
        await newUser.save();
        res.status(200).send({message:"successfully inserted new pg"})}
    catch (err) {
      res.status(400).json({success: false, message:err.message})
   }

}
)
app.post("/requestsData/add", async(req, res)=> {
    try
    {const newReq = new ReqDetails(req.body)
        console.log('newReq')
        console.log(newReq)
        await newReq.save()
        let newUser=await User.findOne({_id:newReq.user})
        console.log(newUser)
        newUser.ownerRequests.push(newReq);
        await newUser.save();
        // User.findOne(newHouse.user, function (err, docs) {
        //     if (err){
        //         res.send({message:'user prob'})
        //     }
        //     else{
        //         console.log("Result : ", docs);
        //     }
        // });
        res.status(200).send({message:"successfully inserted new request"})}
    catch (err) {
      res.status(400).json({success: false, message:err.message})
   }

}
)
app.get('/dashboard',async(req,res)=>{
    User.find().then(users=>res.json(users))
    .catch(err=>res.status(400).json('error'+err))
})
app.get('/houses/rent',async(req,res)=>{
    try {
      const data = await User.find().populate({path: 'houseRent'});
      res.status(200).json({success: true, data});
   } catch (err) {
      res.status(400).json({success: false, message:err.message});
   }
    
})
app.get('/houses',async(req,res)=>{
    try {
      const data = await User.find().populate({path: 'houseSale'});
      res.status(200).json({success: true, data});
   } catch (err) {
      res.status(400).json({success: false, message:err.message});
   }
    
})
app.get('/pgs',async(req,res)=>{
    try {
      const data = await User.find().populate({path: 'ownerPG'});
      res.status(200).json({success: true, data});
   } catch (err) {
      res.status(400).json({success: false, message:err.message});
   }
    
})
app.get('/requests',async(req,res)=>{
    try {
      const data = await User.find().populate({path: 'ownerRequests'});
      res.status(200).json({success: true, data});
   } catch (err) {
      res.status(400).json({success: false, message:err.message});
   }
    
})
app.delete('/requestsDelete/:id',(req,res)=>{
    console.log('yes 1CALLED')
    console.log(req.params.id)
    ReqDetails.findByIdAndDelete(req.params.id)
    .then(()=>res.json('req deleted'))
    .catch(err => res.status(400).json("error :"+err));


})
app.delete('/saleDelete/:id',(req,res)=>{
    console.log('yes 2CALLED')
    console.log(req.params.id)
    HouseSale.findByIdAndDelete(req.params.id)
    .then(()=>res.json('req deleted'))
    .catch(err => res.status(400).json("error :"+err));


})

app.delete('/rentDelete/:id',async(req,res)=>{
    console.log('yes CALLED')
    console.log(req.params.id)
    HouseRent.findByIdAndDelete(req.params.id)
    .then(()=>res.json('req deleted'))
    .catch(err => res.status(400).json("error :"+err));
//     try {
//     await HouseRent.deleteOne({
//       _id: req.params.id,
//     });

//     return res.status(200).json('user deleted');
//   } catch (error) {
//     console.log(`error`, error);
//     return next(error);
//   }


})
app.delete('/pgsDelete/:id',(req,res)=>{
    console.log('yes4 CALLED')
    console.log(req.params.id)
    PG.findByIdAndDelete(req.params.id)
    .then(()=>res.json('req deleted'))
    .catch(err => res.status(400).json("error :"+err));


})

app.listen(9002,() => {
    console.log("Started at port 9002")
})

