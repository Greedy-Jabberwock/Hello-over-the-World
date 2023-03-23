import Article from "../model/Article.js";
import User from "../model/User.js";
import Place from "../model/Place.js";
import { Op } from "sequelize";

User.hasMany(Article);
Article.belongsTo(User);

Place.hasMany(Article);
Article.belongsTo(Place);

export const getArticles = async (req, res) => {
    try {
        const allArticles = await Article.findAll();
        res.json(allArticles);
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
};

export const getArticlesAboutPlace = async (req, res) => {
    try {
        const {placeId} = req.body;
        const place = await Place.findOne({where: placeId});
        const articles = await place.getArticles();
        res.json(articles);
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
};

export const getArticlesByUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findOne({where: userId});
        const articles = await user.getArticles();
        res.json(articles);
    } catch(error) {
        res.status(404).json({msg: error.message});
    }
}

export const createArticle = async (req, res) => {
    try {
        const { title, content, userId, placeId } = req.body;
        const user = await User.findOne({where: userId});
        const place = await Place.findOne({where: placeId});
        
        const checker = await Article.findOne({
            where: {
                [Op.or]: [
                    {title},
                    {content}
                ]
            }
        })

        if (checker) throw new Error('Such title or text already in database. Create something new!');

        const article = await Article.create({
            title,
            content
        });
        await user.addArticle(article);
        await place.addArticle(article);
        res.send(`Article created`);
    } catch(error) {
        console.log(error.message);
        res.status(404).json({msg: error.message});
    }
}