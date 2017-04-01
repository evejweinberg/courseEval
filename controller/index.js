const express = require('express');

const router = express.Router();

const CourseEval = require('./../models/courseEvaluation');
const UserExp = require('./../models/userExperience');

router.get('/', (req, res) => {
    res.render('');
});

router.post('/courseevaluation', (req, res) => {
    console.log('data', req.body);
    const data = {
        username: req.body.username,
        coursename: req.body.coursename,
        rating: req.body.rating,
    };
    const cousrE = CourseEval(data);
    cousrE.save((err, d) => {
        if (err) return res.send(err);
        return res.send(`data saved ${d}`);
    });
});

router.get('/courseevaluation', (req, res) => {
    const cousrE = CourseEval();
    cousrE.findAll((err, d) => {
        if (err) return res.send(err);
        return res.send(d);
    });
});

router.post('/userexperience', (req, res) => {
    // const data = { rating: req.body.rating, username: req.body.username };
    const userEx = UserExp(req.body);
    userEx.save((err, d) => {
        if (err) return res.send(err);
        return res.send(`saved details with ${d}`);
    });
});

router.get('/userexperience', (req, res) => {
    const userEx = UserExp();
    userEx.findAll((err, d) => {
        if (err) return res.send(err);
        return res.send(d);
    });
});

module.exports = router;
