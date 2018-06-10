console.log(THREE);


var height = 16;
var width = 16;
var cellsWidth = 16;
var userNo = 0;
var seqarr = [];
var globalTick = 0;
var currsec = 0;
var currmin = 0;
var listCellState = {};
var currColor = 0x939393;
var voxelPlayer ;
var checkId = false;
var id = 0;
var pattern01=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var LydianScalesA = [1,3,5,7,8,10,12,13,15,17,19,20,22,24,26,27];
var minNoteSizeY = 10;
var tween;
var tweenScale;
var animatedColor;
var nowPlayedColor = {r: .8, g: .95, b: .6};
var onLoad = false;
var clientCounter = 0;
var currCell = 0;
var currbar = 0;
var arrayrecieved = false;
var voxleName = '';
var addRemove = '';
var buttonArrayState = [];
var currScale = .3;
var buttonAnimSpeed = 80;
var playerColorArray = [0xF10037, 0xF9D710, 0x785ABA, 0xCC864E, 0x4DDB87, 0xE57165, 0x48C2FF];
var fontLoaded = false;
var bgAboutButton;
var lightBoxOn = false;
var rollOverMesh, rollOverMaterial;

var unhoveredButtonScale = .24;
var unhoveredButtonScaleUp = .35;

var mouseDownEvent = false;

//button variables
var buttonRaycaster = new THREE.Raycaster();
var hoverRaycaster = new THREE.Raycaster();
var clickRaycaster = new THREE.Raycaster();

var INTERSECTED;
var HOVER_INTERSECTED;
var CLICK_INTERSECTED;

var radius = 500;
var theta = 0;
var frustumSize = 1000;
var controlButtonObjects = [];
var appButtonObjects = [];
var currID = 0;

var mousePressed = false;
var noteCounter = 0;

var container;
var camera, scene, renderer;
var plane;
var mouse, raycaster, isShiftDown = false;
var cameraPositionX = 200;
var stageSize = 1000;

var boxSize = 62.5;

var intersects;
var intersect;

var pressedPointX = 0;
var pressedPointY = 0;
var pressedPointZ = 0;

var playerGeometry = new THREE.BoxGeometry( boxSize, boxSize/9, stageSize );
var playerMaterial = new THREE.MeshLambertMaterial( { color: 0xeeeeee, overdraw: 0.5 } );

var objects = [];
var notes = [];
var thisnotationArr = []

var protoObject1;
var protoObject2;
var protoObject3;
var protoObject4;
var protoObject5;
var protoObject6;
var protoObject7;




////---------> Code



function buildArrayForGridState(listCellState, synth, currCell, voxleName){

  if (listCellState[currCell].activated!==1){
    listCellState[currCell].activated = 1;
    if (synth == 'red'){
      listCellState[currCell].instrument = 'synth01';
    }
    if (synth == 'yellow'){
      listCellState[currCell].instrument = 'synth02';
    }
    if (synth == 'purple'){
      listCellState[currCell].instrument = 'synth03';
    }
    if (synth == 'gold'){
      listCellState[currCell].instrument = 'synth04';
    }
    if (synth == 'green'){
      listCellState[currCell].instrument = 'synth05';
    }
    if (synth == 'salmon'){
      listCellState[currCell].instrument = 'synth06';
    }
    if (synth == 'blue'){
      listCellState[currCell].instrument = 'synth07';
    }
    if (synth == 'aqua'){
      listCellState[currCell].instrument = 'synth08';
    }
    if (synth == 'darkgreen'){
      listCellState[currCell].instrument = 'synth09';
    }
    if (synth == 'lightpink'){
      listCellState[currCell].instrument = 'synth10';
    }
    if (synth == 'darkblue'){
      listCellState[currCell].instrument = 'synth11';
    }
    listCellState[currCell].color = currColor;
  }else {
    listCellState[currCell].activated = 0;
  }
  listCellState[currCell].voxelName = currCell + listCellState[currCell].instrument;
  return listCellState;
}


function showBox(){
  document.getElementById("aboutbox").style.display = "block";

}
function hideBox(){
  document.getElementById("aboutbox").style.display = "none";
}


function tweenScaleUp(firstScale, secondScale ,duration, delayTime1){
  var tweenToScale = new TWEEN.Tween(firstScale)
  .to(secondScale, duration)
  .repeat( 1 )
  .delay( 0 )
  .yoyo( false )
  .easing(TWEEN.Easing.Quartic.In)
  .start();
  return currScale;
}


/// map Numbers



function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

/// on page load do the next things:

$.ajax({
  url: "/GetGridSize",
  context: document.body
}).done(function(data) {
  width = data.width;
  height = data.height;
  seqarr = data.array;
  userNo = data.userNumber;
  //listCellState = seqarr;

  // assign color and to client
  function assignColor(){

    if (userNo == 0){
      synth = 'white';
      currColor = 0xff0000;
      buttonArrayState = [0,0,0,0,0,0,0];
    }

    if (userNo == 1){
      synth = 'red';
      currColor = 0xF10037;
      buttonArrayState = [1,0,0,0,0,0,0];
    }

    if (userNo == 2){
      synth = 'yellow';
      currColor = 0xF9D710;
      buttonArrayState = [0,1,0,0,0,0,0];
    }

    if (userNo == 3){
      synth = 'purple';
      currColor = 0x785ABA;
      buttonArrayState = [0,0,1,0,0,0,0];
    }

    if (userNo == 4){
      synth = 'gold';
      currColor = 0xCC864E;
      buttonArrayState = [0,0,0,1,0,0,0];
    }

    if (userNo == 5){
      synth = 'green';
      currColor = 0x4DDB87;
      buttonArrayState = [0,0,0,0,1,0,0];
    }

    if (userNo == 6){
      synth = 'salmon';
      currColor = 0xE57165;
      buttonArrayState = [0,0,0,0,0,1,0];
    }

    if (userNo == 7){
      synth = 'blue';
      currColor = 0x48C2FF;
      buttonArrayState = [0,0,0,0,0,0,1];
    }

    // console.log('synth', synth);
    socket.emit('login',{userId: synth});

  }
  assignColor();
});




// instatiate notation array
for (i = 0 ; i < 300 ; i++){
  thisnotationArr[i] = false;
}


// instatiate listCellState array
for (var i = 0; i < width*height; i++){
  //seqarraystate[i] = [];
  listCellState[i] = {instrument: '',
  color: 'white',
  activated: 0,
  isAdded: 0,
  gesture: {},
  voxelPos : { x : "", y : "" , z : ""},
  voxelName : "",
  intersectObject: {},
  serverUID: 0};
}


//on page load finish do the next things:

window.onload = function() {
  onLoad = true;
  // console.log("onLoad",onLoad);
  // add all the objects from array recieved from server:
  if (seqarr[0] != null){
    updatevoxels();
    for ( let i = 0; i < width*height; i++ ){
      if (seqarr[i].isAdded > 0){
      }
    }
  }
};


init();


function loadModels(loadingManager=null){

  if(!loadingManager){
    return;

  }
  // console.log("what");
  var loader = new THREE.OBJLoader( loadingManager );
  loader.load( 'models/tower06.obj', function ( noteObject ) {
    noteObject.traverse( function ( child ) {
      if ( child instanceof THREE.Mesh ) {
        // child.material = texture;
        protoObject1 = child;
      }
    });
  });

  loader.load( 'models/tower08.obj', function ( noteObject ) {
    noteObject.traverse( function ( child ) {
      if ( child instanceof THREE.Mesh ) {
        // child.material = texture;
        protoObject2 = child;
      }
    });
  });

  loader.load( 'models/tower03.obj', function ( noteObject ) {
    noteObject.traverse( function ( child ) {
      if ( child instanceof THREE.Mesh ) {
        // child.material = texture;
        protoObject3 = child;
      }
    });
  });

  loader.load( 'models/tower01.obj', function ( noteObject ) {
    noteObject.traverse( function ( child ) {
      if ( child instanceof THREE.Mesh ) {
        // child.material = texture;
        protoObject4 = child;
      }
    });
  });

  loader.load( 'models/tower04.obj', function ( noteObject ) {
    noteObject.traverse( function ( child ) {
      if ( child instanceof THREE.Mesh ) {
        // child.material = texture;
        protoObject5 = child;
      }
    });
  });

  loader.load( 'models/tower09.obj', function ( noteObject ) {
    noteObject.traverse( function ( child ) {
      if ( child instanceof THREE.Mesh ) {
        // child.material = texture;
        protoObject6 = child;
      }
    });
  });

  loader.load( 'models/tower07.obj', function ( noteObject ) {
    noteObject.traverse( function ( child ) {
      if ( child instanceof THREE.Mesh ) {
        // child.material = texture;
        protoObject7 = child;
      }
    });
  });
}


function init() {

  var loadingManager = new THREE.LoadingManager();

  loadModels(loadingManager);

  loadingManager.onLoad = () =>{
    render();
  }

  /// Create div Element In HTML file
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  //Camera setup
  //Set Aspect Ratio at width/height
  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
  //setCameraPosition
  var randomRCameraZpos = Math.floor(Math.random() * 1900);

  camera.position.set( 900, 1500, 1400 );
  camera.lookAt( new THREE.Vector3() );

  var controls = new THREE.OrbitControls( camera );

  //Scene Setup
  scene = new THREE.Scene();
  //Scene BG Color
  scene.background = new THREE.Color( 0xffffff );

  // Grid
  var gridHelper = new THREE.GridHelper( stageSize, width, 0xF2F5F4, 0xF2F5F4 );
  scene.add( gridHelper );

  //add sound player
  voxelPlayer = new THREE.Mesh( playerGeometry, playerMaterial );
  scene.add( voxelPlayer );

  //Raycaster

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  var geometry = new THREE.PlaneBufferGeometry( stageSize, stageSize );
  geometry.rotateX( - Math.PI / 2 );

  plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );

  scene.add( plane );
  objects.push( plane );
  plane.name = 'plane';

  var material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } );


  var rollOverGeo = new THREE.BoxGeometry( boxSize, 2, boxSize );
	rollOverMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.07, transparent: true, visible: false  });
	rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial );
  rollOverMesh.name = 'rollOverMesh';
	scene.add( rollOverMesh );
  objects.push(rollOverMesh);

  // Lights

  // var ambientLight = new THREE.AmbientLight( 0x5BAFAD );
  // scene.add( ambientLight );

  var hemLight = new THREE.HemisphereLight( 0xffffff, 0xF2F2D6, .5 );
  scene.add( hemLight );

  var directionalLight = new THREE.DirectionalLight( 0xf4f0e6,  0.6 );
  directionalLight.position.x = .45;
  directionalLight.position.y = .6;
  directionalLight.position.z = .5;
  directionalLight.position.normalize();
  scene.add( directionalLight );

  var directionalLight = new THREE.DirectionalLight( 0xf4f0e6,  0.2 );
  directionalLight.position.x = -.45;
  directionalLight.position.y = .6;
  directionalLight.position.z = -.5;
  directionalLight.position.normalize();
  scene.add( directionalLight );


  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setClearColor(new THREE.Color(0xFFFFFF, 1.0));
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild(renderer.domElement);
  container.style.zIndex = "-2";

  //AddClickListeners

  document.addEventListener( 'mouseup', onDocumentMouseUp, false );
  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  document.addEventListener("touchstart", onDocumentMouseDown, false);
  document.addEventListener("touchend", onDocumentMouseUp, false);
  window.addEventListener( 'resize', onWindowResize, false );
  document.addEventListener( 'mousemove', onMouseMove, false );

  //end load function



  for (let i = 0; i < 16; i ++ ){
    var polyFontLoader = new THREE.FontLoader();
    polyFontLoader.load( 'fonts/Roboto Mono Light_Regular.json', function ( font ) {

      var xMid
      var fontText;
      var textShape = new THREE.BufferGeometry();

      var color = 0x717272;

      var matDark = new THREE.LineBasicMaterial( {
        color: 0x717272,
        side: THREE.DoubleSide
      } );

      var matLite = new THREE.MeshBasicMaterial( {
        color: 0x717272,
        transparent: true,
        opacity: 1.0,
        side: THREE.DoubleSide
      } );

      var message = 16-i + '°';
      var shapes = font.generateShapes( message, 15, 4 );
      var geometry = new THREE.ShapeGeometry( shapes );

      geometry.computeBoundingBox();

      xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

      geometry.translate( xMid, 0, 0 );

      // make shape ( N.B. edge view not visible )

      textShape.fromGeometry( geometry );

      fontText = new THREE.Mesh( textShape, matLite );
      fontText.position.z = i*boxSize;
      fontText.position.y = 0;
      fontText.position.x = 0;
      fontText.translateZ( - 500 + boxSize/2 );
      fontText.translateX( - 500 - boxSize/1.2 );
      fontText.rotation.x = -90 * (Math.PI / 180);;

      scene.add( fontText );


    } );
  }


  for (let i = 0; i < 16; i ++ ){
    var polyFontLoader = new THREE.FontLoader();
    polyFontLoader.load( 'fonts/Roboto Mono Light_Regular.json', function ( font ) {

      var xMid
      var fontText;
      var textShape = new THREE.BufferGeometry();


      // console.log(i%4);
      if (i%4 == 0){
        var color = 0x717272;
      } else {
        var color = 0xDBDBDB;
      }


      var matDark = new THREE.LineBasicMaterial( {
        color: color,
        side: THREE.DoubleSide
      } );

      var matLite = new THREE.MeshBasicMaterial( {
        color: color,
        transparent: true,
        opacity: 1.0,
        side: THREE.DoubleSide
      } );

      var message = i+1;
      var shapes = font.generateShapes( message, 15, 4 );
      var geometry = new THREE.ShapeGeometry( shapes );

      geometry.computeBoundingBox();

      xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

      geometry.translate( xMid, 0, 0 );

      // make shape ( N.B. edge view not visible )

      textShape.fromGeometry( geometry );

      fontText = new THREE.Mesh( textShape, matLite );
      fontText.position.z = 0;
      fontText.position.y = 0;
      fontText.position.x = i*boxSize;
      fontText.translateZ(  500 + boxSize/1.2 );
      fontText.translateX( - 500 + boxSize/2 );
      fontText.rotation.x = -90 * (Math.PI / 180);;
      scene.add( fontText );
    } );
  }
  loadText();
}

function loadText(){

  // font loader//
  var polynoteFontLoader = new THREE.FontLoader();
  polynoteFontLoader.load( 'fonts/Roboto Mono Medium_Regular.json', function ( font ) {

    var xMid
    var fontText;
    var textShape = new THREE.BufferGeometry();

    var color = 0xA3A3A3;

    var matDark = new THREE.LineBasicMaterial( {
      color: color,
      side: THREE.DoubleSide
    } );

    var matLite = new THREE.MeshBasicMaterial( {
      color: color,
      transparent: true,
      opacity: 1.0,
      side: THREE.DoubleSide
    } );

    var message = "Polynote";
    var shapes = font.generateShapes( message, 15, 4 );
    var geometry = new THREE.ShapeGeometry( shapes );

    geometry.computeBoundingBox();

    xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

    geometry.translate( xMid, 0, 0 );
    // make shape ( N.B. edge view not visible )
    textShape.fromGeometry( geometry );

    fontText = new THREE.Mesh( textShape, matLite );
    fontText.position.z = 0;
    fontText.position.y = 0;
    fontText.position.x = 0;
    fontText.rotation.x = -90 * (Math.PI / 180);;
    fontText.translateY( 0 );
    fontText.translateX( 0 );
    fontText.name = 'polynote';
    scene.add( fontText );
    appButtonObjects.push ( fontText );
    // console.log( fontText.name );
    fontLoaded = true;
  } );

  setTimeout(() => loadAboutButton(), 10);
}

function loadAbout(){
  var aboutFontLoader = new THREE.FontLoader();
  aboutFontLoader.load( 'fonts/Roboto Mono Light_Regular.json', function ( font ) {
    var aboutxMid;
    var aboutFontText;
    var aboutTextShape = new THREE.BufferGeometry();

    var color = 0xA3A3A3;

    var matDark = new THREE.LineBasicMaterial( {
      color: color,
      side: THREE.DoubleSide
    } );

    var matLite = new THREE.MeshBasicMaterial( {
      color: color,
      transparent: true,
      opacity: 1.0,
      side: THREE.DoubleSide
    } );

    var aboutMessage = "About";
    var aboutShapes = font.generateShapes( aboutMessage, 9, 4 );
    var geometry = new THREE.ShapeGeometry( aboutShapes );

    geometry.computeBoundingBox();

    aboutxMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

    geometry.translate( aboutxMid, 0, 0 );
    // make shape ( N.B. edge view not visible )
    aboutTextShape.fromGeometry( geometry );

    aboutFontText = new THREE.Mesh( aboutTextShape, matLite );
    aboutFontText.position.z = 0;
    aboutFontText.position.y = 0;
    aboutFontText.position.x = 0;
    aboutFontText.rotation.x = -90 * (Math.PI / 180);;
    aboutFontText.translateY( 0 );
    aboutFontText.translateX( 0 );
    aboutFontText.name = 'about';
    scene.add( aboutFontText );
    appButtonObjects.push ( aboutFontText );
    // console.log( aboutFontText.name );
  } );
  setTimeout(() => loadButtonbyOrder(), 10);
}



function loadAboutButton(){
  //  about button BG
  var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
  var material = new THREE.MeshBasicMaterial( {
    color: 0x48C2FF,
    transparent: true,
    opacity: 0.1,
  } );
  bgAboutButton = new THREE.Mesh( geometry, material );
  bgAboutButton.scale.z = .001;
  bgAboutButton.scale.x = .3;
  bgAboutButton.scale.y = .15;
  //TODO about
  bgAboutButton.name = 'aboutBG';
  scene.add( bgAboutButton );
  appButtonObjects.push ( bgAboutButton );
  // console.log(bgAboutButton.name);
  setTimeout(() => loadAbout(), 12);

}


function loadButtonbyOrder(){
  for (let i = 0; i < 7; i++){
    if ( i==0 ){
      var noteButtonObject = protoObject1.clone();
    } else if( i==1 ){
      var noteButtonObject = protoObject2.clone();
    } else if( i==2 ){
      var noteButtonObject = protoObject3.clone();
    } else if( i==3 ){
      var noteButtonObject = protoObject4.clone();
    }else if( i==4 ){
      var noteButtonObject = protoObject5.clone();
    }else if( i==5 ){
      var noteButtonObject = protoObject6.clone();
    }else if( i==6 ){
      var noteButtonObject = protoObject7.clone();
    }

    var protoMat = new THREE.MeshLambertMaterial( { color: playerColorArray[i] }  );
    noteButtonObject.material = protoMat;

    var selectedTexture = new THREE.MeshLambertMaterial( { color: playerColorArray[i] }  );

    var materialSynth01 = new THREE.MeshLambertMaterial( { color: playerColorArray[i] }  );
    var materialSynth02 = new THREE.MeshLambertMaterial( { color: playerColorArray[i] }  );
    var materialSynth03 = new THREE.MeshLambertMaterial( { color: playerColorArray[i] }  );
    var materialSynth04 = new THREE.MeshLambertMaterial( { color: playerColorArray[i] }  );
    var materialSynth05 = new THREE.MeshLambertMaterial( { color: playerColorArray[i] }  );
    var materialSynth06 = new THREE.MeshLambertMaterial( { color: playerColorArray[i] }  );
    var materialSynth07 = new THREE.MeshLambertMaterial( { color: playerColorArray[i] }  );

    // noteButtonObject.rotation.copy( camera.rotation );
    // noteButtonObject.updateMatrix();
    // noteButtonObject.translateZ( - 1000 );
    // noteButtonObject.material = materialSynth01;
    // noteButtonObject.material.opacity = .5;
    // noteButtonObject.rotation.z = 0;

    noteButtonObject.scale.x = unhoveredButtonScale;
    noteButtonObject.scale.y = unhoveredButtonScale;
    noteButtonObject.scale.z = unhoveredButtonScale;
    // noteButtonObject.rotation.y = 45 * (Math.PI / 90);
    // noteButtonObject.rotation.x = 180 * (Math.PI / 90);

    noteButtonObject.name = "noteButtonObject"+(i+1) ;
    scene.add( ( noteButtonObject ) );
    controlButtonObjects.push ( noteButtonObject );
  }
}


/////



//window resize
function onWindowResize() {
  //Update Camera aspect Ratio
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}


// update voxels to the scene
function updatevoxels(newSteps) {
  if ( ( listCellState != null ) && ( newSteps != null ) ) {

    for (let i = 0; i < width*height; i++) {

      if ( listCellState[i].isAdded == newSteps[i].isAdded ) {
        // do nothing
      } else if ( listCellState[i].isAdded == 0 && newSteps[i].isAdded == 1 ) {

        if (newSteps[i].instrument == 'synth01'){

          // add a box at this spot to this client's scene
          var scaledHeight = map_range(newSteps[i].gesture.time, 0, 20, 0, 200);
          var cubeGeometry = new THREE.BoxGeometry( boxSize, (scaledHeight+minNoteSizeY), boxSize );
          var cubeMaterial = new THREE.MeshLambertMaterial( { color: newSteps[i].color , overdraw: 0.5, opacity: .1 } );

          var voxel = new THREE.Mesh( cubeGeometry, cubeMaterial );
          voxel.name = i + newSteps[i].instrument ;

          // get the position of the voxel from listCellState
          voxel.position.copy(newSteps[i].voxelPos);
          var tempnumber = voxel.position.y;
          var addedNumber = (-boxSize/2)+((scaledHeight))/2+(minNoteSizeY/2);
          var calcVoxelPosY = addedNumber + tempnumber;

          voxel.position.y = calcVoxelPosY;

          //////////////////////
          ////////add obj///////
          //////////////////////

          var protoInstance = protoObject1.clone();
          var protoMat = new THREE.MeshLambertMaterial( { color: newSteps[i].color , overdraw: 0.5, opacity: .1 } );
          protoInstance.material = protoMat;

          protoInstance.position.copy(newSteps[i].voxelPos);
          protoInstance.position.y = 0;

          var scaledObjectHeight = map_range(newSteps[i].gesture.time, 0.0, 10.0, 0.4, 2.0);
          var selectedTexture = new THREE.MeshLambertMaterial( { color: newSteps[i].color , overdraw: 0.5, opacity: .1 } );
          protoInstance.material = selectedTexture;

          var randomRotationY = Math.floor(Math.random() * 360);

          if (randomRotationY <= 90){
            var thisRotation = 0;
          } else if (randomRotationY >= 90 && randomRotationY<=180){
            var thisRotation = 90 * (Math.PI / 180);
          } else if (randomRotationY >= 180 && randomRotationY <= 270){
            var thisRotation = 180 * (Math.PI / 180);
          } else if (randomRotationY >= 270 && randomRotationY <= 360){
            var thisRotation = 270 * (Math.PI / 180);
          }

          protoInstance.rotation.y = thisRotation;
          protoInstance.scale.y = scaledObjectHeight;

          protoInstance.name = i + newSteps[i].instrument ;
          scene.add( ( protoInstance ) );
          objects.push ( protoInstance );


        } else if (newSteps[i].instrument == 'synth02'){


          // add a box at this spot to this client's scene
          var scaledHeight = map_range(newSteps[i].gesture.time, 0, 20, 0, 200);
          var cubeGeometry = new THREE.BoxGeometry( boxSize, (scaledHeight+minNoteSizeY), boxSize );
          var cubeMaterial = new THREE.MeshLambertMaterial( { color: newSteps[i].color , overdraw: 0.5, opacity: .1 } );

          var voxel = new THREE.Mesh( cubeGeometry, cubeMaterial );
          voxel.name = i + newSteps[i].instrument ;

          // get the position of the voxel from listCellState
          voxel.position.copy(newSteps[i].voxelPos);
          var tempnumber = voxel.position.y;
          var addedNumber = (-boxSize/2)+((scaledHeight))/2+(minNoteSizeY/2);
          var calcVoxelPosY = addedNumber + tempnumber;


          voxel.position.y = calcVoxelPosY;

          var protoInstance = protoObject2.clone();
          var protoMat = new THREE.MeshLambertMaterial( { color: newSteps[i].color , overdraw: 0.5, opacity: .1 } );
          protoInstance.material = protoMat;

          protoInstance.position.copy(newSteps[i].voxelPos);
          protoInstance.position.y = 0;

          var scaledObjectHeight = map_range(newSteps[i].gesture.time, 0.0, 10.0, 0.4, 2.0);
          var selectedTexture = new THREE.MeshLambertMaterial( { color: newSteps[i].color , overdraw: 0.5, opacity: .1 } );
          protoInstance.material = selectedTexture;

          var randomRotationY = Math.floor(Math.random() * 360);

          if (randomRotationY <= 90){
            var thisRotation = 0;
          } else if (randomRotationY >= 90 && randomRotationY<=180){
            var thisRotation = 90 * (Math.PI / 180);
          } else if (randomRotationY >= 180 && randomRotationY <= 270){
            var thisRotation = 180 * (Math.PI / 180);
          } else if (randomRotationY >= 270 && randomRotationY <= 360){
            var thisRotation = 270 * (Math.PI / 180);
          }

          protoInstance.rotation.y = thisRotation;
          protoInstance.scale.y = scaledObjectHeight;

          protoInstance.name = i + newSteps[i].instrument ;
          scene.add( ( protoInstance ) );
          objects.push ( protoInstance );

        } else if (newSteps[i].instrument == 'synth03'){

          // add a box at this spot to this client's scene
          var scaledHeight = map_range(newSteps[i].gesture.time, 0, 20, 0, 200);
          var cubeGeometry = new THREE.BoxGeometry( boxSize, (scaledHeight+minNoteSizeY), boxSize );
          var cubeMaterial = new THREE.MeshLambertMaterial( { color: newSteps[i].color , overdraw: 0.5, opacity: .1 } );

          var voxel = new THREE.Mesh( cubeGeometry, cubeMaterial );
          voxel.name = i + newSteps[i].instrument ;

          // get the position of the voxel from listCellState
          voxel.position.copy(newSteps[i].voxelPos);
          var tempnumber = voxel.position.y;
          var addedNumber = (-boxSize/2)+((scaledHeight))/2+(minNoteSizeY/2);
          var calcVoxelPosY = addedNumber + tempnumber;


          voxel.position.y = calcVoxelPosY;

          var protoInstance = protoObject3.clone();
          var protoMat = new THREE.MeshLambertMaterial( { color: newSteps[i].color , overdraw: 0.5, opacity: .1 } );
          protoInstance.material = protoMat;

          protoInstance.position.copy(newSteps[i].voxelPos);
          protoInstance.position.y = 0;

          var scaledObjectHeight = map_range(newSteps[i].gesture.time, 0.0, 10.0, 0.4, 2.0);
          var selectedTexture = new THREE.MeshLambertMaterial( { color: newSteps[i].color , overdraw: 0.5, opacity: .1 } );
          protoInstance.material = selectedTexture;

          var randomRotationY = Math.floor(Math.random() * 360);

          if (randomRotationY <= 90){
            var thisRotation = 0;
          } else if (randomRotationY >= 90 && randomRotationY<=180){
            var thisRotation = 90 * (Math.PI / 180);
          } else if (randomRotationY >= 180 && randomRotationY <= 270){
            var thisRotation = 180 * (Math.PI / 180);
          } else if (randomRotationY >= 270 && randomRotationY <= 360){
            var thisRotation = 270 * (Math.PI / 180);
          }

          protoInstance.rotation.y = thisRotation;
          protoInstance.scale.y = scaledObjectHeight;

          protoInstance.name = i + newSteps[i].instrument ;
          scene.add( ( protoInstance ) );
          objects.push ( protoInstance );

        } else if (newSteps[i].instrument == 'synth04'){

          // add a box at this spot to this client's scene
          var scaledHeight = map_range(newSteps[i].gesture.time, 0, 20, 0, 200);
          var cubeGeometry = new THREE.BoxGeometry( boxSize, (scaledHeight+minNoteSizeY), boxSize );
          var cubeMaterial = new THREE.MeshLambertMaterial( { color: newSteps[i].color , overdraw: 0.5, opacity: .1 } );

          var voxel = new THREE.Mesh( cubeGeometry, cubeMaterial );
          voxel.name = i + newSteps[i].instrument ;

          // get the position of the voxel from listCellState
          voxel.position.copy(newSteps[i].voxelPos);
          var tempnumber = voxel.position.y;
          var addedNumber = (-boxSize/2)+((scaledHeight))/2+(minNoteSizeY/2);
          var calcVoxelPosY = addedNumber + tempnumber;


          voxel.position.y = calcVoxelPosY;

          var protoInstance = protoObject4.clone();
          var protoMat = new THREE.MeshLambertMaterial( { color: newSteps[i].color , overdraw: 0.5, opacity: .1 } );
          protoInstance.material = protoMat;

          protoInstance.position.copy(newSteps[i].voxelPos);
          protoInstance.position.y = 0;

          var scaledObjectHeight = map_range(newSteps[i].gesture.time, 0.0, 10.0, 0.4, 2.0);
          var selectedTexture = new THREE.MeshLambertMaterial( { color: newSteps[i].color , overdraw: 0.5, opacity: .1 } );
          protoInstance.material = selectedTexture;

          var randomRotationY = Math.floor(Math.random() * 360);
          if (randomRotationY <= 90){
            var thisRotation = 0;
          } else if (randomRotationY >= 90 && randomRotationY<=180){
            var thisRotation = 90 * (Math.PI / 180);
          } else if (randomRotationY >= 180 && randomRotationY <= 270){
            var thisRotation = 180 * (Math.PI / 180);
          } else if (randomRotationY >= 270 && randomRotationY <= 360){
            var thisRotation = 270 * (Math.PI / 180);
          }

          protoInstance.rotation.y = thisRotation;
          protoInstance.scale.y = scaledObjectHeight;

          protoInstance.name = i + newSteps[i].instrument ;
          scene.add( ( protoInstance ) );
          objects.push ( protoInstance );

        } else if (newSteps[i].instrument == 'synth05'){


          // add a box at this spot to this client's scene
          var scaledHeight = map_range(newSteps[i].gesture.time, 0, 20, 0, 200);
          var cubeGeometry = new THREE.BoxGeometry( boxSize, (scaledHeight+minNoteSizeY), boxSize );
          var cubeMaterial = new THREE.MeshLambertMaterial( { color: newSteps[i].color , overdraw: 0.5, opacity: .1 } );

          var voxel = new THREE.Mesh( cubeGeometry, cubeMaterial );
          voxel.name = i + newSteps[i].instrument ;

          // get the position of the voxel from listCellState
          voxel.position.copy(newSteps[i].voxelPos);
          var tempnumber = voxel.position.y;
          var addedNumber = (-boxSize/2)+((scaledHeight))/2+(minNoteSizeY/2);
          var calcVoxelPosY = addedNumber + tempnumber;


          voxel.position.y = calcVoxelPosY;

          var protoInstance = protoObject5.clone();
          var protoMat = new THREE.MeshLambertMaterial( { color: newSteps[i].color , overdraw: 0.5, opacity: .1 } );
          protoInstance.material = protoMat;

          protoInstance.position.copy(newSteps[i].voxelPos);
          protoInstance.position.y = 0;

          var scaledObjectHeight = map_range(newSteps[i].gesture.time, 0.0, 10.0, 0.4, 2.0);
          var selectedTexture = new THREE.MeshLambertMaterial( { color: newSteps[i].color , overdraw: 0.5, opacity: .1 } );
          protoInstance.material = selectedTexture;

          var randomRotationY = Math.floor(Math.random() * 360);

          if (randomRotationY <= 90){
            var thisRotation = 0;
          } else if (randomRotationY >= 90 && randomRotationY<=180){
            var thisRotation = 90 * (Math.PI / 180);
          } else if (randomRotationY >= 180 && randomRotationY <= 270){
            var thisRotation = 180 * (Math.PI / 180);
          } else if (randomRotationY >= 270 && randomRotationY <= 360){
            var thisRotation = 270 * (Math.PI / 180);
          }

          protoInstance.rotation.y = thisRotation;
          protoInstance.scale.y = scaledObjectHeight;

          protoInstance.name = i + newSteps[i].instrument ;
          scene.add( ( protoInstance ) );
          objects.push ( protoInstance );

        } else if (newSteps[i].instrument == 'synth06'){
          // add a box at this spot to this client's scene
          var scaledHeight = map_range(newSteps[i].gesture.time, 0, 20, 0, 200);
          var cubeGeometry = new THREE.BoxGeometry( boxSize, (scaledHeight+minNoteSizeY), boxSize );
          var cubeMaterial = new THREE.MeshLambertMaterial( { color: newSteps[i].color , overdraw: 0.5, opacity: .1 } );

          var voxel = new THREE.Mesh( cubeGeometry, cubeMaterial );
          voxel.name = i + newSteps[i].instrument ;

          // get the position of the voxel from listCellState
          voxel.position.copy(newSteps[i].voxelPos);
          var tempnumber = voxel.position.y;
          var addedNumber = (-boxSize/2)+((scaledHeight))/2+(minNoteSizeY/2);
          var calcVoxelPosY = addedNumber + tempnumber;


          voxel.position.y = calcVoxelPosY;

          var protoInstance = protoObject6.clone();
          var protoMat = new THREE.MeshLambertMaterial( { color: newSteps[i].color , overdraw: 0.5, opacity: .1 } );
          protoInstance.material = protoMat;

          protoInstance.position.copy(newSteps[i].voxelPos);
          protoInstance.position.y = 0;

          var scaledObjectHeight = map_range(newSteps[i].gesture.time, 0.0, 10.0, 0.4, 2.0);
          var selectedTexture = new THREE.MeshLambertMaterial( { color: newSteps[i].color , overdraw: 0.5, opacity: .1 } );
          protoInstance.material = selectedTexture;

          var randomRotationY = Math.floor(Math.random() * 360);
          if (randomRotationY <= 90){
            var thisRotation = 0;
          } else if (randomRotationY >= 90 && randomRotationY<=180){
            var thisRotation = 90 * (Math.PI / 180);
          } else if (randomRotationY >= 180 && randomRotationY <= 270){
            var thisRotation = 180 * (Math.PI / 180);
          } else if (randomRotationY >= 270 && randomRotationY <= 360){
            var thisRotation = 270 * (Math.PI / 180);
          }

          protoInstance.rotation.y = thisRotation;
          protoInstance.scale.y = scaledObjectHeight;

          protoInstance.name = i + newSteps[i].instrument ;
          scene.add( ( protoInstance ) );
          objects.push ( protoInstance );

        } else if (newSteps[i].instrument == 'synth07'){

          // add a box at this spot to this client's scene
          var scaledHeight = map_range(newSteps[i].gesture.time, 0, 20, 0, 200);
          var cubeGeometry = new THREE.BoxGeometry( boxSize, (scaledHeight+minNoteSizeY), boxSize );
          var cubeMaterial = new THREE.MeshLambertMaterial( { color: newSteps[i].color , overdraw: 0.5, opacity: .1 } );

          var voxel = new THREE.Mesh( cubeGeometry, cubeMaterial );
          voxel.name = i + newSteps[i].instrument ;

          // get the position of the voxel from listCellState
          voxel.position.copy(newSteps[i].voxelPos);
          var tempnumber = voxel.position.y;
          var addedNumber = (-boxSize/2)+((scaledHeight))/2+(minNoteSizeY/2);
          var calcVoxelPosY = addedNumber + tempnumber;


          voxel.position.y = calcVoxelPosY;

          var protoInstance = protoObject7.clone();
          var protoMat = new THREE.MeshLambertMaterial( { color: newSteps[i].color , overdraw: 0.5, opacity: .1 } );
          protoInstance.material = protoMat;

          protoInstance.position.copy(newSteps[i].voxelPos);
          protoInstance.position.y = 0;

          var scaledObjectHeight = map_range(newSteps[i].gesture.time, 0.0, 10.0, 0.4, 2.0);
          var selectedTexture = new THREE.MeshLambertMaterial( { color: newSteps[i].color , overdraw: 0.5, opacity: .1 } );
          protoInstance.material = selectedTexture;

          var randomRotationY = Math.floor(Math.random() * 360);

          if (randomRotationY <= 90){
            var thisRotation = 0;
          } else if (randomRotationY >= 90 && randomRotationY<=180){
            var thisRotation = 90 * (Math.PI / 180);
          } else if (randomRotationY >= 180 && randomRotationY <= 270){
            var thisRotation = 180 * (Math.PI / 180);
          } else if (randomRotationY >= 270 && randomRotationY <= 360){
            var thisRotation = 270 * (Math.PI / 180);
          }

          protoInstance.rotation.y = thisRotation;
          protoInstance.scale.y = scaledObjectHeight;

          protoInstance.name = i + newSteps[i].instrument ;
          scene.add( ( protoInstance ) );
          objects.push ( protoInstance );
        }

        //////////////////////////
        /////////end obj load////

        ////add the objects

      } else if (listCellState[i].isAdded == 1 && newSteps[i].isAdded == 0) {

        // remove voxels
        var voxelToRemove = newSteps[i].voxelName;
        var selectedObject = scene.getObjectByName(voxelToRemove);

        scene.remove( selectedObject );
        objects.splice( objects.indexOf( selectedObject ), 1 );

      }
      listCellState[i] = newSteps[i];
    }
  }
}


////////////////////
///socket handlers//
////////////////////


socket.on('sendSteps', function(steps){
  seqarr = steps;
  arrayrecieved = true;
  // console.log('new array recieved from server - steps', steps);
  updatevoxels(steps);

});



socket.on('resetAll', function(stepsreset){
  seqarr = stepsreset;

  for (let r = 0; r < width*height; r ++){

    var voxelToRemove = seqarr[r].voxelName;
    var selectedObject = scene.getObjectByName(voxelToRemove);
    scene.remove( selectedObject );

    //remove all but plane and overlay
    if(objects.length > 3){
      objects.splice( objects.indexOf( selectedObject ), 1 );
    }
  }


  listCellState = seqarr;
  for (i = 0 ; i < 300 ; i++){
    thisnotationArr[i] = false;
  }
  arrayrecieved = true;
});



/////////////////////////
////////////reset////////
////////////////////////





var body = document.querySelector('body');
body.onkeydown = function (e) {
  if ( !e.metaKey ) {
    e.preventDefault();
  }
  if (event.keyCode == 48){
    socket.emit('ClientReset', {'resetfromclient': 1});
  }
};


function animate( time ) {
  requestAnimationFrame( animate );
  TWEEN.update( time );
}
animate();


if (checkId != true){
  checkId = true;
  socket.on('usercount', function(myId){
    id = myId;
    // document.getElementById("p2").innerHTML =  + myId +' players are in this session';
  });
}



socket.on('currplayer', function(incomingTick){
  globalTick = incomingTick;
  //the playerhead animation

  for(var i=0; i < width;i++){
    pattern01[i] = 0;
  }
  pattern01[globalTick] = 1;

  for ( i = 0; i < 16; i ++){
    if(globalTick == i){
      voxelPlayer.position.copy( {x: (-(1000/2)+boxSize*i+(boxSize/2)), y: ((boxSize/9)/2), z: 0});
    }
  }





  function tweenPlayedColor(firstColor, secondColor ,duration, delayTime1){

    var tweenToColor = new TWEEN.Tween(firstColor)
    .to(secondColor, duration)
    .repeat( 1 )
    .delay( 0 )
    .yoyo( true )
    .easing(TWEEN.Easing.Quartic.In)
    .start();
    return  currColor;

  }

  function tweenRotation(firstAngle, secondAngle ,duration, delayTime1){
    var tweenToColor = new TWEEN.Tween(firstAngle)
    .to(secondAngle, duration)
    .repeat( 1 )
    .delay( 0 )
    .yoyo( true )
    .easing(TWEEN.Easing.Quartic.In)
    .start();
    return  currRotation;
  }



  // Check what sounds to play
  if (onLoad == true){
    for (var i = 0; i < (width*height) ;i++){
      if (arrayrecieved == true){
        if(listCellState[i].instrument == 'synth01'){

          if ((listCellState[i].activated==1) && (pattern01[i-(16*0)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note1_1(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .945, g: .717, b: .756} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*1)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note2_1(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .945, g: .717, b: .756} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*2)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note3_1(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .945, g: .717, b: .756} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*3)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note4_1(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .945, g: .717, b: .756} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*4)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note5_1(tempmappednumber);
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .945, g: .717, b: .756} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*5)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note6_1(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .945, g: .717, b: .756} ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*6)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note7_1(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .945, g: .717, b: .756} ,150 , 0);


          } else if((listCellState[i].activated==1) && (pattern01[i-(16*7)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note8_1(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .945, g: .717, b: .756} ,150 , 0);

          } else if((listCellState[i].activated==1) && (pattern01[i-(16*8)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note9_1(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .945, g: .717, b: .756} ,150 , 0);


          } else if((listCellState[i].activated==1) && (pattern01[i-(16*9)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note10_1(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .945, g: .717, b: .756} ,150 , 0);


          } else if((listCellState[i].activated==1) && (pattern01[i-(16*10)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note11_1(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .945, g: .717, b: .756} ,150 , 0);

          } else if((listCellState[i].activated==1) && (pattern01[i-(16*11)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note12_1(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .945, g: .717, b: .756} ,150 , 0);



          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*12)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note13_1(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .945, g: .717, b: .756} ,150 , 0);


          }  else if ((listCellState[i].activated==1) && (pattern01[i-(16*13)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note14_1(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .945, g: .717, b: .756} ,150 , 0);



          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*14)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note15_1(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .945, g: .717, b: .756} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*15)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note16_1(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .945, g: .717, b: .756} ,150 , 0);

          }
        }

        if(listCellState[i].instrument == 'synth02'){

          if ((listCellState[i].activated==1) && (pattern01[i-(16*0)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note16_2(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .984, b: .317}   ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*1)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note15_2(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .984, b: .317}   ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*2)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note14_2(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .984, b: .317}   ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*3)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note13_2(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .984, b: .317}   ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*4)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note12_2(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .984, b: .317}   ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*5)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note11_2(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .984, b: .317}   ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*6)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note10_2(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .984, b: .317}   ,150 , 0);


          } else if((listCellState[i].activated==1) && (pattern01[i-(16*7)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note9_2(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor,{r: .925, g: .984, b: .317}   ,150 , 0);


          } else if((listCellState[i].activated==1) && (pattern01[i-(16*8)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note8_2(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .984, b: .317}   ,150 , 0);


          } else if((listCellState[i].activated==1) && (pattern01[i-(16*9)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note7_2(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .984, b: .317}   ,150 , 0);


          } else if((listCellState[i].activated==1) && (pattern01[i-(16*10)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note6_2(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .984, b: .317}   ,150 , 0);


          } else if((listCellState[i].activated==1) && (pattern01[i-(16*11)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note5_2(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .984, b: .317}   ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*12)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note4_2(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .984, b: .317}   ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*13)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note3_2(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .984, b: .317}   ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*14)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note2_2(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .984, b: .317}   ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*15)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note1_2(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .984, b: .317}   ,150 , 0);


          }
        }

        if(listCellState[i].instrument == 'synth03'){

          if ((listCellState[i].activated==1) && (pattern01[i-(16*0)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note16_3(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .984, b: .317}   ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*1)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note15_3(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .831, g: .776, b: .945} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*2)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note14_3(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .831, g: .776, b: .945} ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*3)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note13_3(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .831, g: .776, b: .945} ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*4)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note12_3(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .831, g: .776, b: .945} ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*5)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note11_3(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .831, g: .776, b: .945} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*6)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note10_3(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .831, g: .776, b: .945} ,150 , 0);

          } else if((listCellState[i].activated==1) && (pattern01[i-(16*7)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note9_3(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .831, g: .776, b: .945} ,150 , 0);

          } else if((listCellState[i].activated==1) && (pattern01[i-(16*8)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note8_3(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .831, g: .776, b: .945} ,150 , 0);

          } else if((listCellState[i].activated==1) && (pattern01[i-(16*9)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note7_3(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .831, g: .776, b: .945} ,150 , 0);

          } else if((listCellState[i].activated==1) && (pattern01[i-(16*10)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note6_3(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .831, g: .776, b: .945} ,150 , 0);

          } else if((listCellState[i].activated==1) && (pattern01[i-(16*11)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note5_3(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .831, g: .776, b: .945} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*12)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note4_3(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .831, g: .776, b: .945} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*13)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note3_3(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .831, g: .776, b: .945} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*14)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note2_3(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .831, g: .776, b: .945} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*15)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note1_3(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .831, g: .776, b: .945} ,150 , 0);

          }
        }

        if(listCellState[i].instrument == 'synth04'){
          var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
          if ((listCellState[i].activated==1) && (pattern01[i-(16*0)] == 1)){
            note16_4(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .990, g: .870, b: .678} ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*1)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note15_4(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .990, g: .870, b: .678} ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*2)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note14_4(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .990, g: .870, b: .678} ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*3)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note13_4(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .990, g: .870, b: .678} ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*4)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note12_4(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .990, g: .870, b: .678} ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*5)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note11_4(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .990, g: .870, b: .678} ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*6)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note10_4(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .990, g: .870, b: .678} ,150 , 0);


          } else if((listCellState[i].activated==1) && (pattern01[i-(16*7)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note9_4(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .990, g: .870, b: .678} ,150 , 0);


          } else if((listCellState[i].activated==1) && (pattern01[i-(16*8)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note8_4(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .990, g: .870, b: .678} ,150 , 0);


          } else if((listCellState[i].activated==1) && (pattern01[i-(16*9)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note7_4(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .990, g: .870, b: .678} ,150 , 0);


          } else if((listCellState[i].activated==1) && (pattern01[i-(16*10)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note6_4(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .990, g: .870, b: .678} ,150 , 0);


          } else if((listCellState[i].activated==1) && (pattern01[i-(16*11)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note5_4(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .990, g: .870, b: .678} ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*12)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note4_4(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .990, g: .870, b: .678} ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*13)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note3_4(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .990, g: .870, b: .678} ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*14)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note2_4(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .990, g: .870, b: .678} ,150 , 0);

            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .990, g: .870, b: .678} ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*15)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note1_4(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .990, g: .870, b: .678} ,150 , 0);


          }
        }

        if(listCellState[i].instrument == 'synth05'){

          if ((listCellState[i].activated==1) && (pattern01[i-(16*0)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note16_5(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .703, g: .999, b: .921} ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*1)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note15_5(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .703, g: .999, b: .921} ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*2)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note14_5(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .703, g: .999, b: .921} ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*3)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note13_5(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .703, g: .999, b: .921} ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*4)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note12_5(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .703, g: .999, b: .921} ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*5)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note11_5(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .703, g: .999, b: .921} ,150 , 0);


          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*6)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note10_5(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .703, g: .999, b: .921} ,150 , 0);


          } else if((listCellState[i].activated==1) && (pattern01[i-(16*7)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note9_5(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .703, g: .999, b: .921} ,150 , 0);


          } else if((listCellState[i].activated==1) && (pattern01[i-(16*8)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note8_5(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .703, g: .999, b: .921} ,150 , 0);


          } else if((listCellState[i].activated==1) && (pattern01[i-(16*9)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note7_5(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .703, g: .999, b: .921} ,150 , 0);

          } else if((listCellState[i].activated==1) && (pattern01[i-(16*10)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note6_5(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .703, g: .999, b: .921} ,150 , 0);

          } else if((listCellState[i].activated==1) && (pattern01[i-(16*11)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note5_5(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .703, g: .999, b: .921} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*12)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note4_5(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .703, g: .999, b: .921} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*13)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note3_5(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .703, g: .999, b: .921} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*14)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note2_5(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .703, g: .999, b: .921} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*15)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note1_5(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .703, g: .999, b: .921} ,150 , 0);

          }
        }

        if(listCellState[i].instrument == 'synth06'){

          if ((listCellState[i].activated==1) && (pattern01[i-(16*0)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note16_6(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .615, b: .682} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*1)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note15_6(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .615, b: .682} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*2)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note14_6(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .615, b: .682} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*3)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note13_6(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .615, b: .682} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*4)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note12_6(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .615, b: .682} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*5)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note11_6(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .615, b: .682} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*6)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note10_6(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .615, b: .682} ,150 , 0);

          } else if((listCellState[i].activated==1) && (pattern01[i-(16*7)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note9_6(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .615, b: .682} ,150 , 0);

          } else if((listCellState[i].activated==1) && (pattern01[i-(16*8)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note8_6(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .615, b: .682} ,150 , 0);

          } else if((listCellState[i].activated==1) && (pattern01[i-(16*9)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note7_6(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .615, b: .682} ,150 , 0);

          } else if((listCellState[i].activated==1) && (pattern01[i-(16*10)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note6_6(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .615, b: .682} ,150 , 0);

          } else if((listCellState[i].activated==1) && (pattern01[i-(16*11)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note5_6(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .615, b: .682} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*12)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note4_6(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .615, b: .682} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*13)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note3_6(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .615, b: .682} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*14)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note2_6(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .615, b: .682} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*15)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note1_6(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .925, g: .615, b: .682} ,150 , 0);

          }
        }

        if(listCellState[i].instrument == 'synth07'){

          if ((listCellState[i].activated==1) && (pattern01[i-(16*0)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note16_7(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .796, g: .862, b: .945} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*1)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note15_7(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .796, g: .862, b: .945} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*2)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note14_7(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .796, g: .862, b: .945} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*3)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note13_7(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .796, g: .862, b: .945} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*4)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note12_7(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .796, g: .862, b: .945} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*5)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note11_7(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .796, g: .862, b: .945} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*6)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note10_7(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .796, g: .862, b: .945} ,150 , 0);

          } else if((listCellState[i].activated==1) && (pattern01[i-(16*7)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note9_7(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .796, g: .862, b: .945} ,150 , 0);

          } else if((listCellState[i].activated==1) && (pattern01[i-(16*8)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note8_7(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .796, g: .862, b: .945} ,150 , 0);

          } else if((listCellState[i].activated==1) && (pattern01[i-(16*9)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note7_7(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .796, g: .862, b: .945} ,150 , 0);

          } else if((listCellState[i].activated==1) && (pattern01[i-(16*10)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note6_7(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .796, g: .862, b: .945} ,150 , 0);

          } else if((listCellState[i].activated==1) && (pattern01[i-(16*11)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note5_7(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .796, g: .862, b: .945} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*12)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note4_7(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .796, g: .862, b: .945} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*13)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note3_7(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .796, g: .862, b: .945} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*14)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note2_7(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .796, g: .862, b: .945} ,150 , 0);

          } else if ((listCellState[i].activated==1) && (pattern01[i-(16*15)] == 1)){
            var tempmappednumber = map_range(listCellState[i].gesture.time, 0, 100, 0, 1);
            note1_7(tempmappednumber);
            //play Animation
            var voxelToColor = listCellState[i].voxelName;
            var selectedObject = scene.getObjectByName(voxelToColor);
            var currColor = selectedObject.material.color;
            selectedObject.material.color = tweenPlayedColor(currColor, {r: .796, g: .862, b: .945} ,150 , 0);
          }
        }
      }
    }
  }
});

//
// time of piece - clock time
// TODO set time to reset
// socket.on('currTime', function(clientCurrTimeSec, clientCurrTimeMin){
//   currsec = clientCurrTimeSec;
//   currmin = clientCurrTimeMin;
//
//   document.getElementById("p4").innerHTML = currmin +':'+ currsec +  ' seconds until session resets';
//
// });


socket.on('globalTimetype', function(incomingBar){
  clientCounter = incomingBar;
});


////////////////////////
///end socket handlers//
////////////////////////



// raycaster intersect

function intersectObjects(event){
  //assign a possition for the click event
  if(event.type == "mousedown"){
    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
  }else{
    mouse.x = ( event.touches[0].clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.touches[0].clientY / renderer.domElement.clientHeight ) * 2 + 1;
  }
  //Raycaster magic!
  raycaster.setFromCamera( mouse, camera );

  // the intersects object function lets it know what object is hit
  intersects = raycaster.intersectObjects( objects );
}


// mouse move
function onMouseMove( event ) {
  // calculate mouse position in normalized device coordinates
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  hoverRaycaster.setFromCamera( mouse, camera );
  var hoverIntersects = hoverRaycaster.intersectObjects( scene.children, true );

  if ( (hoverIntersects.length > 0) && (onLoad == true) ) {

    if (hoverIntersects[0].object.name == "plane"){
      var thisOverlayObjects = scene.getObjectByName("rollOverMesh");
      var thisRollOverMaterial = new THREE.MeshBasicMaterial({ color: currColor, opacity: 0.05, transparent: true, visible: true  });
      thisOverlayObjects.material = thisRollOverMaterial;
    }

    if ( hoverIntersects[ 0 ] != null){
      var thisCellIntersect = hoverIntersects[ 0 ];
      rollOverMesh.position.copy( thisCellIntersect.point ).add( {x: 0, y: 1, z: 0} );
      rollOverMesh.position.divideScalar( boxSize ).floor().multiplyScalar( boxSize ).addScalar( boxSize/2 );
      rollOverMesh.position.y = 1;
    }


  } else {
    var thisOverlayObjects = scene.getObjectByName("rollOverMesh");
    thisOverlayObjects.material.visible = false;
  }


  if ( hoverIntersects.length > 0 ) {

    if (onLoad == true){
      //Get button objects by name
      var thisButtonObjectName1 = controlButtonObjects[0].name;
      var thisbuttonObject1 = scene.getObjectByName(thisButtonObjectName1);

      var thisButtonObjectName2 = controlButtonObjects[1].name;
      var thisbuttonObject2 = scene.getObjectByName(thisButtonObjectName2);

      var thisButtonObjectName3 = controlButtonObjects[2].name;
      var thisbuttonObject3 = scene.getObjectByName(thisButtonObjectName3);

      var thisButtonObjectName4 = controlButtonObjects[3].name;
      var thisbuttonObject4 = scene.getObjectByName(thisButtonObjectName4);

      var thisButtonObjectName5 = controlButtonObjects[4].name;
      var thisbuttonObject5 = scene.getObjectByName(thisButtonObjectName5);

      var thisButtonObjectName6 = controlButtonObjects[5].name;
      var thisbuttonObject6 = scene.getObjectByName(thisButtonObjectName6);

      var thisButtonObjectName7 = controlButtonObjects[6].name;
      var thisbuttonObject7 = scene.getObjectByName(thisButtonObjectName7);
    }

    if ( HOVER_INTERSECTED != hoverIntersects[ 0 ].object ) {

      //get the intersected button
      HOVER_INTERSECTED = hoverIntersects[ 0 ].object;

      //synthbutton
      if( HOVER_INTERSECTED.name == "noteButtonObject1") {

        if (thisbuttonObject1.scale.x == unhoveredButtonScale){
          // function scaleTweenUp(start, end, speed, )
          var buttonScaleUp = function () {
            return new TWEEN.Tween({
              scale: unhoveredButtonScale
            }).to ({
              scale : unhoveredButtonScaleUp
            }, buttonAnimSpeed).onUpdate(function () {
              thisbuttonObject1.scale.x = this.scale;
              thisbuttonObject1.scale.y = this.scale;
              thisbuttonObject1.scale.y = this.scale;
            });
          };
          buttonScaleUp().start();
        }
        //TODO scalethis
        thisbuttonObject2.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject3.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject4.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject5.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject6.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject7.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);

      } else if ( HOVER_INTERSECTED.name == "noteButtonObject2" ){

        if (thisbuttonObject2.scale.x == unhoveredButtonScale){
          // function scaleTweenUp(start, end, speed, )
          var buttonScaleUp = function () {
            return new TWEEN.Tween({
              scale: unhoveredButtonScale
            }).to ({
              scale : unhoveredButtonScaleUp
            }, buttonAnimSpeed).onUpdate(function () {
              thisbuttonObject2.scale.x = this.scale;
              thisbuttonObject2.scale.y = this.scale;
              thisbuttonObject2.scale.y = this.scale;
            });
          };
          buttonScaleUp().start();
        }
        thisbuttonObject1.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject3.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject4.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject5.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject6.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject7.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);

      } else if ( HOVER_INTERSECTED.name == "noteButtonObject3" ){

        if (thisbuttonObject3.scale.x == unhoveredButtonScale){
          // function scaleTweenUp(start, end, speed, )
          var buttonScaleUp = function () {
            return new TWEEN.Tween({
              scale: unhoveredButtonScale
            }).to ({
              scale : unhoveredButtonScaleUp
            }, buttonAnimSpeed).onUpdate(function () {
              thisbuttonObject3.scale.x = this.scale;
              thisbuttonObject3.scale.y = this.scale;
              thisbuttonObject3.scale.y = this.scale;
            });
          };
          buttonScaleUp().start();
        }

        thisbuttonObject1.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject2.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject4.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject5.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject6.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject7.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);

      } else if ( HOVER_INTERSECTED.name == "noteButtonObject4" ){

        if (thisbuttonObject4.scale.x == unhoveredButtonScale){
          // function scaleTweenUp(start, end, speed, )
          var buttonScaleUp = function () {
            return new TWEEN.Tween({
              scale: unhoveredButtonScale
            }).to ({
              scale : unhoveredButtonScaleUp
            }, buttonAnimSpeed).onUpdate(function () {
              thisbuttonObject4.scale.x = this.scale;
              thisbuttonObject4.scale.y = this.scale;
              thisbuttonObject4.scale.y = this.scale;
            });
          };
          buttonScaleUp().start();
        }

        thisbuttonObject1.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject2.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject3.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject5.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject6.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject7.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);


      } else if ( HOVER_INTERSECTED.name == "noteButtonObject5" ){

        if (thisbuttonObject5.scale.x == unhoveredButtonScale){
          // function scaleTweenUp(start, end, speed, )
          var buttonScaleUp = function () {
            return new TWEEN.Tween({
              scale: unhoveredButtonScale
            }).to ({
              scale : unhoveredButtonScaleUp
            }, buttonAnimSpeed).onUpdate(function () {
              thisbuttonObject5.scale.x = this.scale;
              thisbuttonObject5.scale.y = this.scale;
              thisbuttonObject5.scale.y = this.scale;
            });
          };
          buttonScaleUp().start();
        }
        thisbuttonObject1.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject2.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject3.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject4.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject6.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject7.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);

      } else if ( HOVER_INTERSECTED.name == "noteButtonObject6" ){

        if (thisbuttonObject6.scale.x == unhoveredButtonScale){
          // function scaleTweenUp(start, end, speed, )
          var buttonScaleUp = function () {
            return new TWEEN.Tween({
              scale: unhoveredButtonScale
            }).to ({
              scale : unhoveredButtonScaleUp
            }, buttonAnimSpeed).onUpdate(function () {
              thisbuttonObject6.scale.x = this.scale;
              thisbuttonObject6.scale.y = this.scale;
              thisbuttonObject6.scale.y = this.scale;
            });
          };
          buttonScaleUp().start();
        }

        thisbuttonObject1.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject2.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject3.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject4.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject5.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject7.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);

      } else if ( HOVER_INTERSECTED.name == "noteButtonObject7" ){

        if (thisbuttonObject7.scale.x == unhoveredButtonScale){
          // function scaleTweenUp(start, end, speed, )
          var buttonScaleUp = function () {
            return new TWEEN.Tween({
              scale: unhoveredButtonScale
            }).to ({
              scale : unhoveredButtonScaleUp
            }, buttonAnimSpeed).onUpdate(function () {
              thisbuttonObject7.scale.x = this.scale;
              thisbuttonObject7.scale.y = this.scale;
              thisbuttonObject7.scale.y = this.scale;
            });
          };
          buttonScaleUp().start();
        }
        thisbuttonObject1.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject2.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject3.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject4.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject5.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject6.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
      }
    }
  } else if ( hoverIntersects.length <= 0 ) {

    if ( (controlButtonObjects != null) && (controlButtonObjects.length == 7) ){

      //Get button objects by name
      var thisObjectName1 = controlButtonObjects[0].name;
      var thisbuttonObject1 = scene.getObjectByName(thisObjectName1);

      var thisObjectName2 = controlButtonObjects[1].name;
      var thisbuttonObject2 = scene.getObjectByName(thisObjectName2);

      var thisObjectName3 = controlButtonObjects[2].name;
      var thisbuttonObject3 = scene.getObjectByName(thisObjectName3);

      var thisObjectName4 = controlButtonObjects[3].name;
      var thisbuttonObject4 = scene.getObjectByName(thisObjectName4);

      var thisObjectName5 = controlButtonObjects[4].name;
      var thisbuttonObject5 = scene.getObjectByName(thisObjectName5);

      var thisObjectName6 = controlButtonObjects[5].name;
      var thisbuttonObject6 = scene.getObjectByName(thisObjectName6);

      var thisObjectName7 = controlButtonObjects[6].name;
      var thisbuttonObject7 = scene.getObjectByName(thisObjectName7);


      if (buttonArrayState[0] == 1){
        if (thisbuttonObject1.scale.x == unhoveredButtonScale){
          // function scaleTweenUp(start, end, speed, )
          var buttonScaleUp = function () {
            return new TWEEN.Tween({
              scale: unhoveredButtonScale
            }).to ({
              scale : unhoveredButtonScaleUp
            }, buttonAnimSpeed).onUpdate(function () {
              thisbuttonObject1.scale.x = this.scale;
              thisbuttonObject1.scale.y = this.scale;
              thisbuttonObject1.scale.y = this.scale;
            });
          };
          buttonScaleUp().start();
        }
        thisbuttonObject2.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject3.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject4.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject5.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject6.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject7.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);

      } else if (buttonArrayState[1] == 1){
        thisbuttonObject1.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        if (thisbuttonObject2.scale.x == unhoveredButtonScale){
          var buttonScaleUp = function () {
            return new TWEEN.Tween({
              scale: unhoveredButtonScale
            }).to ({
              scale : unhoveredButtonScaleUp
            }, buttonAnimSpeed).onUpdate(function () {
              thisbuttonObject2.scale.x = this.scale;
              thisbuttonObject2.scale.y = this.scale;
              thisbuttonObject2.scale.y = this.scale;
            });
          };
          buttonScaleUp().start();
        }
        thisbuttonObject3.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject4.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject5.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject6.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject7.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);

      } else if (buttonArrayState[2] == 1){
        thisbuttonObject1.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject2.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        if (thisbuttonObject3.scale.x == unhoveredButtonScale){
          var buttonScaleUp = function () {
            return new TWEEN.Tween({
              scale: unhoveredButtonScale
            }).to ({
              scale : unhoveredButtonScaleUp
            }, buttonAnimSpeed).onUpdate(function () {
              thisbuttonObject3.scale.x = this.scale;
              thisbuttonObject3.scale.y = this.scale;
              thisbuttonObject3.scale.y = this.scale;
            });
          };
          buttonScaleUp().start();
        }
        thisbuttonObject4.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject5.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject6.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject7.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);

      } else if (buttonArrayState[3] == 1){
        thisbuttonObject1.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject2.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject3.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        if (thisbuttonObject4.scale.x == unhoveredButtonScale){
          var buttonScaleUp = function () {
            return new TWEEN.Tween({
              scale: unhoveredButtonScale
            }).to ({
              scale : unhoveredButtonScaleUp
            }, buttonAnimSpeed).onUpdate(function () {
              thisbuttonObject4.scale.x = this.scale;
              thisbuttonObject4.scale.y = this.scale;
              thisbuttonObject4.scale.y = this.scale;
            });
          };
          buttonScaleUp().start();
        }
        thisbuttonObject5.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject6.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject7.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);

      } else if (buttonArrayState[4] == 1){
        thisbuttonObject1.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject2.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject3.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject4.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        if (thisbuttonObject5.scale.x == unhoveredButtonScale){
          var buttonScaleUp = function () {
            return new TWEEN.Tween({
              scale: unhoveredButtonScale
            }).to ({
              scale : unhoveredButtonScaleUp
            }, buttonAnimSpeed).onUpdate(function () {
              thisbuttonObject5.scale.x = this.scale;
              thisbuttonObject5.scale.y = this.scale;
              thisbuttonObject5.scale.y = this.scale;
            });
          };
          buttonScaleUp().start();
        }
        thisbuttonObject6.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject7.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);

      } else if (buttonArrayState[5] == 1){
        thisbuttonObject1.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject2.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject3.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject4.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject5.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        if (thisbuttonObject6.scale.x == unhoveredButtonScale){
          var buttonScaleUp = function () {
            return new TWEEN.Tween({
              scale: unhoveredButtonScale
            }).to ({
              scale : unhoveredButtonScaleUp
            }, buttonAnimSpeed).onUpdate(function () {
              thisbuttonObject6.scale.x = this.scale;
              thisbuttonObject6.scale.y = this.scale;
              thisbuttonObject6.scale.y = this.scale;
            });
          };
          buttonScaleUp().start();
        }
        thisbuttonObject7.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);

      } else if (buttonArrayState[6] == 1){
        thisbuttonObject1.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject2.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject3.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject4.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject5.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        thisbuttonObject6.scale.set(unhoveredButtonScale, unhoveredButtonScale, unhoveredButtonScale);
        if (thisbuttonObject7.scale.x == unhoveredButtonScale){
          var buttonScaleUp = function () {
            return new TWEEN.Tween({
              scale: unhoveredButtonScale
            }).to ({
              scale : unhoveredButtonScaleUp
            }, buttonAnimSpeed).onUpdate(function () {
              thisbuttonObject7.scale.x = this.scale;
              thisbuttonObject7.scale.y = this.scale;
              thisbuttonObject7.scale.y = this.scale;
            });
          };
          buttonScaleUp().start();
        }
      }
    }
  }
}




function onDocumentMouseDown( event ) {
  event.preventDefault();

  note1_1(0.0001);

  currCell = null;

  //Intersect check

  intersectObjects(event);
  if ( intersects.length > 0 ) {

    //assign intersect the first var
    // intersect = intersects[ intersects.length-1 ];

    intersect = intersects[ intersects.length - 1 ];
    // console.log("intersects", intersects)
    // console.log("mousedown");
    //Figure out what is the Cell X and Cell Z location of the event
    pressedPointX = Math.floor(8+intersect.point.x/boxSize);
    pressedPointZ = Math.floor(8+intersect.point.z/boxSize);

    //Number of the cell pressed
    currCell = (width*pressedPointZ) + pressedPointX;
    // If the intersected object is the ground
    if ( intersect.object.name == "plane" ) {

      if (intersect != null){
        if (currCell!= null){
          var cubeGeometry = new THREE.BoxGeometry( boxSize, boxSize, boxSize );
          var cubeMaterial = new THREE.MeshLambertMaterial( { color: currColor , overdraw: 0.5 } );

          var voxelPos = new THREE.Mesh( cubeGeometry, cubeMaterial );

          if (intersect != null){
            voxelPos.position.copy( intersect.point ).add( intersect.face.normal );
            // the snapped mouse position for a box
            voxelPos.position.divideScalar( boxSize ).floor().multiplyScalar( boxSize ).addScalar( boxSize/2 );
            listCellState[currCell].voxelPos = voxelPos.position.divideScalar( boxSize ).floor().multiplyScalar( boxSize ).addScalar( boxSize/2 );

            //TODO Temp shape

            //////////////////////
            ////////add obj///////
            //////////////////////

            var tempGeo = new THREE.BoxGeometry( boxSize, 0, boxSize );
            var tempMaterial = new THREE.MeshBasicMaterial({ color: currColor, opacity: 0.2, transparent: true, visible: true  });
            var tempMesh = new THREE.Mesh( tempGeo, tempMaterial );
            tempMesh.name = 'tempMesh';
            tempMesh.position.copy(listCellState[currCell].voxelPos);
            tempMesh.position.y = 0;
            scene.add( tempMesh );
            objects.push(tempMesh);


            // var tempProtoInstance = protoObject1.clone();
            // var protoMat = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.4, transparent: true, visible: true  });
            // tempProtoInstance.material = protoMat;
            // tempProtoInstance.position.copy(voxelPos);
            // tempProtoInstance.position.x = 20;
            // tempProtoInstance.name = "protoInstanceName";
            // console.log("voxel position",tempProtoInstance.name ,voxelPos.position);
            // tempProtoInstance.position.y = 0;
            //
            // // var scaledObjectHeight = map_range(newSteps[i].gesture.time, 0.0, 10.0, 0.4, 2.0);
            // var scaledObjectHeight = 90;
            // var selectedTexture = new THREE.MeshLambertMaterial( { color: currColor , overdraw: 0.5, opacity: .1 } );
            // tempProtoInstance.material = selectedTexture;

            // var randomRotationY = Math.floor(Math.random() * 360);
            //
            // if (randomRotationY <= 90){
            //   var thisRotation = 0;
            // } else if (randomRotationY >= 90 && randomRotationY<=180){
            //   var thisRotation = 90 * (Math.PI / 180);
            // } else if (randomRotationY >= 180 && randomRotationY <= 270){
            //   var thisRotation = 180 * (Math.PI / 180);
            // } else if (randomRotationY >= 270 && randomRotationY <= 360){
            //   var thisRotation = 270 * (Math.PI / 180);
            // }
            // console.log("mouseDown");
            // tempProtoInstance.rotation.y = thisRotation;
            // tempProtoInstance.scale.y = scaledObjectHeight;

            // protoInstance.name = i + newSteps[i].instrument ;
            // console.log( "onclick", protoInstance )
            // scene.add( ( tempProtoInstance) );
            // objects.push ( protoInstance );
          }
        }
      }
    }
    mousePressed = true;
    newGridState = buildArrayForGridState(listCellState, synth, currCell, voxleName);
    socket.emit('sendStep', {'Data': currCell, 'currobject': newGridState[currCell], 'currIntersect': intersect});
  }

  clickRaycaster.setFromCamera( mouse, camera );
  var clickIntersects = clickRaycaster.intersectObjects( scene.children, true );

  if ( clickIntersects.length > 0 ) {

    if (onLoad == true){
      //Get button objects by name
      var thisButtonObjectName1 = controlButtonObjects[0].name;
      var thisbuttonObject1 = scene.getObjectByName(thisButtonObjectName1);

      var thisButtonObjectName2 = controlButtonObjects[1].name;
      var thisbuttonObject2 = scene.getObjectByName(thisButtonObjectName2);

      var thisButtonObjectName3 = controlButtonObjects[2].name;
      var thisbuttonObject3 = scene.getObjectByName(thisButtonObjectName3);

      var thisButtonObjectName4 = controlButtonObjects[3].name;
      var thisbuttonObject4 = scene.getObjectByName(thisButtonObjectName4);

      var thisButtonObjectName5 = controlButtonObjects[4].name;
      var thisbuttonObject5 = scene.getObjectByName(thisButtonObjectName5);

      var thisButtonObjectName6 = controlButtonObjects[5].name;
      var thisbuttonObject6 = scene.getObjectByName(thisButtonObjectName6);

      var thisButtonObjectName7 = controlButtonObjects[6].name;
      var thisbuttonObject7 = scene.getObjectByName(thisButtonObjectName7);

      var thisButtonObjectName9 = appButtonObjects[0].name;
      var thisbuttonObject9 = scene.getObjectByName(thisButtonObjectName9);
      //TODO click
    }


    if ( CLICK_INTERSECTED != clickIntersects[ 0 ].object ) {
      //get the intersected button
      CLICK_INTERSECTED = clickIntersects[ 0 ].object;
      //synthbutton
      if( CLICK_INTERSECTED.name == "noteButtonObject1") {
        // console.log("noteButtonObject1");
        buttonArrayState = [1,0,0,0,0,0,0];
        userNo = 1;
        synth = 'red';
        currColor = playerColorArray[0];
      } else if ( CLICK_INTERSECTED.name == "noteButtonObject2" ){
        buttonArrayState = [0,1,0,0,0,0,0];
        userNo = 2;
        synth = 'yellow';
        currColor = playerColorArray[1];
        // console.log("noteButtonObject2");

      } else if ( CLICK_INTERSECTED.name == "noteButtonObject3" ){
        buttonArrayState = [0,0,1,0,0,0,0];
        userNo = 3;
        synth = 'purple';
        currColor = playerColorArray[2];
        // console.log("noteButtonObject3");

      } else if ( CLICK_INTERSECTED.name == "noteButtonObject4" ){
        buttonArrayState = [0,0,0,1,0,0,0];
        userNo = 4;
        synth = 'gold';
        currColor = playerColorArray[3];
        // console.log("noteButtonObject4");


      } else if ( CLICK_INTERSECTED.name == "noteButtonObject5" ){
        buttonArrayState = [0,0,0,0,1,0,0];
        userNo = 5;
        synth = 'green';
        currColor = playerColorArray[4];
        // console.log("noteButtonObject5");


      } else if ( CLICK_INTERSECTED.name == "noteButtonObject6" ){
        buttonArrayState = [0,0,0,0,0,1,0];
        userNo = 6;
        synth = 'salmon';
        currColor = playerColorArray[5];
        // console.log("noteButtonObject6", synth);

      } else if ( CLICK_INTERSECTED.name == "noteButtonObject7" ){
        buttonArrayState = [0,0,0,0,0,0,1];
        userNo = 7;
        synth = 'blue';
        currColor = playerColorArray[6];
        // console.log("noteButtonObject7");

      } else if ( CLICK_INTERSECTED.name == "aboutBG" ){
        //TODO trigger lightbox
        if (  lightBoxOn == false){
          lightBoxOn = true;
          showBox();
        }
      } else {
        if ( lightBoxOn == true ){
          hideBox();
          lightBoxOn = false;
        }
      }
    }
  }
}

function onDocumentMouseUp( event ) {
  event.preventDefault();

  //delete temp Mesh
  var tempVoxelToRemove = scene.getObjectByName("tempMesh");
  scene.remove( tempVoxelToRemove );
  objects.splice( objects.indexOf( tempVoxelToRemove ), 1 );


  ///button animation///
  if (controlButtonObjects != null){

    //Get button objects by name
    var thisObjectName1 = controlButtonObjects[0].name;
    var thisbuttonObject1 = scene.getObjectByName(thisObjectName1);

    var thisObjectName2 = controlButtonObjects[1].name;
    var thisbuttonObject2 = scene.getObjectByName(thisObjectName2);

    var thisObjectName3 = controlButtonObjects[2].name;
    var thisbuttonObject3 = scene.getObjectByName(thisObjectName3);

    var thisObjectName4 = controlButtonObjects[3].name;
    var thisbuttonObject4 = scene.getObjectByName(thisObjectName4);

    var thisObjectName5 = controlButtonObjects[4].name;
    var thisbuttonObject5 = scene.getObjectByName(thisObjectName5);

    var thisObjectName6 = controlButtonObjects[5].name;
    var thisbuttonObject6 = scene.getObjectByName(thisObjectName6);

    var thisObjectName7 = controlButtonObjects[6].name;
    var thisbuttonObject7 = scene.getObjectByName(thisObjectName7);


    if (buttonArrayState[0] == 1){
      if (thisbuttonObject1.scale.x == unhoveredButtonScale){
        var buttonScaleUp = function () {
          return new TWEEN.Tween({
            scale: unhoveredButtonScale
          }).to ({
            scale : unhoveredButtonScaleUp
          }, buttonAnimSpeed).onUpdate(function () {
            thisbuttonObject1.scale.x = this.scale;
            thisbuttonObject1.scale.y = this.scale;
            thisbuttonObject1.scale.y = this.scale;
          });
        };
        buttonScaleUp().start();
      }
      thisbuttonObject2.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject3.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject4.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject5.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject6.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject7.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);

    } else if (buttonArrayState[1] == 1){
      thisbuttonObject1.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      if (thisbuttonObject2.scale.x == unhoveredButtonScale){
        var buttonScaleUp = function () {
          return new TWEEN.Tween({
            scale: unhoveredButtonScale
          }).to ({
            scale : unhoveredButtonScaleUp
          }, buttonAnimSpeed).onUpdate(function () {
            thisbuttonObject2.scale.x = this.scale;
            thisbuttonObject2.scale.y = this.scale;
            thisbuttonObject2.scale.y = this.scale;
          });
        };
        buttonScaleUp().start();
      }
      thisbuttonObject3.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject4.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject5.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject6.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject7.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);

    } else if (buttonArrayState[2] == 1){
      thisbuttonObject1.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject2.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      if (thisbuttonObject3.scale.x == unhoveredButtonScale){
        var buttonScaleUp = function () {
          return new TWEEN.Tween({
            scale: unhoveredButtonScale
          }).to ({
            scale : unhoveredButtonScaleUp
          }, buttonAnimSpeed).onUpdate(function () {
            thisbuttonObject3.scale.x = this.scale;
            thisbuttonObject3.scale.y = this.scale;
            thisbuttonObject3.scale.y = this.scale;
          });
        };
        buttonScaleUp().start();
      }
      thisbuttonObject4.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject5.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject6.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject7.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);

    } else if (buttonArrayState[3] == 1){
      thisbuttonObject1.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject2.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject3.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      if (thisbuttonObject4.scale.x == unhoveredButtonScale){
        var buttonScaleUp = function () {
          return new TWEEN.Tween({
            scale: unhoveredButtonScale
          }).to ({
            scale : unhoveredButtonScaleUp
          }, buttonAnimSpeed).onUpdate(function () {
            thisbuttonObject4.scale.x = this.scale;
            thisbuttonObject4.scale.y = this.scale;
            thisbuttonObject4.scale.y = this.scale;
          });
        };
        buttonScaleUp().start();
      }
      thisbuttonObject5.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject6.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject7.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);

    } else if (buttonArrayState[4] == 1){
      thisbuttonObject1.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject2.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject3.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject4.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      if (thisbuttonObject5.scale.x == unhoveredButtonScale){
        var buttonScaleUp = function () {
          return new TWEEN.Tween({
            scale: unhoveredButtonScale
          }).to ({
            scale : unhoveredButtonScaleUp
          }, buttonAnimSpeed).onUpdate(function () {
            thisbuttonObject5.scale.x = this.scale;
            thisbuttonObject5.scale.y = this.scale;
            thisbuttonObject5.scale.y = this.scale;
          });
        };
        buttonScaleUp().start();
      }
      thisbuttonObject6.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject7.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);

    } else if (buttonArrayState[5] == 1){
      thisbuttonObject1.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject2.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject3.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject4.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject5.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      if (thisbuttonObject6.scale.x == unhoveredButtonScale){
        var buttonScaleUp = function () {
          return new TWEEN.Tween({
            scale: unhoveredButtonScale
          }).to ({
            scale : unhoveredButtonScaleUp
          }, buttonAnimSpeed).onUpdate(function () {
            thisbuttonObject6.scale.x = this.scale;
            thisbuttonObject6.scale.y = this.scale;
            thisbuttonObject6.scale.y = this.scale;
          });
        };
        buttonScaleUp().start();
      }
      thisbuttonObject7.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);

    } else if (buttonArrayState[6] == 1){
      thisbuttonObject1.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject2.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject3.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject4.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject5.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      thisbuttonObject6.scale.set(unhoveredButtonScale,unhoveredButtonScale,unhoveredButtonScale);
      if (thisbuttonObject7.scale.x == unhoveredButtonScale){
        var buttonScaleUp = function () {
          return new TWEEN.Tween({
            scale: unhoveredButtonScale
          }).to ({
            scale : unhoveredButtonScaleUp
          }, buttonAnimSpeed).onUpdate(function () {
            thisbuttonObject7.scale.x = this.scale;
            thisbuttonObject7.scale.y = this.scale;
            thisbuttonObject7.scale.y = this.scale;
          });
        };
        buttonScaleUp().start();
      }
    }
  }

  ///endbuttonanimation

  mousePressed = false;
  var gesture = { time:noteCounter };
  if (intersect != null){
    if ( intersect.object == plane ) {
      if (intersect != null){
        if (currCell!= null){
          socket.emit('sendGesture', {'Data': currCell, 'pressedGestureTime': gesture});
        }
      }
    }
  }

  noteCounter = 3;

}



// render everything
function render() {
  requestAnimationFrame(render);

  // button update position

  if ((controlButtonObjects != null) && (controlButtonObjects.length == 7) && (appButtonObjects.length == 3)){

    var thisObjectName1 = controlButtonObjects[0].name;
    var thisbuttonObject1 = scene.getObjectByName(thisObjectName1);

    var thisObjectName2 = controlButtonObjects[1].name;
    var thisbuttonObject2 = scene.getObjectByName(thisObjectName2);

    var thisObjectName3 = controlButtonObjects[2].name;
    var thisbuttonObject3 = scene.getObjectByName(thisObjectName3);

    var thisObjectName4 = controlButtonObjects[3].name;
    var thisbuttonObject4 = scene.getObjectByName(thisObjectName4);

    var thisObjectName5 = controlButtonObjects[4].name;
    var thisbuttonObject5 = scene.getObjectByName(thisObjectName5);

    var thisObjectName6 = controlButtonObjects[5].name;
    var thisbuttonObject6 = scene.getObjectByName(thisObjectName6);

    var thisObjectName7 = controlButtonObjects[6].name;
    var thisbuttonObject7 = scene.getObjectByName(thisObjectName7);

    var thisObjectName08 = scene.getObjectByName( "aboutBG" );

    var thisObjectName09 = scene.getObjectByName( "about" );

    var thisObjectName10 = scene.getObjectByName( "polynote" );



    thisbuttonObject1.position.copy( camera.position );
    thisbuttonObject1.rotation.copy( camera.rotation );
    thisbuttonObject1.translateX( -180 );
    thisbuttonObject1.translateZ( - 1000 );
    thisbuttonObject1.translateY( + 280 );
    thisbuttonObject1.updateMatrix();
    //TODO change pos
    // let delta_rot = 0.02
    thisbuttonObject2.position.copy( camera.position );
    thisbuttonObject2.rotation.copy( camera.rotation );
    thisbuttonObject2.updateMatrix();
    thisbuttonObject2.translateX( -120);
    thisbuttonObject2.translateZ( - 1000 );
    thisbuttonObject2.translateY( + 280 );

    thisbuttonObject3.position.copy( camera.position );
    thisbuttonObject3.rotation.copy( camera.rotation );
    thisbuttonObject3.updateMatrix();
    thisbuttonObject3.translateX( -60 );
    thisbuttonObject3.translateZ( - 1000 );
    thisbuttonObject3.translateY( + 280 );

    thisbuttonObject4.position.copy( camera.position );
    thisbuttonObject4.rotation.copy( camera.rotation );
    thisbuttonObject4.updateMatrix();
    thisbuttonObject4.translateX( 0 );
    thisbuttonObject4.translateZ( - 1000 );
    thisbuttonObject4.translateY( + 280 );

    thisbuttonObject5.position.copy( camera.position );
    thisbuttonObject5.rotation.copy( camera.rotation );
    thisbuttonObject5.updateMatrix();
    thisbuttonObject5.translateX( 60 );
    thisbuttonObject5.translateZ( - 1000 );
    thisbuttonObject5.translateY( + 280 );

    thisbuttonObject6.position.copy( camera.position );
    thisbuttonObject6.rotation.copy( camera.rotation );
    thisbuttonObject6.updateMatrix();
    thisbuttonObject6.translateX( 120 );
    thisbuttonObject6.translateZ( - 1000 );
    thisbuttonObject6.translateY( + 280 );

    thisbuttonObject7.position.copy( camera.position );
    thisbuttonObject7.rotation.copy( camera.rotation );
    thisbuttonObject7.updateMatrix();
    thisbuttonObject7.translateX( 180 );
    thisbuttonObject7.translateZ( - 1000 );
    thisbuttonObject7.translateY( + 280 );

    thisObjectName08.position.copy( camera.position );
    thisObjectName08.rotation.copy( camera.rotation );
    thisObjectName08.updateMatrix();
    thisObjectName08.translateX( 0 );
    thisObjectName08.translateZ( - 1001 );
    thisObjectName08.translateY( - 320 );

    thisObjectName09.position.copy( camera.position );
    thisObjectName09.rotation.copy( camera.rotation );
    thisObjectName09.updateMatrix();
    thisObjectName09.translateX( 0 );
    thisObjectName09.translateZ( - 1000 );
    thisObjectName09.translateY( - 324 );

    thisObjectName10.position.copy( camera.position );
    thisObjectName10.rotation.copy( camera.rotation );
    thisObjectName10.updateMatrix();
    thisObjectName10.translateX( 0 );
    thisObjectName10.translateZ( - 1000 );
    thisObjectName10.translateY( + 325 );

  }

  if (mousePressed == true){
    noteCounter = noteCounter + 1;
    if (noteCounter >= 60){
      noteCounter = 60;
    }

    if (scene.getObjectByName( "tempMesh" ) != null){
      var thisObjectName11 = scene.getObjectByName( "tempMesh" );
      thisObjectName11.scale.y = noteCounter*6 ;
      thisObjectName11.position.y = (-noteCounter*3)+(noteCounter*6);
    }


  }




  renderer.render( scene, camera );

}





///////////////////////////////
//*********RED SYNTH*********//
///////////////////////////////



function note1_1(volumeGesture) {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : volumeGesture/1,
      decay : volumeGesture/3,
      sustain : volumeGesture/6,
      release : volumeGesture/2
    }
  });

  var gain  = new Tone.Gain(volumeGesture);
  synth.connect(gain);
  gain.toMaster();

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[15]), '9n');
};

function note2_1(volumeGesture) {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : volumeGesture/1,
      decay : volumeGesture/3,
      sustain : volumeGesture/6,
      release : volumeGesture/2
    }
  });

  var gain  = new Tone.Gain(volumeGesture);
  synth.connect(gain);
  gain.toMaster();

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[14]), '9n');
};

function note3_1(volumeGesture) {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : volumeGesture/1,
      decay : volumeGesture/3,
      sustain : volumeGesture/6,
      release : volumeGesture/2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synth.connect(gain);
  gain.toMaster();

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[13]), '9n');
};
function note4_1(volumeGesture) {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : volumeGesture/1,
      decay : volumeGesture/3,
      sustain : volumeGesture/6,
      release : volumeGesture/2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synth.connect(gain);
  gain.toMaster();

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[12]), '9n');
};
function note5_1(volumeGesture) {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : volumeGesture/1,
      decay : volumeGesture/3,
      sustain : volumeGesture/6,
      release : volumeGesture/2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synth.connect(gain);
  gain.toMaster();


  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[11]), '9n');
};
function note6_1(volumeGesture) {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : volumeGesture/1,
      decay : volumeGesture/3,
      sustain : volumeGesture/6,
      release : volumeGesture/2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synth.connect(gain);
  gain.toMaster();

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[10]), '9n');
};
function note7_1(volumeGesture) {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : volumeGesture/1,
      decay : volumeGesture/3,
      sustain : volumeGesture/6,
      release : volumeGesture/2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synth.connect(gain);
  gain.toMaster();

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[9]), '9n');
};




function note8_1(volumeGesture) {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : volumeGesture/1,
      decay : volumeGesture/3,
      sustain : volumeGesture/6,
      release : volumeGesture/2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synth.connect(gain);
  gain.toMaster();

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[8]), '9n');
};
function note9_1(volumeGesture) {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : volumeGesture/1,
      decay : volumeGesture/3,
      sustain : volumeGesture/6,
      release : volumeGesture/2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synth.connect(gain);
  gain.toMaster();

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[7]), '9n');
};
function note10_1(volumeGesture) {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : volumeGesture/1,
      decay : volumeGesture/3,
      sustain : volumeGesture/6,
      release : volumeGesture/2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synth.connect(gain);
  gain.toMaster();

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[6]), '9n');
};
function note11_1(volumeGesture) {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : volumeGesture/1,
      decay : volumeGesture/3,
      sustain : volumeGesture/6,
      release : volumeGesture/2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synth.connect(gain);
  gain.toMaster();

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[5]), '9n');

};
function note12_1(volumeGesture) {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : volumeGesture/1,
      decay : volumeGesture/3,
      sustain : volumeGesture/6,
      release : volumeGesture/2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synth.connect(gain);
  gain.toMaster();

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[4]), '9n');

};
function note13_1(volumeGesture) {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : volumeGesture/1,
      decay : volumeGesture/3,
      sustain : volumeGesture/6,
      release : volumeGesture/2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synth.connect(gain);
  gain.toMaster();

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[3]), '9n');
};

function note14_1(volumeGesture) {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : volumeGesture/1,
      decay : volumeGesture/3,
      sustain : volumeGesture/6,
      release : volumeGesture/2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synth.connect(gain);
  gain.toMaster();

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[2]), '9n');
};

function note15_1(volumeGesture) {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : volumeGesture/1,
      decay : volumeGesture/3,
      sustain : volumeGesture/6,
      release : volumeGesture/2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synth.connect(gain);
  gain.toMaster();

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[1]), '9n');
};


function note16_1(volumeGesture) {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : volumeGesture/1,
      decay : volumeGesture/3,
      sustain : volumeGesture/6,
      release : volumeGesture/2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synth.connect(gain);
  gain.toMaster();

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[0]), '9n');
};





//////////////////////////////////
//*********YELLOW SYNTH*********//
//////////////////////////////////




function note1_2(volumeGesture) {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack :volumeGesture/3,
      decay : volumeGesture/4,
      sustain : 0.2,
      release : 0.2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synthYellow.connect(gain);
  gain.toMaster();

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[0])/3), '9n');
};

function note2_2(volumeGesture) {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack :volumeGesture/3,
      decay : volumeGesture/4,
      sustain : 0.2,
      release : 0.2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synthYellow.connect(gain);
  gain.toMaster();

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[1])/3), '9n');
};
function note3_2(volumeGesture) {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack :volumeGesture/3,
      decay : volumeGesture/4,
      sustain : 0.2,
      release : 0.2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synthYellow.connect(gain);
  gain.toMaster();

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[2])/3), '9n');
};


function note4_2(volumeGesture) {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack :volumeGesture/3,
      decay : volumeGesture/4,
      sustain : 0.2,
      release : 0.2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synthYellow.connect(gain);
  gain.toMaster();

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[3])/3), '9n');
};


function note5_2(volumeGesture) {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack :volumeGesture/3,
      decay : volumeGesture/4,
      sustain : 0.2,
      release : 0.2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synthYellow.connect(gain);
  gain.toMaster();

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[4])/3), '9n');
};


function note6_2(volumeGesture) {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack :volumeGesture/3,
      decay : volumeGesture/4,
      sustain : 0.2,
      release : 0.2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synthYellow.connect(gain);
  gain.toMaster();

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[5])/3), '9n');
};


function note7_2(volumeGesture) {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack :volumeGesture/3,
      decay : volumeGesture/4,
      sustain : 0.2,
      release : 0.2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synthYellow.connect(gain);
  gain.toMaster();

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[6])/3), '9n');
};


function note8_2(volumeGesture) {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack :volumeGesture/3,
      decay : volumeGesture/4,
      sustain : 0.2,
      release : 0.2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synthYellow.connect(gain);
  gain.toMaster();

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[7])/3), '9n');
};


function note9_2(volumeGesture) {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack :volumeGesture/3,
      decay : volumeGesture/4,
      sustain : 0.2,
      release : 0.2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synthYellow.connect(gain);
  gain.toMaster();

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[8])/3), '9n');
};


function note10_2(volumeGesture) {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack :volumeGesture/3,
      decay : volumeGesture/4,
      sustain : 0.2,
      release : 0.2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synthYellow.connect(gain);
  gain.toMaster();

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[9])/3), '9n');
};


function note11_2(volumeGesture) {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack :volumeGesture/3,
      decay : volumeGesture/4,
      sustain : 0.2,
      release : 0.2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synthYellow.connect(gain);
  gain.toMaster();

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[10])/3), '9n');
};

function note12_2(volumeGesture) {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack :volumeGesture/3,
      decay : volumeGesture/4,
      sustain : 0.2,
      release : 0.2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synthYellow.connect(gain);
  gain.toMaster();

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[11])/3), '9n');
};


function note13_2(volumeGesture) {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack :volumeGesture/3,
      decay : volumeGesture/4,
      sustain : 0.2,
      release : 0.2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synthYellow.connect(gain);
  gain.toMaster();

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[12])/3), '9n');
};


function note14_2(volumeGesture) {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack :volumeGesture/3,
      decay : volumeGesture/4,
      sustain : 0.2,
      release : 0.2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synthYellow.connect(gain);
  gain.toMaster();

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[13])/3), '9n');
};


function note15_2(volumeGesture) {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack :volumeGesture/3,
      decay : volumeGesture/4,
      sustain : 0.2,
      release : 0.2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synthYellow.connect(gain);
  gain.toMaster();

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[14])/3), '9n');
};


function note16_2(volumeGesture) {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack :volumeGesture/3,
      decay : volumeGesture/4,
      sustain : 0.2,
      release : 0.2
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  synthYellow.connect(gain);
  gain.toMaster();

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[15])/3), '9n');
};






///////////////////////////////
//*********PURPLE SYNTH*********//
///////////////////////////////



function note1_3(volumeGesture) {
  var msynth =  new Tone.FMSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : volumeGesture/3,
      decay : volumeGesture/2,
      sustain : volumeGesture/5,
      release : volumeGesture
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  msynth.connect(gain);
  gain.toMaster();

  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[0])*1), '9n');
};


function note2_3(volumeGesture) {
  var msynth =  new Tone.FMSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : volumeGesture/3,
      decay : volumeGesture/2,
      sustain : volumeGesture/5,
      release : volumeGesture
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  msynth.connect(gain);
  gain.toMaster();


  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[1])*1), '9n');
};

function note3_3(volumeGesture) {
  var msynth =  new Tone.FMSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : volumeGesture/3,
      decay : volumeGesture/2,
      sustain : volumeGesture/5,
      release : volumeGesture
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  msynth.connect(gain);
  gain.toMaster();


  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[2])*1), '9n');
};

function note4_3(volumeGesture) {
  var msynth =  new Tone.FMSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : volumeGesture/3,
      decay : volumeGesture/2,
      sustain : volumeGesture/5,
      release : volumeGesture
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  msynth.connect(gain);
  gain.toMaster();

  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[3])*1), '9n');
};

function note5_3(volumeGesture) {
  var msynth =  new Tone.FMSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : volumeGesture/3,
      decay : volumeGesture/2,
      sustain : volumeGesture/5,
      release : volumeGesture
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  msynth.connect(gain);
  gain.toMaster();

  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[4])*1), '9n');
};

function note6_3(volumeGesture) {
  var msynth =  new Tone.FMSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : volumeGesture/3,
      decay : volumeGesture/2,
      sustain : volumeGesture/5,
      release : volumeGesture
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  msynth.connect(gain);
  gain.toMaster();


  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[5])*1), '9n');
};

function note7_3(volumeGesture) {
  var msynth =  new Tone.FMSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : volumeGesture/3,
      decay : volumeGesture/2,
      sustain : volumeGesture/5,
      release : volumeGesture
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  msynth.connect(gain);
  gain.toMaster();


  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[6])*1), '9n');
};

function note8_3(volumeGesture) {
  var msynth =  new Tone.FMSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : volumeGesture/3,
      decay : volumeGesture/2,
      sustain : volumeGesture/5,
      release : volumeGesture
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  msynth.connect(gain);
  gain.toMaster();


  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[7])*1), '9n');
};

function note9_3(volumeGesture) {
  var msynth =  new Tone.FMSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : volumeGesture/3,
      decay : volumeGesture/2,
      sustain : volumeGesture/5,
      release : volumeGesture
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  msynth.connect(gain);
  gain.toMaster();


  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[8])*1), '9n');
};

function note10_3(volumeGesture) {
  var msynth =  new Tone.FMSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : volumeGesture/3,
      decay : volumeGesture/2,
      sustain : volumeGesture/5,
      release : volumeGesture
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  msynth.connect(gain);
  gain.toMaster();

  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[9])*1), '9n');
};

function note11_3(volumeGesture) {
  var msynth =  new Tone.FMSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : volumeGesture/3,
      decay : volumeGesture/2,
      sustain : volumeGesture/5,
      release : volumeGesture
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  msynth.connect(gain);
  gain.toMaster();

  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[10])*1), '9n');
};

function note12_3(volumeGesture) {
  var msynth =  new Tone.FMSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : volumeGesture/3,
      decay : volumeGesture/2,
      sustain : volumeGesture/5,
      release : volumeGesture
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  msynth.connect(gain);
  gain.toMaster();

  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[11])*1), '9n');
};

function note13_3(volumeGesture) {
  var msynth =  new Tone.FMSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : volumeGesture/3,
      decay : volumeGesture/2,
      sustain : volumeGesture/5,
      release : volumeGesture
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  msynth.connect(gain);
  gain.toMaster();

  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[12])*1), '9n');
};

function note14_3(volumeGesture) {
  var msynth =  new Tone.FMSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : volumeGesture/3,
      decay : volumeGesture/2,
      sustain : volumeGesture/5,
      release : volumeGesture
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  msynth.connect(gain);
  gain.toMaster();

  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[13])*1), '9n');
};

function note15_3(volumeGesture) {
  var msynth =  new Tone.FMSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : volumeGesture/3,
      decay : volumeGesture/2,
      sustain : volumeGesture/5,
      release : volumeGesture
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  msynth.connect(gain);
  gain.toMaster();

  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[14])*1), '9n');
};

function note16_3(volumeGesture) {
  var msynth =  new Tone.FMSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : volumeGesture/3,
      decay : volumeGesture/2,
      sustain : volumeGesture/5,
      release : volumeGesture
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  msynth.connect(gain);
  gain.toMaster();


  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[15])*1), '9n');
};



//////////////////////////////////
//*********GOLD SYNTH*********//
//////////////////////////////////




function note1_4(volumeGesture) {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  duoSynth.connect(gain);
  gain.toMaster();

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[0])/4), '7n');
};
function note2_4(volumeGesture) {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  duoSynth.connect(gain);
  gain.toMaster();

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[1])/4), '7n');
};
function note3_4(volumeGesture) {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  duoSynth.connect(gain);
  gain.toMaster();

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[2])/4), '7n');
};
function note4_4(volumeGesture) {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  duoSynth.connect(gain);
  gain.toMaster();

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[3])/4), '7n');
};
function note5_4(volumeGesture) {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  duoSynth.connect(gain);
  gain.toMaster();

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[4])/4), '7n');
};
function note6_4(volumeGesture) {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  duoSynth.connect(gain);
  gain.toMaster();

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[5])/4), '7n');
};
function note7_4(volumeGesture) {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  duoSynth.connect(gain);
  gain.toMaster();

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[6])/4), '7n');
};
function note8_4(volumeGesture) {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  duoSynth.connect(gain);
  gain.toMaster();

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[7])/4), '7n');
};
function note9_4(volumeGesture) {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  duoSynth.connect(gain);
  gain.toMaster();

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[8])/4), '7n');
};

function note10_4(volumeGesture) {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  duoSynth.connect(gain);
  gain.toMaster();

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[9])/4), '7n');
};

function note11_4(volumeGesture) {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  duoSynth.connect(gain);
  gain.toMaster();

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[10])/4), '7n');
};
function note12_4(volumeGesture) {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  duoSynth.connect(gain);
  gain.toMaster();

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[11])/4), '7n');
};

function note13_4(volumeGesture) {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  duoSynth.connect(gain);
  gain.toMaster();

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[12])/4), '7n');
};


function note14_4(volumeGesture) {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  duoSynth.connect(gain);
  gain.toMaster();

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[13])/4), '7n');
};


function note15_4(volumeGesture) {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  duoSynth.connect(gain);
  gain.toMaster();

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[14])/4), '7n');
};


function note16_4(volumeGesture) {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  duoSynth.connect(gain);
  gain.toMaster();

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[15])/4), '7n');
};


//////////////////////////////////
//*********GREEN SYNTH*********//
//////////////////////////////////





function note1_5(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/4,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/8
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[0])), '3n');
};


function note2_5(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/4,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/8
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[1])), '3n');
};


function note3_5(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/4,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/8
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[2])), '3n');
};

function note4_5(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/4,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/8
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[3])), '3n');
};

function note5_5(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/4,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/8
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[4])), '3n');
};


function note6_5(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/4,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/8
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[5])), '3n');
};


function note7_5(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/4,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/8
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[6])), '3n');
};


function note8_5(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/4,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/8
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[7])), '3n');
};


function note9_5(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/4,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/8
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();
  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[8])), '3n');
};


function note10_5(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/4,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/8
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();
  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[9])), '3n');
};


function note11_5(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/4,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/8
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();
  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[10])), '3n');
};


function note12_5(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/4,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/8
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[11])), '3n');
};


function note13_5(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/4,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/8
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();
  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[12])), '3n');
};

function note14_5(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/4,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/8
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();
  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[13])), '3n');
};


function note15_5(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/4,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/8
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();
  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[14])), '3n');
};


function note16_5(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/4,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/8
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();
  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[15])), '3n');
};





//////////////////////////////////
//*********SALMON SYNTH*********//
//////////////////////////////////




function note1_6(volumeGesture) {

  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/7
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();
  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[0])/4), '3n');
};

function note2_6(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/7
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[1])/4), '3n');
};

function note3_6(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/7
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[2])/4), '3n');
};


function note4_6(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/7
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[3])/4), '3n');
};


function note5_6(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/7
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[4])/4), '3n');
};


function note6_6(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/7
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[5])/4), '3n');
};


function note7_6(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/7
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();
  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[6])/4), '3n');
};


function note8_6(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/7
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[7])/4), '3n');
};


function note9_6(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/7
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[8])/4), '3n');
};


function note10_6(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/7
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[9])/4), '3n');
};


function note11_6(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/7
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[10])/4), '3n');
};

function note12_6(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/7
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[11])/4), '3n');
};


function note13_6(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/7
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[12])/4), '3n');
};


function note14_6(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/7
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[13])/4), '3n');
};


function note15_6(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/7
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();
  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[14])/4), '3n');
};


function note16_6(volumeGesture) {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : volumeGesture/7
    }
  });
  var gain  = new Tone.Gain(volumeGesture);
  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[15])/4), '3n');
};



//////////////////////////////////
//*********BLUE SYNTH*********//
//////////////////////////////////




function note1_7(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var pingPong = new Tone.PingPongDelay("12n", volumeGesture/5);
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  });
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare5"
    },
    envelope : {
      attack : volumeGesture/8,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  });

  fmSynth.connect(gain).connect(phaser).connect(pingPong);
  gain.toMaster();

  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[0])), '12n');
};

function note2_7(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var pingPong = new Tone.PingPongDelay("12n", volumeGesture/5);
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  });
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare5"
    },
    envelope : {
      attack : volumeGesture/8,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  });

  fmSynth.connect(gain).connect(phaser).connect(pingPong);
  gain.toMaster();

  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[1])), '12n');
};
function note3_7(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var pingPong = new Tone.PingPongDelay("12n", volumeGesture/5);
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  });
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare5"
    },
    envelope : {
      attack : volumeGesture/8,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  });

  fmSynth.connect(gain).connect(phaser).connect(pingPong);
  gain.toMaster();

  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[2])), '12n');
};
function note4_7(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var pingPong = new Tone.PingPongDelay("12n", volumeGesture/5);
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  });
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare5"
    },
    envelope : {
      attack : volumeGesture/8,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  });

  fmSynth.connect(gain).connect(phaser).connect(pingPong);
  gain.toMaster();

  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[3])), '12n');
};
function note5_7(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var pingPong = new Tone.PingPongDelay("12n", volumeGesture/5);
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  });
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare5"
    },
    envelope : {
      attack : volumeGesture/8,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  });

  fmSynth.connect(gain).connect(phaser).connect(pingPong);
  gain.toMaster();

  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[4])), '12n');
};

function note6_7(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var pingPong = new Tone.PingPongDelay("12n", volumeGesture/5);
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  });
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare5"
    },
    envelope : {
      attack : volumeGesture/8,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  });

  fmSynth.connect(gain).connect(phaser).connect(pingPong);
  gain.toMaster();

  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[5])), '12n');
};

function note7_7(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var pingPong = new Tone.PingPongDelay("12n", volumeGesture/5);
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  });
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare5"
    },
    envelope : {
      attack : volumeGesture/8,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  });

  fmSynth.connect(gain).connect(phaser).connect(pingPong);
  gain.toMaster();

  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[6])), '12n');
};

function note8_7(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var pingPong = new Tone.PingPongDelay("12n", volumeGesture/5);
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  });
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare5"
    },
    envelope : {
      attack : volumeGesture/8,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  });

  fmSynth.connect(gain).connect(phaser).connect(pingPong);
  gain.toMaster();

  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[7])), '12n');
};


function note9_7(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var pingPong = new Tone.PingPongDelay("12n", volumeGesture/5);
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  });
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare5"
    },
    envelope : {
      attack : volumeGesture/8,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  });

  fmSynth.connect(gain).connect(phaser).connect(pingPong);
  gain.toMaster();

  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[8])), '12n');
};


function note10_7(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var pingPong = new Tone.PingPongDelay("12n", volumeGesture/5);
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  });
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare5"
    },
    envelope : {
      attack : volumeGesture/8,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  });

  fmSynth.connect(gain).connect(phaser).connect(pingPong);
  gain.toMaster();

  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[9])), '12n');
};


function note11_7(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var pingPong = new Tone.PingPongDelay("12n", volumeGesture/5);
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  });
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare5"
    },
    envelope : {
      attack : volumeGesture/8,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  });

  fmSynth.connect(gain).connect(phaser).connect(pingPong);
  gain.toMaster();

  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[10])), '12n');
};

function note12_7(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var pingPong = new Tone.PingPongDelay("12n", volumeGesture/5);
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  });
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare5"
    },
    envelope : {
      attack : volumeGesture/8,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  });

  fmSynth.connect(gain).connect(phaser).connect(pingPong);
  gain.toMaster();

  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[11])), '12n');
};


function note13_7(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var pingPong = new Tone.PingPongDelay("12n", volumeGesture/5);
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  });
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare5"
    },
    envelope : {
      attack : volumeGesture/8,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  });

  fmSynth.connect(gain).connect(phaser).connect(pingPong);
  gain.toMaster();

  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[12])), '12n');
};



function note14_7(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var pingPong = new Tone.PingPongDelay("12n", volumeGesture/5);
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  });
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare5"
    },
    envelope : {
      attack : volumeGesture/8,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  });

  fmSynth.connect(gain).connect(phaser).connect(pingPong);
  gain.toMaster();


  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[13])), '12n');
};


function note15_7(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var pingPong = new Tone.PingPongDelay("12n", volumeGesture/5);
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  });
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare5"
    },
    envelope : {
      attack : volumeGesture/8,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  });

  fmSynth.connect(gain).connect(phaser).connect(pingPong);
  gain.toMaster();


  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[14])), '12n');
};


function note16_7(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var pingPong = new Tone.PingPongDelay("12n", volumeGesture/5);
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  });
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare5"
    },
    envelope : {
      attack : volumeGesture/8,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  });

  fmSynth.connect(gain).connect(phaser).connect(pingPong);
  gain.toMaster();

  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[15])), '12n');
};


/////////////////////
///////aqua synth////
/////////////////////



function note1_8(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/10,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  });

  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[0])/2), '3n');
};

function note2_8(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/10,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  });

  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[1])/2), '3n');
};
function note3_8(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/10,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  });

  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[2])/2), '3n');
};
function note4_8(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/10,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  });

  roundsynth.connect(gain);
  gain.toMaster();


  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[3])/2), '3n');
};
function note5_8(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/10,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  });

  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[4])/2), '3n');
};
function note6_8(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/10,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  });

  roundsynth.connect(gain);
  gain.toMaster();


  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[5])/2), '3n');
};
function note7_8(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/10,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  });

  roundsynth.connect(gain);
  gain.toMaster();


  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[6])/2), '3n');
};
function note8_8(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/10,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  });

  roundsynth.connect(gain);
  gain.toMaster();


  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[7])/2), '3n');
};
function note9_8(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/10,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  });

  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[8])/2), '3n');
};
function note10_8(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/10,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  });

  roundsynth.connect(gain);
  gain.toMaster();


  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[9])/2), '3n');
};
function note11_8(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/10,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  });

  roundsynth.connect(gain);
  gain.toMaster();


  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[10])/2), '3n');
};
function note12_8(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/10,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  });

  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[11])/2), '3n');
};

function note13_8(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/10,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  });

  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[12])/2), '3n');
};

function note14_8(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/10,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  });

  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[13])/2), '3n');
};

function note15_8(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/10,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  });

  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[14])/2), '3n');
};

function note16_8(volumeGesture) {
  var gain  = new Tone.Gain(volumeGesture);
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : volumeGesture/10,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  });

  roundsynth.connect(gain);
  gain.toMaster();

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[15])/2), '3n');
};
