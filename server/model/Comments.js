import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Comments = db.define(
    'comments',
    {
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        fk_author_id: {
            type: DataTypes.INTEGER
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

export default Comments;