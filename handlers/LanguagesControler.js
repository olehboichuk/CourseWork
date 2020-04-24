let express = require('express');
let router = express.Router();
const {Pool} = require('pg');
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
let jwt = require('jsonwebtoken');
const sqlLanguages = require('../queryes/language');
const sqlTopics = require('../queryes/topic');
const sqlArticles = require('../queryes/article');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'coursework',
    password: 'Qwerty123_',
    port: 5432,
});

router.route('/languages')
    .get((req, res) => {
        pool.query(sqlLanguages.find_all_languages, (err, result) => {
            if (err) throw err;
            res.status(200).json(result.rows)
        });
    });

router.route('/topics')
    .get((req, res) => {
        pool.query(sqlTopics.get_all_topics, (err, result) => {
            if (err) throw err;
            res.status(200).json(result.rows)
        });
    });

router.route('/articles')
    .get((req, res) => {
        pool.query(sqlArticles.find_all_articles, (err, result) => {
            if (err) throw err;
            let articles = result.rows;
            articles.forEach(el=>{
                pool.query(sqlArticles.get_article_topics, [el.id], (err, result) => {
                    el.titels = result.rows;
                    if (articles[articles.length - 1] === el)
                        res.status(200).json(articles)
                });
            });
        });
    })
    .post((req, res) => {
        let token = req.header('x-access-token');
        let id = jwt.decode(token).id;
        let articleCreate = new Date();
        pool.query(sqlArticles.insert_new_article, [id, req.body.title, req.body.content, articleCreate.toLocaleString()], (err, result) => {
            if (err) throw err;
            let articleId =result.rows[0].id;
            req.body.topicIds.forEach(el => {
                pool.query(sqlArticles.add_topic_to_article, [articleId, el], (err, result) => {
                    if (req.body.topicIds[req.body.topicIds.length - 1] === el)
                        res.status(200).json(result.rows)
                });
            })
        });
    });

module.exports = router;
