import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const ktp = db.define('ktp', {
    NIK: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    NamaLengkap: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Tempat: {
        type: DataTypes.STRING,
        allowNull: true
    },
    TanggalLahir: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    Blacklist: {
        type: DataTypes.STRING,
        allowNull: true
    }

},{
    freezeTableName: true
})

export default ktp;