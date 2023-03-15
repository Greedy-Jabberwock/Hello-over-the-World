import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Quizzes = db.define(
    'quizzes',
    {
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
            type: DataTypes.INTEGER
        },
        fk_city_id: {
            type: DataTypes.INTEGER
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

export default Quizzes;