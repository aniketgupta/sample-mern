import User from '../models/user';
var user = new User();
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

import jwt from "jsonwebtoken";
import serverConfig from '../config';


/**
 * Save a user
 * @param req
 * @param res
 * @returns void
 */
export function registerUser(req, res) {
  console.log("reqbody:", req.body);
  /*if (!req.body.user.fname || !req.body.user.lname || !req.body.user.email || !req.body.user.username || !req.body.user.password) {
    res.status(403).end();
  }*/

  if (!req.body.user.fname || !req.body.user.lname || !req.body.user.email || !req.body.user.username || !req.body.user.password) {
      res.status(403).json({
        success: false, 
        errorMessage: 'Please fill all the form fields.'
      });
  } else {

  const newUser = new User(req.body.user);

  // Let's sanitize inputs
  newUser.fname = sanitizeHtml(newUser.fname);
  newUser.lname = sanitizeHtml(newUser.lname);
  newUser.email = sanitizeHtml(newUser.email);
  newUser.username = sanitizeHtml(newUser.username);
  newUser.password = sanitizeHtml(newUser.password);
 
  newUser.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ 
      success: true,
      user: saved 
    });
  });
}
}

export function login (req, res) {
  if (req.method.toLowerCase() !== 'post') {
    res.render('login', { title: 'Login' });
  } else {
    User.findOne({
      email: req.body.user.email
    }, function (err, result) {
      if (err) console.log(err);
      if (result == null) {
        res.status(403).json({
          success: false,
          errorMessage: 'Invalid email.'
        });
      } else {
        user.comparePassword(req.body.user.password, result.password, function (err, isMatch) {
          if (err || !isMatch) {
            res.status(403).json({
              success: false,
              errorMessage: 'Incorrect password.'
            });
          } else if (isMatch) {
            var token = jwt.sign(result, serverConfig.secret)
            res.status(200).json({
              success: true,
              token: token,
              successMessage: "Login Successfull."
            })
          }  
        }); 
      }
    });

  }
}

/*export function login (req, res) {
  User.findOne({
      email: req.body.user.email
    }, function(err, user) {

      if (err) throw err;

      if (!user) {
        res.json({ success: false, errorMessage: 'Authentication failed. Invalid Email.' });
      } else if (user) {

        // check if password matches
        if (user.password != req.body.user.password) {
          res.json({ success: false, errorMessage: 'Authentication failed. Wrong password.' });
        } else {

          // if user is found and password is right
          // create a token
          var token = jwt.sign(user, serverConfig.secret, {
            expiresIn: "24h" // expires in 24 hours
          });

          // return the information including token as JSON
          res.json({
            success: true,
            token: token
          });
        }   

      }

  });
}
*/

