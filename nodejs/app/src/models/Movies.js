const Sequelize=require('sequelize');

var sequelize =require('../database.js');

var Movie= sequelize.define(
    'movies',{
     id:{
         type:Sequelize.INTEGER,
         primaryKey:true,
         autoIncrement: true
     },
     title: {type:Sequelize.STRING,
        allowNull: false,
        unique: true        
    },
     descri: Sequelize.STRING,
     year: Sequelize.STRING,
},{
    sequelize,
    paranoid: true,
    deletedAt: 'deleteAt'});

module.exports=Movie;