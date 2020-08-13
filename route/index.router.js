const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

const mongoose = require('mongoose');
const dbs = require("../db");
const ObjectID = require('mongodb').ObjectID;



router.post('/register', ctrlUser.register);

router.get('/userlist', ctrlUser.userList);

router.delete('/delete/:id', ctrlUser.deleteUser);


module.exports = router;