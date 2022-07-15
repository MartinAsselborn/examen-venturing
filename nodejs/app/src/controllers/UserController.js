const UserController = {}
const Users=require('../models/Users');

UserController.getdata=(req , res)=>{

    const data={  
        id:1,
        nombre: "Martin",
        email: "asselborn.c.m@gmail.com", 
        pass:"movies"
     }

     res.json(data);

}

UserController.list=async (req , res)=>{
    const userEmail = "martin@gmail.com";
    const userPass = "movies";
    try {
       const users=await Users.findAll({
        attributes: ['email','username','createdAt'] ,   
        where: {
          email: userEmail,
          pass: userPass
        }
      })
       .then((data)=>{
            const res={success:true,
                       message:"load success",
                       data:data };
            return res;
       })
       .catch(error=>{
            const res={success:false,error: error};
            return res;
       }) 

       return res.json(users);
        
    } catch (error) {
        console.log('error: ',error);
    }

}

UserController.listOne=async (req , res)=>{
    const userEmail = req.params.useremail;
    
    try {
       const users=await Users.findAll({
        attributes: ['email','username','createdAt'] ,
        where: {
         
          email: userEmail,
        }
      })
       .then((data)=>{
            const res={success:true,
                       message:"load success",
                       data:data };
            return res;
       })
       .catch(error=>{
            const res={success:false,error: error};
            return res;
       }) 

       return res.json(users);
        
    } catch (error) {
        console.log('error: ',error);
    }

}

UserController.create=async (req , res)=>{
    try {
       const users=await Users.create({
        username: "martin2",
        email: "martin2@gmail.com", 
        pass:"movies"
       })
       .then((data)=>{
            const res={success:true,
                       message:"Create success",
                       data:data 
                    };
            return res;
       })
       .catch(error=>{
            const res={success:false,error: error};
            return res;
       }) 

       return res.json(users);
        
    } catch (error) {
        console.log('error: ',error);
    }

}

UserController.update=async (req , res)=>{
    const UserID=2;
    try {
       const users=await Users.update({
                username: "Antonia2",
                email: "antonia.vallejos@gmail.com", 
                pass:"movies1"
                },{where:{
                  id: UserID  
                }
            })
       .then((data)=>{
            const res={success:true,
                       message:"Update success",
                       data:data 
                    };
            return res;
       })
       .catch(error=>{
            const res={success:false,error: error};
            return res;
       }) 

       return res.json(users);
        
    } catch (error) {
        console.log('error: ',error);
    }

}

UserController.delete=async (req , res)=>{
    const UserID=3;
    try {
       const users=await Users.destroy({where:{
                  id: UserID  
                }
            })
       .then((data)=>{
            const res={success:true,
                       message:"Update success",
                       data:data 
                    };
            return res;
       })
       .catch(error=>{
            const res={success:false,error: error};
            return res;
       }) 

       return res.json(users);
        
    } catch (error) {
        console.log('error: ',error);
    }

}


module.exports=UserController;