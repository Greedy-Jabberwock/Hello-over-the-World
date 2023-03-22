import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Quizz = db.define(
    'quizz',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        answers: {
            type: DataTypes.JSON,
            allowNull: false
        }
    }
);

export default Quizz;