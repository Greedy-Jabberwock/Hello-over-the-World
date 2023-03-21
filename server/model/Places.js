import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Places = db.define(
    'places',
    {
        place_id: {
            type: DataTypes.INTEGER,
            autoIncrementIdentity: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        coordinates: {
            type: DataTypes.STRING,
            allowNull: false,
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

export default Countries;