// Code referenced from Module 14 - Mini Project

const router = require('express').Router();
const { User, Comment  } = require('../../models');
const auth = require ('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [{ model: User }]
        });

        // Serialize user data so templates can read it
        const comments = commentData.map((comment) => comment.get({ plain: true }));

        // Pass serialized data into Handlebars.js template
        res.render('post', { comments, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findOne({ where: { id: req.params.id } });

        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/', 
auth, 
async (req, res) => {
    // Grab userId from active session when posting a new comment
    try {
        const commentData = await Comment.create({
            userId: req.session.userId,
            postId: req.body.postId,
            commentText: req.body.commentText
        });

        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const commentData = await Comment.update(
            { commentText: req.body.commentText },
            { where: { id: req.params.id } }
        );

        if (!commentData) {
        res.status(404).json({ message: 'There is no comment with this id' });
        return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({ where: { id: req.params.id } });

        if (!commentData) {
            res.status(404).json({ message: 'There is no comment with this id' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
