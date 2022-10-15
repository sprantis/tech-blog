// Code referenced from Module 14 - Mini Project

const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const auth = require('../utils/auth');

router.get('/', auth, async (req, res) => {
    try {
        // Get all projects and JOIN with user data
        const postData = await Post.findAll({
            where: { userId: req.session.currUserId },
            include: [
                { 
                    model: User,
                    attributes: ['username'] 
                },
                {
                    model: Comment,
                    attributes: ['id', 'userId', 'postId', 'commentText', 'dateCreated']
                }
            ]
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('dashboard', { 
            posts, 
            loggedIn: req.session.loggedIn 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use auth middleware to prevent access to route
router.get('/newPost', auth, async (req, res) => {
    try {
        res.render('newPost');
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use auth middleware to prevent access to route
router.get('/updatePost/:id', auth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: { id: req.params.id },
            include: [
                { model: User },
                {
                    model: Comment,
                    include: { model: User }
                }
            ]
        });

        if (!postData) {
            res.status(404).json({ message: 'There is no post with this id' });
            return;
        }

        const post = postData.get({ plain: true});

        res.render('updatePost', { post, loggedIn: true });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// Use auth middleware to prevent access to route
router.get('/updateComment/:id', auth, async (req, res) => {
    try {
        const commentData = await Comment.findOne({
            where: { id: req.params.id },
            include: [
                { model: User },
                {
                    model: Post,
                    include: { model: User }
                }
            ]
        });

        if (!commentData) {
            res.status(404).json({ message: 'There is no comment with this id' });
            return;
        }

        const comment = commentData.get({ plain: true});

        res.render('updateComment', { comment, loggedIn: true });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
