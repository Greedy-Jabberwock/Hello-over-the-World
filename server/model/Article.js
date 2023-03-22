import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Article = db.define(
    'articles',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 10
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                min: 100
            }
        }
    }
);

export default Article;