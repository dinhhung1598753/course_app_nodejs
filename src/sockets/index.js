const admin = require("firebase-admin");
const comment = require("./comment");


var serviceAccount = require("./../../serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

var db = admin.database();
var ref = db.ref("/comments");


function socketIO(io) {
  io.on('connection', function (socket) {
    console.log(socket.id, " connected")
    // ref.off()
    socket.on("send-info", function(data){
      socket.userId = data.userId
      socket.userName = data.userName
    })
    socket.on("disconnect", function () {
      console.log(socket.id, "disconnect")
    })

    comment(socket, ref)

  })
}

module.exports = socketIO;
