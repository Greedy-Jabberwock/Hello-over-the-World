import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Comment = db.define(
    'comment',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }
);

export default Comment;