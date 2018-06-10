var express = require('express');
var http = require('http');
var path = require("path");
var io = require('socket.io');
var bodyParser = require('body-parser')
var express = require('express');
var Metronome = require('timepiece').Metronome;
var currplayer = 0;
var appTempo = 340;
var userID = 0;
var playerAmount = 0;
var globalbarType = 0;
var currtimesec = 30;
var currtimemin = 0;
var currtimesecrev = 0;
var currtimesminrev = 0;

var currPlayers = [];
var currPlayerColor = [];


var app = express();
var server  = http.createServer(app);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


var width = 16;
var height = 16;
var seqarraystate = [];


var port = process.env.PORT || 3000;


function init(){
  for (var i = 0; i < width*height; i++){
    //seqarraystate[i] = [];
    seqarraystate[i] = {instrument: 'synth00',
    color: 'white',
    activated: 0,
    isAdded: 0,
    gesture: {},
    voxelPos : { x : "", y : "" , z : ""},
    voxelName : "",
    intersectObject: {},
    serverUID: userID};
  }
}

init();


function resetGrid(){
  for (var i = 0; i < width*height; i++){

    // seqarraystate[i].instrument = 'synth01';
    // seqarraystate[i].color = 'white';
    seqarraystate[i].activated = 0;
    seqarraystate[i].isAdded = 0;
    // seqarraystate[i].voxelPos = { x : "", y : "" , z : ""};
    // seqarraystate[i].voxelName = "";
    // seqarraystate[i].intersectObject = {};

  }
  currtimesec = 30;
  currtimemin = 0;
  globalbarType = 0;
  //sockets.emit('sendSteps', seqarraystate);
  sockets.emit('resetAll', seqarraystate);

  console.log('reset all');

}

app.get('/GetGridSize', function(req,res){
  res.setHeader('Content-Type', 'application/json');
  var obj = {
    "array": seqarraystate,
    "width": width,
    "height": height,
    "userNumber": userID
  }
  res.send(obj)
});

var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

var sockets = io(server);
// configure socket handlers
sockets.on('connection', function(socket){

  // send current state to this client that connected only

  sockets.emit('sendSteps', seqarraystate);
  console.log('emmiting array to new yser')

  //Hi this is all the users connected

  sockets.emit('usercount', sockets.engine.clientsCount);
  //console.log('User num: ', sockets.engine.clientsCount);

  var randomID = 1 + Math.floor(Math.random() * 7);
  playerAmount = playerAmount + 1;
  // console.log('playerAmount', playerAmount);
  userID = randomID;


  ////stepsreset


  socket.on('login', function(data){
    console.log(data.userId + ' connected');

    //saving userId to array with socket ID
    var currClientColor =  data.userId;
    //console.log(socket.id);
    var currClient = socket.id;


    currPlayers.push( {currClient: currClient, currClientColor: currClientColor} );


    currPlayerColor = currPlayers.map(function(player) {
      return player.currClientColor;
    });

    // console.log('currPlayerColor ',currPlayerColor);

  });

  sockets.emit('playerColors', currPlayerColor);


  socket.send(socket.id);



  console.log('a user connected',socket.id);

  // socket.on('sendClickedCell', function(data){
  //   console.log('somthing');
  //   var clickedCell = data.Data;
  //   console.log(clickedCell);
  // });

  socket.on('sendStep', function(data){
    var clickedCell = data.Data;
    var currObjectToBeCopied = data.currobject;
    var serverIntersect = data.currIntersect;

    // console.log('beforecopy', clickedCell , seqarraystate[clickedCell]);
    // console.log('currObject', clickedCell, currObjectToBeCopied);
    // console.log(serverIntersect);
    seqarraystate[clickedCell].instrument = currObjectToBeCopied.instrument;
    seqarraystate[clickedCell].color = currObjectToBeCopied.color;
    seqarraystate[clickedCell].activated = currObjectToBeCopied.activated;
    seqarraystate[clickedCell].isAdded = currObjectToBeCopied.isAdded;
    seqarraystate[clickedCell].voxelPos = currObjectToBeCopied.voxelPos;
    seqarraystate[clickedCell].voxelName = currObjectToBeCopied.voxelName;
    seqarraystate[clickedCell].serverUID = currObjectToBeCopied.serverUID;
    seqarraystate[clickedCell].intersectObject = serverIntersect;

    // console.log('aftercopy',  seqarraystate[clickedCell].intersectObject);

    if( seqarraystate[clickedCell].isAdded == 0 ){
      seqarraystate[clickedCell].isAdded = 1;
    } else {
      seqarraystate[clickedCell].isAdded = 0;
    }
    // console.log('seqarraystate', clickedCell, "is", seqarraystate[clickedCell].isAdded)

    // console.log('sending array to everybody');
    userID = sockets.engine.clientsCount;
    for (let i = 0; i < width*height; i ++){
      if (seqarraystate[i].isAdded > 0){
        // console.log('Cell selected', i);
      }
    }
  });



  socket.on('sendGesture', function(data){
    var clickedCell = data.Data;
    var clientGestureTime = data.pressedGestureTime;
    seqarraystate[clickedCell].gesture = clientGestureTime;
    // console.log(seqarraystate[clickedCell].gesture.time);
    sockets.emit('sendSteps', seqarraystate);



  });


  //console.log('a user connected',socket.id);
  socket.on('ClientReset', function(resetfromclient){
    resetGrid();

    //console.log('userreset');
  });



  socket.on('disconnect', function(){
    //Hi somebody dissconencted we have a different count!
    playerAmount = playerAmount - 1;

    console.log(currPlayers[socket.id] + ' disconnected');
    var playertoDelete = socket.id;


    for (var i = 0; i < currPlayers.length; i++ ){
      //console.log('log in loop', playertoDelete);

      if (currPlayers[i].currClient == playertoDelete){
        //console.log("delete");
        currPlayers.splice(i,1);
        currPlayerColor.splice([i], 1);
      }

    }
    //console.log('currPlayers list', currPlayers);
    console.log('currPlayerColor ',currPlayerColor);

    sockets.emit('playerColors', currPlayerColor);
    sockets.emit('usercount', sockets.engine.clientsCount);

    //console.log('User num: ', sockets.engine.clientsCount);
  });
});



////////////////tempo///////////
// By default, a metronome object is set to 60 bpm.
var metronome = new Metronome();
// But you could also initialize one at another tempo.
// It emits a 'tick' event on each beat
metronome.set(appTempo);

metronome.on('tick', function(){
  currplayer ++;
  if (currplayer == 16){
    currplayer = 0;
    globalbarType ++;
    sockets.emit('globalTimetype', globalbarType);
  }
  if (globalbarType >= 55){
    appTempo = 0;
  }



  sockets.emit('currplayer', currplayer);
});
metronome.start();



//
// ////////////////time///////////
// // By default, a metronome object is set to 60 bpm.
// var time = new Metronome();
// // But you could also initialize one at another tempo.
// // It emits a 'tick' event on each beat
// time.set(60);
//
// time.on('tick', function(){
//   currtimesec ++
//
//   if (currtimesec >= 60){
//     currtimemin ++;
//     currtimesec = 0;
//   }
//
//   currtimesecrev = 60 - currtimesec;
//   currtimeminrev = 2 - currtimemin;
//
//   if((currtimesecrev == 1) && (currtimeminrev == 0)){
//     // resetGrid();
//   }
//
//   sockets.emit('currTime',currtimesecrev, currtimeminrev);
//
//
// });
// time.start();
//
// ////////////////time///////////
