import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { Box, boxCollision } from './box.js'
import {ball} from './ball.js'

//https://youtu.be/sPereCgQnWQ?si=8OPsM8BTY7RlDg4E


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(4.61, 2.74, 8)

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
})
renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)


const cube = new Box({
  width: 1,
  height: 1,
  depth: 1,
  velocity: {
    x: 0,
    y: -0.01,
    z: 0
  }
})
cube.castShadow = true
scene.add(cube)

const ground = new Box({
  width: 10,
  height: 0.5,
  depth: 50,
  color: '#0369a1',
  position: {
    x: 0,
    y: -2,
    z: 0
  }
})

const geometry = new THREE.SphereGeometry( 1, 32, 16 ); 
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
const sphere = new THREE.Mesh( geometry, material ); scene.add( sphere );
sphere.position.y = 5

ground.receiveShadow = true
scene.add(ground)

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.y = 3
light.position.z = 1
light.castShadow = true
scene.add(light)

scene.add(new THREE.AmbientLight(0xffffff, 0.5))

camera.position.z = 5
console.log(ground.top)
console.log(cube.bottom)

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  s: {
    pressed: false
  },
  w: {
    pressed: false
  }
}

window.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyA':
      keys.a.pressed = true
      break
    case 'KeyD':
      keys.d.pressed = true
      break
    case 'KeyS':
      keys.s.pressed = true
      break
    case 'KeyW':
      keys.w.pressed = true
      break
    case 'Space':
      cube.velocity.y = 0.08
      break
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'KeyA':
      keys.a.pressed = false
      break
    case 'KeyD':
      keys.d.pressed = false
      break
    case 'KeyS':
      keys.s.pressed = false
      break
    case 'KeyW':
      keys.w.pressed = false
      break
  }
})

const enemies = []

let frames = 0
let spawnRate = 200
function animate() {
  const animationId = requestAnimationFrame(animate)
  renderer.render(scene, camera)

  // movement code
  cube.velocity.x = 0
  cube.velocity.z = 0
  if (keys.a.pressed) cube.velocity.x = -0.05
  else if (keys.d.pressed) cube.velocity.x = 0.05

  if (keys.s.pressed) cube.velocity.z = 0.05
  else if (keys.w.pressed) cube.velocity.z = -0.05

  cube.update(ground)
  enemies.forEach((enemy) => {
    enemy.update(ground)
    if (
      boxCollision({
        box1: cube,
        box2: enemy
      })
    ) {
      cancelAnimationFrame(animationId)
    }
  })

  if (frames % spawnRate === 0) {
    if (spawnRate > 20) spawnRate -= 20

    const enemy = new ball({
      width: 1,
      height: 1,
      depth: 1,
      position: {
        x: (Math.random() - 0.5) * 10,
        y: 0,
        z: -20
      },
      velocity: {
        x: 0,
        y: 0,
        z: 0.005
      },
      color: 'red',
      zAcceleration: true
    })
    enemy.castShadow = true
    scene.add(enemy)
    enemies.push(enemy)
  }

  frames++
  // cube.position.y += -0.01
  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01
}
animate()