import * as THREE from 'three';
const loader = new THREE.FileLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const MAX_POINTS = 500;

// geometry
const geometry = new THREE.BufferGeometry();

// attributes
const positions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point
geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );

// draw range
const drawCount = 2; // draw the first 2 points, only
geometry.setDrawRange( 0, drawCount );

// material
const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

// line
const line = new THREE.Line( geometry, material );
scene.add( line );

const positionAttribute = line.geometry.getAttribute( 'position' );

let x = 0, y = 0, z = 0;

for ( let i = 0; i < positionAttribute.count; i ++ ) {

	positionAttribute.setXYZ( i, x, y, z );

    x += ( Math.random() - 0.5 ) * 30;
    y += ( Math.random() - 0.5 ) * 30;
    z += ( Math.random() - 0.5 ) * 30;

}

camera.position.z = 5;

function animate() {
	renderer.render( scene, camera );
}
