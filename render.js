import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

export const scene = new THREE.Scene()
export const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

export const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
})

renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
const controls = new OrbitControls(camera, renderer.domElement)

export function Draw() {
  renderer.render(scene, camera)
}