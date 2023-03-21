import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Countries = db.define(
    'countries',
    {
        country_id: {
            type: DataTypes.INTEGER,
            autoIncrementIdentity: true
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

export default Countries;