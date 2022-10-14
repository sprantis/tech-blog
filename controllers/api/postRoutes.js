// Code referenced from Module 14 - Mini Project

const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const auth = require ('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: ['id', 'postTitle', 'postContent', 'dateCreated'],
            order: [['dateCreated', 'DESC']], 
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'userId', 'postId', 'commentText', 'dateCreated'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });
        
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'postTitle', 'postContent', 'dateCreated'],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'userId', 'postId', 'commentText', 'dateCreated'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ] 
        });

        if (!postData) {
            res.status(404).json({ message: 'There are no posts with this id'});
            return;
        }
        
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', auth, async (req, res) => {
    // Grab userId from active session when adding a new post
    try {
        const postData = await Post.create({
            userId: req.session.userId,
            postTitle: req.body.postTitle,
            postContent: req.body.postContent
        });

        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const postData = await Post.update(
            {
                postTitle: req.body.postTitle,
                postContent: req.body.postContent
            },
            { where: 
                { 
                    id: req.params.id,
                    userId: req.session.userId 
                } 
            }
        );

        if (!postData) {
            res.status(404).json({ message: 'There is no post with this id' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: { 
                id: req.params.id,
                userId: req.session.userId 
            }
        });

        if (!postData) {
            res.status(404).json({ message: 'There is no post with this id' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
