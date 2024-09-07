// controllers/homeRoutes.js
const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');

// Homepage route
router.get('/', async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      include: [{ model: User, attributes: ['username'] }]
    });
    
    const blogs = blogData.map((post) => post.get({ plain: true }));
    
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Signup page route (render signup form)
router.get('/signup', (req, res) => {
  res.render('signup'); // Make sure you have a signup.handlebars view
});

module.exports = router;
