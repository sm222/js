import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { Box, boxCollision } from './box.js'
import {ball} from './ball.js'
import { Obj } from './obj.js'
import { initGame, Map, Players, GameSize, PlayerSpeed, keys } from './game.js'

//https://youtu.be/sPereCgQnWQ?si=8OPsM8BTY7RlDg4E


export const scene = new THREE.Scene()
export const camera = new THREE.PerspectiveCamera(
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



//
initGame(10)

var stop = false



//let frames = 0
//let spawnRate = 200
function animate() {
  if (!stop)
    requestAnimationFrame(animate)
  renderer.render(scene, camera)
  
  // movement code
  Players.forEach(player => {
    player.velocity.x = 0
  })
  
  if (keys.a.pressed && Players[0].position.x > (GameSize / 2) * -1 + (Players[0].width / 2)) {
    Players[0].velocity.x = PlayerSpeed * -1
  }
  else if (keys.d.pressed && Players[0].position.x < (GameSize / 2) - (Players[0].width / 2)) {
    Players[0].velocity.x = PlayerSpeed
  }
  
  if (keys.left.pressed && Players[1].position.x > (GameSize / 2) * -1 + (Players[1].width / 2)) {
    Players[1].velocity.x = PlayerSpeed * -1
  }
  else if (keys.right.pressed && Players[1].position.x < (GameSize / 2) - (Players[1].width / 2)) {
    Players[1].velocity.x = PlayerSpeed
  }

  Players.forEach((player) => {
    player.update(Map[0])
  })
}


animate()


  
  //    funny gamemode
  // let ing = Math.atan2(players[1].position.y - players[0].position.y , players[1].position.x - players[0].position.x)
  // console.log(ing)
  //camera.rotation.z = ing




  //enemies.forEach((enemy) => {
    //  enemy.update(ground)
    //  if (
      //    boxCollision({
        //      box1: players[0],
        //      box2: enemy
        //    })
        //  ) {
  //    cancelAnimationFrame(animationId)
  //  }
  //})
  
  //if (frames % spawnRate === 0) {
    //  if (spawnRate > 20) spawnRate -= 20
    
    //  const enemy = new ball({
      //    width: 2,
      //    height: 2,
      //    depth: 2,
      //    color: 'red',
      //    velocity: {
        //      x: 0,
        //      y: 0,
        //      z: 0.005
        //    },
        //    position: {
          //      x: (Math.random() - 0.5) * 10,
          //      y: 0,
          //      z: -20
          //    },
          //    zAcceleration: true
          //  })
          //  enemy.castShadow = true
          //  scene.add(enemy)
          //  enemies.push(enemy)
          //}
          
          //frames++
          // players[0].position.y += -0.01
  // players[0].rotation.x += 0.01
  // players[0].rotation.y += 0.01