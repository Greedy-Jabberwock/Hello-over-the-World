import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Cities = db.define(
    'cities',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        latitude : {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        longitude  : {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        fk_country_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

export default Cities;
