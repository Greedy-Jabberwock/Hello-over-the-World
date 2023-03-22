import db from "./config/db.js";
import bcrypt from "bcrypt";
import User from "./model/User.js";
import Place from "./model/Place.js";
import Article from "./model/Article.js";
import Quizz from "./model/Quizz.js";
import Comment from "./model/Comment.js";

User.hasMany(Article);
Article.belongsTo(User);

User.hasMany(Quizz);
Quizz.belongsTo(User);

Place.hasMany(Article);
Article.belongsTo(Place);

Place.hasMany(Quizz);
Quizz.belongsTo(Place);

Article.hasMany(Comment);
Comment.belongsTo(Article);

(async () => {
    try {
        await db.sync({force: true});
        const hashed = await bcrypt.hash('pass', 10);
        const admin = await User.create({
            username: 'admin',
            email: 'admin@gmail.com',
            password: hashed,
            isAdmin: true
        });
        const place = await Place.create({
            name: "Yad Va`Shem",
            longitude: 35.17610277116404,
            latitude: 31.774226560450785 
        });

        const article = await Article.create({
            title: "About Yad Va`Shem",
            content: "A long line of international dignitaries have paid visits to Yad Vashem, Israel’s official Holocaust memorial in Jerusalem. Even for President Biden, his visit on Wednesday was not his first."
        })

        await admin.addArticle(article);
        await place.addArticle(article);
        console.log('Synchronyzed.');
    } catch (error) {
        console.log(error);
    }
})();