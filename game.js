import * as THREE from 'three';


const KeyForward =  87;
const KeyBackword = 83;

const MaxY = 3;
const MinY = MaxY * -1;

const gameScene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const Renderer = new THREE.WebGLRenderer();
Renderer.setSize( window.innerWidth, window.innerHeight );
Renderer.setAnimationLoop( renderAnimate );
document.body.appendChild( Renderer.domElement );

document.addEventListener("keydown", Keypress, false);

function Keypress (event) {
	var keyCode = event.which;
	console.log(keyCode);
	switch (keyCode) {
		case KeyForward:
			if (cube.position.y < MaxY)
				cube.position.y += 0.05;
			break;
		case KeyBackword:
			if (cube.position.y > MinY)
				cube.position.y -= 0.05;
				break;
		default:
			break;
	}
};

const geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
gameScene.add( cube );

const plane = new THREE.BoxGeometry(100,100,0.1);
const planeColor = new THREE.MeshBasicMaterial({ color: 0x265187 } );
const planeMesh = new THREE.Mesh(plane, planeColor);
gameScene.add(planeMesh);
planeMesh.z = -1;

function renderAnimate() {
	Renderer.render(gameScene, camera);
}

export function test() {
	animate(gameScene);
}

renderAnimate();

camera.position.z = 5;
