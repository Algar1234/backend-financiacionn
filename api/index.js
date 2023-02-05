const app = require('express')()
const {router}= require('../controllers/users');
const UserController= require("../controllers/users");

app.get('/api', function (req, res) {
    router.get('/userTest', UserController.test);
  return res.json({hello: 'dog'});
});

app.get('/api/marco', function (req, res) {
  return res.end("polo");
});

module.exports = app