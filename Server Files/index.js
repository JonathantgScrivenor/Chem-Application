var app = require("express")();
var http = require('http').Server(app);
var io = require("socket.io")(http);
const {MongoClient} = require('mongodb');

//Load html
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

//client connection
io.on('connection', function(socket) {
    console.log("A user is connected");
});

//connection to LocalHost
http.listen(3000, function() {
    console.log("Listening on 3000");
});

//MongoDB connection
const uri = "mongodb+srv://localhost:3000/?poolSize=20&writeConcern=majority";
const DBclient = new MongoClient(uri);

async function run() {
  try {
    await DBclient.connect();
    await DBclient.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {

    await DBclient.close();
  }
}
run().catch(console.dir);

//login page
io.on("login_register", function(data){
    const user = data.user,
    pass = data.pass;
    DBclient.query("SELECT * FROM users WHERE Username=?", [user], function(err, rows, fields){
    if(rows.length == 0){
    console.log("nothing here");

    }else{
    console.log("here");
    }
    });

    io.emit("logged_in", {user: user});

    //Load html
    app.get("/", function(req, res) {
    res.sendFile(__dirname + '/login.html');
});
  });

