import Article from "../model/Article.js";
import User from "../model/User.js";
import Place from "../model/Place.js";
import Comment from '../model/Comment.js';
import { Op } from "sequelize";

User.hasMany(Article);
Article.belongsTo(User);

Place.hasMany(Article);
Article.belongsTo(Place);

User.hasMany(Comment);
Comment.belongsTo(User);

Article.hasMany(Comment);
Comment.belongsTo(Article);

export const getArticles = async (req, res) => {
    try {
        const allArticles = await Article.findAll({
            attributes: ['id', 'title', 'content', 'updatedAt'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'username']
                },
                {
                    model: Place,
                    attributes: ['name']
                }
            ]
        });
        res.json(allArticles);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

export const getArticlesAboutPlace = async (req, res) => {
    try {
        const { placeId } = req.body;
        const place = await Place.findOne({ where: placeId });
        const articles = await place.getArticles();
        res.json(articles);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

export const getArticlesByUser = async (req, res) => {
    try {
        let { userId } = req.params;
        userId = Number.parseInt(userId);
        const user = await User.findOne({ where: userId });
        const articles = await user.getArticles();
        res.json(articles);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

export const createArticle = async (req, res) => {
    try {
        const { title, content, userId, placeId } = req.body;
        const user = await User.findOne({ where: userId });
        const place = await Place.findOne({ where: placeId });

        const checker = await Article.findOne({
            where: {
                [Op.or]: [
                    { title },
                    { content }
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
    } catch (error) {
        console.log(error.message);
        res.status(404).json({ msg: error.message });
    }
}

export const addComment = async (req, res) => {
    try {
        const { content, userId, articleId } = req.body;
        const user = await User.findByPk(userId);
        const article = await Article.findByPk(articleId);
        if (!user || !article) throw new Error('No found such user or article')
        const new_comment = await Comment.create({ content });
        await new_comment.setUser(user);
        await new_comment.setArticle(article);
        res.json({msg: 'Comment created'});
    } catch (error) {
        res.status(404).json(error);
    }

}

export const getArticleComments = async (req, res) => {
    try {
        const { articleId } = req.params;
        console.log(articleId);
        const article = await Article.findByPk(articleId);
        console.log(article);
        const comments = await article.getComments(
            {
                include: {
                    model: User,
                    attributes: ['id', 'username']
                },
                attributes: ['id', 'content', 'createdAt'],
                order: [['createdAt', 'DESC']]
            }
        );
        res.json(comments);
    } catch (error) {
        res.status(404).json(error.message)
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const toDelete = await Comment.destroy(
            {
                where: {
                    id
                }
            }
        )
        res.json(toDelete);
    } catch (error) {
        res.status(404).json(error)
    }
} 