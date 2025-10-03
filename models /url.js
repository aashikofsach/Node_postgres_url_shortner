import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
// const 
// here we have to import the sequelize 

const URL = sequelize.define('URL',{
    id :{
        type : DataTypes.INTEGER,
        primaryKey : true ,
        autoIncrement : true,

    },
    shortId : {
        type : DataTypes.STRING,
        allowNull : false ,
        unique : true ,

    },
    redirectUrl : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            isUrl : true 
        }

    },
    visitHistory :{
        type : DataTypes.JSONB,
defaultValue : [] 

    }

}, {
    tableName : 'urls',
    timestamps : true ,
    underscored : true ,

})

export default URL ;