import express from 'express';
import { 
    getArticles, 
    getArticlesAboutPlace,
    getArticlesByUser,
    createArticle,    
    addComment,
    getArticleComments,
    deleteComment
} from '../controllers/Articles.js';
import { verifyToken } from '../middlewares/verifyToken.js'

const articles_router = express.Router();

articles_router
.get('/', getArticles)
.get('/place_articles', getArticlesAboutPlace)
.get('/user_articles/:userId', getArticlesByUser)
.get('/article_comments/:articleId', getArticleComments)
.put('/add_article', verifyToken, createArticle)
.put('/add_comment', verifyToken, addComment)
.delete('/delete_comment/:id', verifyToken, deleteComment);


export default articles_router;