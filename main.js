import * as THREE from 'three'
import { Box, boxCollision } from './box.js'
import { initGame} from './game.js'

//https://youtu.be/sPereCgQnWQ?si=8OPsM8BTY7RlDg4E




//
initGame(10)

//let frames = 0
//let spawnRate = 200
//function animate() {
//  if (!stop)
//    requestAnimationFrame(animate)
//  
//  // movement code
//}
//
//animate()

  
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