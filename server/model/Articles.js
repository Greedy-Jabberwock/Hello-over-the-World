import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Articles = db.define(
    'articles',
    {
        article_id : {
            type: DataTypes.INTEGER,
            autoIncrementIdentity: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        creation_date: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        },
        fk_author_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fk_place_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

export default Articles;