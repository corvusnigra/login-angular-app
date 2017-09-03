// require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('./config.json');



app.use(cors());
// app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());


app.use(expressJwt({
    secret: config.secret,
    getToken: function (req) {
        if(req.header.authorization && req.header.authorization.split(' ')[0] === 'Bearer' ){
            return req.header.authorization.split(' ')[1];
        } else if( req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({ path: ['/users/authenticate', '/users/register']}));


app.use('/users', require('./controllers/users.controller'))




var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});