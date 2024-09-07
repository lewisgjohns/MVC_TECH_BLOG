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
    res.status(500).json({ message: 'Failed to load homepage', error: err.message });
  }
});

// Dashboard route
router.get('/dashboard', async (req, res) => {
  try {
    // Fetch user-specific posts for the dashboard
    const userBlogData = await BlogPost.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ['username'] }],
    });

    const userBlogs = userBlogData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      userBlogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load dashboard', error: err.message });
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
