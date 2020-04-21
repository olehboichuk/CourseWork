let express = require('express');
let router = express.Router();
const {Pool} = require('pg');
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let config = require('../config');
const sql = require('../queryes/user');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'coursework',
    password: 'Qwerty123_',
    port: 5432,
});

router.route('/user/profile')
    .get((req, res) => {
        let token = req.header('x-access-token');
        let id = jwt.decode(token).id;
        pool.query(sql.find_user_with_id, [id], (err, result) => {
            if (err) throw err;
            res.status(200).json(result.rows)
        });
    })
    .put((req, res) => {
    pool.query(sql.change_student, [req.body.first_name,req.body.last_name,req.body.email,req.body.id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).json(result.rows)
    });
});

router.route('/user/role')
    .get((req, res) => {
        let token = req.header('x-access-token');
        let id = jwt.decode(token).id;
        pool.query(sql.find_user_roles, [id], (err, result) => {
            if (err) throw err;
            res.status(200).json(result.rows)
        });
    });

module.exports = router;
