const router = require('express').Router();

const Users = require('./users-model');
const restricted = require('../auth/authenticate-middleware');

router.get('/', restricted, whatjoke('too'), (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });

    //connected with whatever is on six - whatjoke
    function whatjoke(joke) {
        return function(req, res, next) {
            console.log('user', req.user)
          if(req.user && req.user.joke && req.user.joke.toLowerCase() === joke) {
           next();
          }else{
           res.status(403).json({spell: 'speek friend and enter'})
          }
        }
       }
       
       module.exports = router;