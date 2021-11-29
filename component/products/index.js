const express = require('express');
const { response } = require('../../app');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.render('index', {title: Express})
})