// Code referenced from Module 14 - Mini Project

const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const auth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // Get all projects and JOIN with user data
        const postData = await Post.findAll({ 
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
        res.render('homepage', { 
            posts, 
            loggedIn: req.session.loggedIn 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/signin', async (req, res) => {
    // If the user is already logged in, redirect the request to another route
    try {
        if (req.session.loggedIn) {
            res.redirect('/dashboard');
            return;
        }

        res.render('signinAndSignup')
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findOne(
            {
                where: {
                    id: req.params.id
                },
                attributes: ['id', 'postTitle', 'postContent', 'dateCreated'],
                include: [
                    {
                        model: Comment,
                        attributes: ['id', 'userId', 'postId', 'commentText', 'dateCreated'],
                        include: {
                            model: User,
                            attributes: ['username']
                        }
                    },
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        );

        if (!postData) {
            res.status(404).json({ message: 'There is no post with this id'});
            return;
        }

        // console.log(JSON.stringify(postData));
        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
            currUserId: req.session.currUserId,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', auth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.currUserId, {
        attributes: { exclude: ['password'] },
        include: [
            { model: Post },
            { model: Comment}
        ],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('dashboard', {
        ...user,
        loggedIn: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
