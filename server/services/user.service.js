var config = require('../config.json');
var jwt = require('jasonwebtoken');
var _ = require('lodash');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo =require('mongoskin');

var db = mongo.db(config.connectionString, {native_parser: true});
db.bind('users');

var service = {};

service.authenticate = authenticate;


module.exports = service;

function authenticate(username, password) {
    var deffered = Q.defer();

    db.users.findOne({username: username}, function (err, user) {
        if(err){
            deffered.reject(err.name + ':' + err.message);
        }

        if(user && bcrypt.compareSync(password, user.hash)){
            deffered.resolve({
                _id: user_id,
                username: user.name,
                firstName: user.firstName,
                lastName: user.lastName,
                token: jwt.sign({sub: user._id}, config.secret)
            })
        } else {
            deffered.resolve();
        }
    });

    return deffered.promise;
}
