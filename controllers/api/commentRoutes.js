// Code referenced from Module 14 - Mini Project

const router = require('express').Router();
const { User, Comment  } = require('../../models');
const auth = require ('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            attributes: ['id', 'commentText', 'dateCreated'],
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
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
            userId: req.session.currUserId,
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
