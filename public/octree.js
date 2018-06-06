var container;
var camera;
var scene;
var renderer;
var buttonRaycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var INTERSECTED;
var radius = 500;
var theta = 0;
var frustumSize = 1000;
var controlButtonObjects = [];
var currID = 0;

init();
animate();


function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );
	var aspect = window.innerWidth / window.innerHeight;
	camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );
	scene = new THREE.Scene();
	var light = new THREE.DirectionalLight( 0xffffff, 1 );
	light.position.set( 1, 1, 1 ).normalize();
	scene.add( light );



	//////1st obj


	var buttonLoaderManager = new THREE.LoadingManager();
	var buttonLoader = new THREE.OBJLoader( buttonLoaderManager );

	for (let i = 0; i < 6; i++){
		var name = "poly0"+(i+1);

		var buttonNameArray = ['models/poly01.obj', 'models/poly02.obj', 'models/poly03.obj', 'models/poly04.obj', 'models/poly05.obj', 'models/poly06.obj','models/poly07.obj','models/poly08.obj' ];

		var buttonColorArray = [0xF10037, 0xFFEE3B, 0x4E2299, 0xFF8E2B, 0x12FF7A, 0xFF4429];

		buttonLoader.load( buttonNameArray[i], function ( noteObject, posi ) {
			var currButtonPosition = -250+i*100;
			var materialSynth01 = new THREE.MeshLambertMaterial( { color: buttonColorArray[i] }  );
			var materialSynth02 = new THREE.MeshLambertMaterial( { color: buttonColorArray[i] }  );
			var materialSynth03 = new THREE.MeshLambertMaterial( { color: buttonColorArray[i] }  );
			var materialSynth04 = new THREE.MeshLambertMaterial( { color: buttonColorArray[i] }  );
			var materialSynth05 = new THREE.MeshLambertMaterial( { color: buttonColorArray[i] }  );
			var materialSynth06 = new THREE.MeshLambertMaterial( { color: buttonColorArray[i] }  );

			noteObject.position.x = currButtonPosition;
			noteObject.position.y = 100;
			noteObject.position.z = 0;
			noteObject.children[0].material = materialSynth01;
			noteObject.children[0].material.opacity = .5;
			noteObject.children[0].rotation.y = -45 * (Math.PI / 180);
			noteObject.children[0].rotation.x = 45 * (Math.PI / 180);
			noteObject.children[0].rotation.z =0;
			noteObject.scale.x = .6;
			noteObject.scale.y = .6;
			noteObject.scale.z = .6;
			noteObject.name = "noteObject"+(i+1) ;
			scene.add( ( noteObject ) );
			controlButtonObjects.push ( noteObject );
		} );
	}

	renderer = new THREE.WebGLRenderer( { alpha: true } );

	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild(renderer.domElement);

	// document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener("touchstart", onDocumentMouseDown, false);
	window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
	var aspect = window.innerWidth / window.innerHeight;
	camera.left   = - frustumSize * aspect / 2;
	camera.right  =   frustumSize * aspect / 2;
	camera.top    =   frustumSize / 2;
	camera.bottom = - frustumSize / 2;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}


function onDocumentMouseDown( event ) {
	event.preventDefault();
	if(event.type == "mousedown"){
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	}else{
		mouse.x = ( event.touches[0].clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.touches[0].clientY / window.innerHeight ) * 2 + 1;
	}
}

function animate() {
	requestAnimationFrame( animate );
	render();
}



function render() {


	camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
	camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
	camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );


	camera.lookAt( scene.position );
	camera.updateMatrixWorld();


	// find intersections

	buttonRaycaster.setFromCamera( mouse, camera );
	var intersects = buttonRaycaster.intersectObjects( scene.children, true );
	if ( intersects.length > 0 ) {
		if ( INTERSECTED != intersects[ 0 ].object ) {

			if ( INTERSECTED != null) {
				INTERSECTED.material.opacity = .5;
			}

			INTERSECTED = intersects[ 0 ].object;

			if( INTERSECTED.parent.name == "noteObject1") {
				currID = 1;
				console.log("id", currID);
				INTERSECTED.material.opacity = 1.0;
			} else if ( INTERSECTED.parent.name == "noteObject2" ){
				currID = 2;
				console.log("id", currID);
				INTERSECTED.material.opacity = 1.0;
			} else if ( INTERSECTED.parent.name == "noteObject3" ){
				currID = 3;
				console.log("id", currID);
				INTERSECTED.material.opacity = 1.0;
			} else if ( INTERSECTED.parent.name == "noteObject4" ){
				currID = 4;
				console.log("id", currID);
				INTERSECTED.material.opacity = 1.0;
			} else if ( INTERSECTED.parent.name == "noteObject5" ){
				currID = 5;
				console.log("id", currID);
				INTERSECTED.material.opacity = 1.0;
			} else if ( INTERSECTED.parent.name == "noteObject6" ){
				currID = 6;
				console.log("id", currID);
				INTERSECTED.material.opacity = 1.0;
			}
		}
	}




	renderer.render( scene, camera );
}
