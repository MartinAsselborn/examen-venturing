const Sequelize=require('sequelize');

var sequelize =require('../database.js');

var User= sequelize.define(
    'users',{
     id:{
         type:Sequelize.INTEGER,
         primaryKey:true,
         autoIncrement: true
     },
     email:{type:Sequelize.STRING,
        allowNull: false,
        unique: true        
    },
     username: Sequelize.STRING,
     pass: Sequelize.STRING,
},{
    sequelize,
    paranoid: true,
    deletedAt: 'deleteAt'});

module.exports=User;