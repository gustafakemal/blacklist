import { Sequelize } from "sequelize";

const db = new Sequelize('blacklist', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    define: {
        timestamps: false
    }
})

export default db;