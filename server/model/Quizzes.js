import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Quizzes = db.define(
    'quizzes',
    {
        quizz_id: {
            type: DataTypes.INTEGER,
            autoIncrementIdentity: true
        },
        answers: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        creation_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
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

export default Quizzes;