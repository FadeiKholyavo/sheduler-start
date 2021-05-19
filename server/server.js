const express = require("express");
const bodyParser = require("body-parser");
const mysqlConfig = require("./bd-connection-config");

const app = express();
const port = 3000;
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/../public/"));

const util = require("util");
const mysql = require('mysql');

const connectionPool = mysql.createPool(mysqlConfig);
connectionPool.query = util.promisify(connectionPool.query);

const router = require("./router");
const Storage = require("./storage");

const storage = new Storage(connectionPool);
router.setRoutes(app, "/events", storage);

// start server
app.listen(port, () => {
    console.log("Server is running on port " + port + "...");
});
