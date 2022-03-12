const admin = require("firebase-admin");

var serviceAccount = require("./../../serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://course-app-98842-default-rtdb.asia-southeast1.firebasedatabase.app"
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
    
    socket.on("comment-lesson", function (data) {
      console.log("join room", data)
      socket.leave(socket.lessonRoom);
      socket.join(`lesson-${data}`)
      socket.lessonRoom = `lesson-${data}`
      const commentRef = ref.child(socket.lessonRoom);
      
      // commentRef.on('value', (snapshot) => {
      //   // console.log(snapshot.val())
      //   if(snapshot.val()){
      //     socket.emit("init-comment", snapshot.val())
      //   }
      // });

      let index =0
      commentRef.off()
      commentRef.on('child_added', (snapshot) => {
        // console.log(snapshot.key)
        let res = snapshot.val();
        res.key = snapshot.key
        console.log("gửi cmt ", index++)
        console.log(io.engine.clientsCount)
        io.sockets.in(socket.lessonRoom).emit("new-comment", res)
      });
    })
    socket.on("send-comment", function (data) {
      io.sockets.emit("message", {name: "Hoàng Đình Hùng", message: " Xin chào bạn đến với Hstudy"})
      try {
        const commentRef = ref.child(socket.lessonRoom);
        if(data){
          commentRef.push({
            userId: socket.userId,
            userName: socket.userName,
            comment: data.comment
          })
          
        }
      } catch (error) {
        console.log(error)
      }
      
    })
    socket.on("leave-room", function () {
      console.log("leave room")
      socket.leave(socket.lessonRoom);
      socket.lessonRoom = ''
    })
    socket.on("disconnect", function () {
      console.log(socket.id, "disconnect")
    })
  })
}

module.exports = socketIO;
