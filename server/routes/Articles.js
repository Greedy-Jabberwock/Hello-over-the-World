import express from 'express';
import { 
    getArticles, 
    getArticlesAboutPlace,
    getArticlesByUser,
    createArticle    
} from '../controllers/Articles.js';

const articles_router = express.Router();

articles_router
.get('/', getArticles)
.get('/place_articles', getArticlesAboutPlace)
.get('/user_articles', getArticlesByUser)
.put('/add_article', createArticle)


export default articles_router;