// const path = require('path');
// const express = require('express');
// const exphbs = require('express-handlebars');
// const session = require('express-session');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const sequelize = require('./config/connection');
// const routes = require('./controllers');
// const helpers = require('./utils/helpers');

// const app = express();
// const PORT = process.env.PORT || 3003;

// // Set up Handlebars.js engine with custom helper functions
// // const hbs = exphbs.create({ helpers });
// // app.engine('handlebars', hbs.engine);
// // app.set('view engine', 'handlebars');

// const hbs = exphbs.create();
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');


// // Set up session middleware
// const sess = {
//   secret: 'super secret',
//   cookie: {
//     maxAge: 1000 * 60 * 30, // 30 minutes
//   },
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// };

// app.use(session(sess));

// // Middleware for parsing JSON and URL-encoded data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve static files from the 'public' folder
// app.use(express.static(path.join(__dirname, 'public')));

// // Use routes from controllers
// app.use(routes);

// // Sync sequelize models and start the server
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// });

const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Set up Handlebars engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(routes);

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
