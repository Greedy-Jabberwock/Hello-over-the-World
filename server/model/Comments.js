import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Comments = db.define(
    'comments',
    {
        comment_id: {
            type: DataTypes.INTEGER,
            autoIncrementIdentity: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        fk_article_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fk_author_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

export default Comments;