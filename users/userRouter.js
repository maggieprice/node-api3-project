const express = require('express');
const router = express.Router();
const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error adding user',
      });
    });
});

router.post('/:id/posts', validatePost, (req, res) => {
  const postInfo = { ...req.body, user_id: req.params.id };
  Posts.insert(postInfo)
    .then(post => {
      res.status(210).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error adding posts',
      });
    });
});

router.get('/', (req, res) => {
  Users.get()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the users',
    });
  });
});

router.get('/:id', validateUserId, (req, res) => {
  Users.getById(req.params.id)
  .then(user => {
      res.status(200).json(user);
    }) 
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the user',
      });
    });
  });

router.get('/:id/posts', validateUserId, (req, res) => {
  Posts.getById(req.params.id).then(posts => {
      res.status(200).json(posts)
  })
  .catch(error => {
      console.log(error);
      res.status(500).json({errorMessage: "The post could not be retrieved."})
  });
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
      res.status(500).json({errorMessage: "The user could not be removed"})
    });
});

router.put('/:id', validateUserId, (req, res) => {
    Users.update(req.params.id, req.body)
      .then(user => {
      res.status(200).json(user)
      })
  .catch(error => {
      res.status(500).json({errorMessage: "The user information could not be modified."})
  });
});

//custom middleware

function validateUserId(req, res, next) {
  const postContent = req.body;

  if(!req.params.id){
      res.status(404).json({ errorMessage: "The specified ID does not exist." })
  } else {
      req.user = req.body
  } 
  next();
}

function validateUser(req, res, next) {
  if(!req.body || !req.body.name ){
    res.status(400).json({ message: "please provide body & name content" });
 } else{
   next();
 }
}

function validatePost(req, res, next) {
 
  if(!req.body || !req.body.text){
    res.status(400).json({ errorMessage: "Please provide text for the post."})
  } else { 
    next();
  }
}

module.exports = router;
