const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const withAuth = require('../utils/auth');

// POST sign up
router.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
    });

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.redirect('/');
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      res.status(400).json({ message: 'Incorrect username or password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.redirect('/');
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;

app.post('/login', (req, res) => {
  // Logic for handling login
});

app.post('/signup', (req, res) => {
  // Logic for handling user signup
});