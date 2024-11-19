/* jshint undef: false, esversion: 6 */

// need this for starting automatically as a service
process.chdir(__dirname);

var express = require('express');
var path = require('path');
var fs = require('fs');
const https = require('https');
const app = express();


var mysql = require('mysql');
var bodyParser = require('body-parser');

//start mysql connection
var connection = mysql.createConnection({
  host: 'localhost', //mysql database host name
  user: 'root', //mysql database user name
  password: 'Enter321', //mysql database password
  database: 'shoppingcart' //mysql database name
});

connection.connect(function (err) {
  if (err) throw err
  console.log('You are now connected...')
})
//end mysql connection

//start body-parser configuration
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

//rest api to get all results
app.get('/api/listofitems', function (req, res) {
  connection.query('select * from items', function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.post('/api/saveitemlist', function (req, res) {
  var postData = req.body;
  console.log(postData);
  postData= JSON.parse(postData.cartinfo); 
  console.log(postData);
  var query = 'INSERT INTO shoppingcart.USERCARTINFO (DELIVERYADDRESS, AMOUNT) VALUES '
    + "( '" + postData.DELIVERYADDRESS + "', " + postData.AMOUNT + '); ';
    console.log(query);
  connection.query(query, [], function (error, results, fields) {
    if (error){ 
      console.log(query);
      throw error;
    //res.end(JSON.stringify(results));
    }
    else {     
      var query = 'INSERT INTO shoppingcart.USERCARTMAPPING (ORDERID, USERID, ITEMID, ITEMCOUNT) VALUES ';
      for(var i=0; i<postData.ITEMNAMES.length; i++){
        query +=   "((select ORDERID from shoppingcart.usercartinfo ORDER BY  ORDERID DESC limit 1),(SELECT ID FROM shoppingcart.USERS WHERE USERNAME='" + postData.USERNAME + "'), "
        + "(SELECT ID FROM shoppingcart.ITEMS WHERE NAME = '" + postData.ITEMNAMES[i] + "'), " + postData.ITEMCOUNTS[i]+")";
        query +=" , ";
      
      }
      query= query.replace(/,\s*$/, ""); 

        
        console.log(query);

      connection.query(query, [], function (error, results, fields) {
       
        if (error) {
          throw error;
          
        }
        res.end(JSON.stringify(results));
      });
    }
  });
});

app.get('/api/loginvalidation/:username/:password', function (req, res) {
  connection.query('select * from users where username=? AND password=?', [req.params.username, req.params.password], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.get('/api/orderidinformation/:orderid', function (req, res) {
  connection.query('select * from users where orderid=?', [req.params.orderid], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.get('/api/usercartinformation/:username', function (req, res) {
  var user= req;
  console.log(req.params);
  connection.query('SELECT usercartmapping.ORDERID,usercartmapping.ITEMID,usercartmapping.ITEMCOUNT,items.LABEL,items.NAME,usercartinfo.AMOUNT FROM usercartmapping INNER JOIN users ON users.ID = usercartmapping.USERID INNER JOIN items ON usercartmapping.ITEMID=items.ID INNER JOIN usercartinfo ON usercartmapping.ORDERID=usercartinfo.ORDERID where users.USERNAME=? order by ORDERID desc' , [req.params.username], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});
app.use('/src', express.static(__dirname + "/src"));
app.use(express.static(__dirname + "/dist"));

const options = {
  key: fs.readFileSync('ssl/lcosvpn400a-https.pem'),
  cert: fs.readFileSync('ssl/lcosvpn400a-https.cert'),
  ca: [fs.readFileSync('ssl/ca-chain.cert')],
  requestCert: false,
  rejectUnauthorized: false
};

const server = https.createServer(options, app).listen(443, function () {
  console.log('listening on 0.0.0.0:443');
});

module.exports = server;