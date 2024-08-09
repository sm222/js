import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { Box, boxCollision } from './box.js'
import {ball} from './ball.js'
import { Obj } from './obj.js'

//https://youtu.be/sPereCgQnWQ?si=8OPsM8BTY7RlDg4E


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
})
renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

const GameSize = 10
const playerSpeed = 0.15

const ground = new Box({
  width: GameSize,
  height: 0.5,
  depth: GameSize,
  color: '#0369a1',
  position: {
    x: 0,
    y: -2,
    z: 0
  }
})

const players = [];

players[0] = new Box({
  width: 2,
  height: 0.4,
  depth: 0.5,
    velocity: {
      x: 0,
      y: -0.01,
      z: 0
    },
    position: {
      x: 0,
      y: 0.5,
      z: (GameSize / 2) - (0.5 / 2)
    }
  })
  
  players[1] = new Box({
    width: 2,
  height: 0.4,
  depth: 0.5,
  color: 'red',
    velocity: {
      x: 0,
      y: -0.01,
      z: 0
    },
    position: {
      x: 0,
      y: 0.5,
      z: ((GameSize / 2) * - 1 ) + (0.5 / 2)
    }
  })
  
  players.forEach(player => {
    player.castShadow = true
    scene.add(player)
})

//players[0].castShadow = true
//scene.add(players[0])

ground.receiveShadow = true
scene.add(ground)
camera.position.set(ground.position.x / 2, ground.position.y + 10, ground.position.z / 2)
camera.lookAt(ground.position)

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.y = 3
light.position.z = 1
light.castShadow = true
scene.add(light)

scene.add(new THREE.AmbientLight(0xffffff, 0.5))

console.log(ground.top)
console.log(players[0].bottom)

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  left: {
    pressed: false
  },
  right: {
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
    case 'ArrowLeft':
      keys.left.pressed = true
      break
    case 'ArrowRight':
      keys.right.pressed = true
      break
    //case 'Space':
    //  players[0].velocity.y = 0.08
    //  break
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
    case 'ArrowLeft':
        keys.left.pressed = false
        break
    case 'ArrowRight':
      keys.right.pressed = false
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
  players.forEach(player => {
    player.velocity.x = 0
  })
  
  if (keys.a.pressed && players[0].position.x > (GameSize / 2) * -1 + (players[0].width / 2))
    players[0].velocity.x = playerSpeed * -1
  else if (keys.d.pressed && players[0].position.x < (GameSize / 2) - (players[0].width / 2))
    players[0].velocity.x = playerSpeed
  
  if (keys.left.pressed) {
    players[1].velocity.x = playerSpeed
  }
  else if (keys.right.pressed) 
    players[1].velocity.x = playerSpeed * -1
  
  players.forEach((player) => {
    player.update(ground)
  })
  
  enemies.forEach((enemy) => {
    enemy.update(ground)
    if (
      boxCollision({
        box1: players[0],
        box2: enemy
      })
    ) {
      cancelAnimationFrame(animationId)
    }
  })

  if (frames % spawnRate === 0) {
    if (spawnRate > 20) spawnRate -= 20

    const enemy = new ball({
      width: 2,
      height: 2,
      depth: 2,
      color: 'red',
      velocity: {
        x: 0,
        y: 0,
        z: 0.005
      },
      position: {
        x: (Math.random() - 0.5) * 10,
        y: 0,
        z: -20
      },
      zAcceleration: true
    })
    enemy.castShadow = true
    scene.add(enemy)
    enemies.push(enemy)
  }

  frames++
  // players[0].position.y += -0.01
  // players[0].rotation.x += 0.01
  // players[0].rotation.y += 0.01
}
animate()