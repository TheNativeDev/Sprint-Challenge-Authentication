const router = require('express').Router();

////added
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model') // added users folder -> users-model file.. since dont see it.

//add this route 
const {jwtSecret} = require('../config/secrets')

router.post('/register', (req, res) => {
  // implement registration//////////////////////
  ///////////////////////////////////////////////
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
  .then(saved => {
    res.status(201).json(saved);
  })
  .catch(error => {
    res.status(500).json(error)
    console.log(error)
  });
});

router.post('/login', (req, res) => {
  // implement login////////////////////////////////////
  ///////////////////////////////////////////////////////
  let { username, password } = req.body;

  Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          //token
          const token = functToken(user);
          
          res.status(200).json({ token
            //originally this -> message: `Welcome  ${user.username}!`, replaced with token.
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials auth' });
          console.log(token, 'token!')
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
});


/////add the function Token/////////////////////
function functToken(user){
  const payload ={
    user
  }

  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, jwtSecret, options);
}


module.exports = router;