require('dotenv').config();

const { SHARED_SECRET } = require('./config');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const password = {create: createPassword, compare: comparePassword};

function createPassword(password) {
  // returns the hashed version of the password passed to the function
  return new Promise ((resolve, reject) => {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        if (!err)
          resolve(hash);
        else
          reject(err);
      });
    });
  });
}

function comparePassword(password, hashedPassword) {
  // returns true if the passwords match and false if they do not
  return bcrypt.compare(password, hashedPassword);
}

function encrypt(value) {
  // encrypts whatever value is passed to it
  return jwt.sign(value, SHARED_SECRET);
}

function decrypt(value) {
  // decodes whatever value is passed to it
  // returns null if value is not encoded to begin with
  return jwt.decode(value);
}

function detokenize(req, res, next) {
	// use jwt.verify and the shared secret to decrypt the token and apply the decrypted req.body to itself

  if (!(req.body) || !(req.body.payload)) {
    return next();
  }

	jwt.verify(req.body.payload, SHARED_SECRET, function(err, decoded) {
		if (err) {
			res.status(500).send(`Detokenized failure: ${err}`);
			return err;
		}
		else {
			req.body = decoded;
			next();
		}
	});
}

function authentication(req, res, next) {

    let token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, SHARED_SECRET, function(err, decoded) {
      if (err) {
        res.status(500).send(`Detokenized failure: ${err}`);
        return err;
      }
      else {
        req.user = decoded;
        next();
      }
    });
  }

function authorization(req, res, next) {
	// do i have an active authentication for the user_id that is trying to change things

  if (!(req.user)) {
    res.status(403).send(`Forbidden`);
  }
  else {
    if (req.user._doc._id === req.params.userId)
      next();
    else res.status(403).send(`Forbidden`);
  }
}

module.exports = {encrypt, decrypt, detokenize, authentication, authorization, password};