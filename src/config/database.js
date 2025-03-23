const {DataSource}=require("typeorm");
require("dotenv").config();
const AppDataSource=new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize:true,
    entities: [require("../entities/User")],
    logging: true
})
module.exports=AppDataSource;
