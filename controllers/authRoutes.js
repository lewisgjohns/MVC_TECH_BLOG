//this file will handle the routes for user authentication
const express = require('express');
const app = express();
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const withAuth = require('../utils/auth');

//this route will render the login page
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

// this route will handle the login logic
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

// this route will handle the logout logic
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;

//this will be the route for the login page
app.post('/login', (req, res) => {
  
});

//this will be the route for the signup page
app.post('/signup', (req, res) => {
 
});

//this will be the route for the logout page
app.post('/logout', (req, res) => {
  
});


