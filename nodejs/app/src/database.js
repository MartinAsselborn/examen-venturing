const Sequelize=require('sequelize');

const database=new Sequelize(
    'examen',//DATABASENAME
    'root',//USER
    '',//PASS
    {
        host:'localhost',
        dialect: 'mysql'
    }
);

database.sync();

module.exports= database;
