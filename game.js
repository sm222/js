import * as THREE from 'three'
import { scene, camera } from './main.js'
import { Box } from './box.js'

let Round = 0
let Mode  = 0


export let   GameSize = 15
export let   PlayerSpeed = 0.15
export let   Players = []
export let   Map     = []
export let   Ball    = []
export let   Light   = []

export const keys = {
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
  },
  space: {
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
    case 'Space':
      stop = true
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
    case 'ArrowLeft':
      keys.left.pressed = false
      break
    case 'ArrowRight':
      keys.right.pressed = false
      break
  }
})


export function initGame(gamesize) {
  GameSize = gamesize
  PlayerSpeed = 0.15
  Round = 0
  //
  Map[0] = new Box({
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
  // player
  Players[0] = new Box({
    width: 2,
    height: 0.4,
    depth: 0.4,
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
  
  Players[1] = new Box({
    width: 2,
    height: 0.4,
    depth: 0.3,
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
  //
  Light[0] = new THREE.DirectionalLight(0xffffff, 1)
  Light[0].position.y = 3
  Light[0].position.z = 1
  Light[0].castShadow = true

  //
  scene.add(new THREE.AmbientLight(0xffffff, 0.5))
  Light.forEach(light => {
    light.castShadow = true
    scene.add(light)
  })
  //
  Players.forEach(player => {
    player.castShadow = true
    scene.add(player)
  })
  //
  Map.forEach(obj => {
    obj.receiveShadow = true
    scene.add(obj)
  })
  camera.position.set(Map[0].position.x / 2, Map[0].position.y + GameSize, Map[0].position.z / 2)
  camera.lookAt(Map[0].position)
  //Gaming(gamemode)
}

let GameLoop = 1

function Gaming() {
  if (GameLoop > 0)
    requestAnimationFrame(Gaming)
  //renderer.render(scene, camera)
}


// > call menu here