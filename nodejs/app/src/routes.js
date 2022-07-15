let express = require('express');
const jwt=require('jsonwebtoken');
const multer= require('multer');  
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const upload = multer({ storage: multer.memoryStorage()});

let route=express.Router();

const UserController =require('./controllers/UserController');

const Users=require('./models/Users');

const MovieController =require('./controllers/MovieController');
const { verify } = require('jsonwebtoken');

//User Routes
route.get("/getdata",UserController.getdata);
route.get("/getUsers",UserController.list);
route.get("/getUser/:useremail",UserController.listOne);
route.get("/createUser",UserController.create);
route.get("/updateUser",UserController.update);
route.get("/deleteUser",UserController.delete);

//Movie Routes
route.get("/getMovies/:title",[verifyToken],MovieController.list);
route.get("/getMovies",[verifyToken],MovieController.list);
route.post("/createMovie",[verifyToken,jsonParser],MovieController.create);
route.put("/updateMovie/:idmovie",[verifyToken,jsonParser],MovieController.update);
route.post("/deleteMovie",[verifyToken,jsonParser],MovieController.delete);
route.post("/uploadMovies",[upload.any()], MovieController.uploads);
//AUTH Routes
route.post('/login',verifyUserPass,async (req, res) => {
    const userEmail = req.emailUser;
    const userPass = req.passUser;
    console.log(userEmail,userPass)
    const users=await Users.findAll({
        where: {
          email: userEmail,
          pass: userPass
        }
      })
       .then((data)=>{  
            console.log(data);
            const user=data;
            return user;
       })
       .catch(error=>{
          res.status(502).json({
            success:false,
            message:"Hubo un error",
            data:error
          });
       })
    
     jwt.sign({users},'secretKey',(err,token)=>{
        res.json({
          token: token
        })      
     });
});
route.post('/posts',verifyToken ,(req, res) => {
      res.json({
        data: req.user
      })

});

function verifyUserPass(req,res,next){
   const emailUser = req.headers['user'];
   const passUser = req.headers['pass'];
   
   try{
      req.emailUser=emailUser;
      req.passUser=passUser;
      next();
    }catch(error){
      console.error(error);
      res.sendStatus(503).json({
        success:false,
        message:"Hubo un error",
        data:error
      });
    }
}

function verifyToken(req,res,next){
    const bearerHeader=req.headers['authorization'];
     try{
       const bearerToken=bearerHeader.split(" ")[1];
       req.token=bearerToken;
       const verified=jwt.verify(req.token,'secretKey');
       req.user=verified;
       next();
     }catch(error){
       console.error(error);
       res.sendStatus(403);
     }
 }


module.exports=route;