const MovieController = {}
const Movies=require('../models/Movies');
const Sequelize=require('sequelize');
const Op = Sequelize.Op;

MovieController.getdata=(req , res)=>{

    const data={  
        id:1,
        nombre: "Martin",
        email: "asselborn.c.m@gmail.com", 
        pass:"movies"
     }

     res.json(data);

}

MovieController.list=async (req , res)=>{
    const title = req.params.title;
    const where=(title)?({where: {title: title,}}):{};

    try {
       const movies=await Movies.findAll(where)
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

       return res.json(movies);
        
    } catch (error) {
        console.log('error: ',error);
    }

}



MovieController.create=async (req , res)=>{
    try {
       const movies=await Movies.create({
        title: req.body.title,
        descri: req.body.descri, 
        year:req.body.year
       })
       .then((data)=>{
                console.log(data);
                res.status(201).json({
                success:true,
                message:"Create success",
                data:data
            });
       })
       .catch(error=>{
            errorValidate(error,req.body.title,req.body.descri,req.body.year,res);
            res.status(301).json({
                success:false,
                error:error
            });
       }) 

          
    } catch (error) {
        console.log('error: ',error);
    }

}

MovieController.update=async (req , res)=>{
    const idMovie = req.params.idmovie;
    try {
       const movies=await Movies.update({
                  title: req.body.title,
                  descri: req.body.descri, 
                  year:req.body.year
                },{where:{
                  id: idMovie  
                }
            })
       .then((data)=>{
            let movie=Movies.findAll({
                where: {
                id: idMovie,
                }
            })
            .then((data)=>{
                res.status(201).json({
                    success:true,
                    message:"Update success",
                    data:data
                });
            })
            .catch(error=>{
                const respo={success:false,error: error};
                return respo;
            }) 
       })
       .catch(error=>{
             res.status(301).json({success:false,error: error});
       }) 

        
    } catch (error) {
        console.log('error: ',error);
    }

}

MovieController.delete=async (req , res)=>{
   
    try {
       const movies=await Movies.destroy({where:{
                  id: req.body.id, 
                }
            })
       .then((data)=>{
            res.status(201).json({
                success:true,
                message:"Delete success",
                data:data
            });
       })
       .catch(error=>{
            res.status(301).json({
                success:false,
                error:error
            });
       }) 
        
    } catch (error) {
        console.log('error: ',error);
    }

}

MovieController.uploads=async (req , res)=>{
    let lines = req.files[0].buffer.toString().split("\n");
    try{
        lines.map((line)=>{
            let register=line.split(";");    
            const title=register[0];
            const descri=register[1];
            const year=register[2];
            if(title!=""){
                const movies= Movies.create({
                    title:register[0],
                    descri:register[1], 
                    year:register[2]
                })
                .then((data)=>{
                   res.status(201).json({
                       success:true,
                       data:data
                   })
                    
                })
                .catch(error=>{
                    let datos = errorValidate(error,title,descri,year,res);
                    res.status(201).json({
                        success:true,
                        data:datos,
                        error:error

                    })
                    
                }) 
            }

        });
        
    }catch(error){
        console.log(error);
         res.status(201).json({
            success:false,
            error:error
        })
    }    


    return res.status(201).json({success:true, message:"El archivo se subio correctamente"});

}

/*
/* Is a update function to duplicate entrys for destroy movies 
/*
/**/
function errorValidate(error,title,descri,year,res){
    if(error.parent.code=="ER_DUP_ENTRY"){
                       
        let movie= Movies.update({
            descri: descri, 
            year:year,
            deleteAt: null
          },{where: {
                title: title, 
                deleteAt:{
                    [Op.ne]:null
                }    
           },
            paranoid: false
        })
        .then((data)=>{
            return  {
                    descri: descri, 
                    year:year,
                    title: title
                };
            
        })
        .catch(error=>{
            res.status(301).json({
                success:false,
                error:error
            })
        }) 
    }
}

module.exports=MovieController;