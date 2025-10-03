import sequelize from './config/db.js';


(async () => {
  try {
    await sequelize.sync({ alter: true }); // or { force: true } for dev reset
    console.log("All models synced!");
  } catch (err) {
    console.error("Error syncing DB:", err);
  }
})();



async function dbInit() {
    try
    {
        await sequelize.authenticate() ;
        console.log("database connected successfully");


    }

    catch(err)
    {
        console.log('database connect failed ', err , 'yeh waala');
        

    }

    
}
export default dbInit;