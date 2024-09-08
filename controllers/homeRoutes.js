const router = require('express').Router();
const { Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET homepage with existing blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: Comment }],
      order: [['created_at', 'DESC']],
    });

    res.render('homepage', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a specific post
router.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: Comment }],
    });

    if (!post) {
      res.status(404).render('404');
      return;
    }

    res.render('post', { post });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { user_id: req.session.user_id },
      order: [['created_at', 'DESC']],
    });

    res.render('dashboard', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new post
router.post('/post', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST add a comment
router.post('/comment', withAuth, async (req, res) => {
  try {
    await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.redirect(`/post/${req.body.post_id}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a post
router.delete('/post/:id', withAuth, async (req, res) => {
  try {
    const post = await Post.destroy({
      where: { id: req.params.id, user_id: req.session.user_id },
    });

    if (!post) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
