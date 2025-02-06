<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const props = defineProps({
  avatar: {
    type: String,
    required: true
  }
})

const containerRef = ref(null)
let scene, camera, renderer, controls, bubble, bubbleInner

const init3D = () => {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  })
  renderer.setSize(150, 150)
  containerRef.value.appendChild(renderer.domElement)

  // Створюємо зовнішню бульбашку
  const bubbleGeometry = new THREE.SphereGeometry(1, 64, 64)
  const bubbleMaterial = new THREE.MeshPhysicalMaterial({
    transparent: true,
    opacity: 0.2,
    roughness: 0.1,
    metalness: 0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    ior: 1.5,
    iridescence: 0.3,
    iridescenceIOR: 1.5,
    transmission: 0.99
  })
  bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial)
  scene.add(bubble)

  // Створюємо внутрішню сферу з аватаром
  const innerGeometry = new THREE.SphereGeometry(0.8, 32, 32)
  const texture = new THREE.TextureLoader().load(props.avatar)
  const innerMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    metalness: 0.1,
    roughness: 0.5
  })
  bubbleInner = new THREE.Mesh(innerGeometry, innerMaterial)
  scene.add(bubbleInner)

  // Додаємо світло
  const light1 = new THREE.DirectionalLight(0xffffff, 1)
  light1.position.set(5, 5, 5)
  scene.add(light1)

  const light2 = new THREE.DirectionalLight(0xffffff, 0.5)
  light2.position.set(-5, -5, -5)
  scene.add(light2)

  // Додаємо точкові джерела світла для бліків
  const spotLight1 = new THREE.PointLight(0xffffff, 1, 10)
  spotLight1.position.set(2, 2, 2)
  scene.add(spotLight1)

  const spotLight2 = new THREE.PointLight(0xffffff, 0.5, 10)
  spotLight2.position.set(-2, -2, 2)
  scene.add(spotLight2)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
  scene.add(ambientLight)

  camera.position.z = 3

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.enableZoom = false
  controls.autoRotate = true
  controls.autoRotateSpeed = 3

  animate()
}

const animate = () => {
  requestAnimationFrame(animate)

  if (bubble && bubbleInner) {
    const time = Date.now() * 0.001
    // Плавна пульсація
    const scale = 1 + Math.sin(time) * 0.03
    bubble.scale.set(scale, scale, scale)
    bubbleInner.scale.set(scale, scale, scale)

    // Додаткова анімація переливання
    bubble.rotation.y = time * 0.2
    bubbleInner.rotation.y = time * 0.1
  }

  controls.update()
  renderer.render(scene, camera)
}

const handleMouseEnter = () => {
  if (controls) {
    controls.autoRotateSpeed = 10
  }
}

const handleMouseLeave = () => {
  if (controls) {
    controls.autoRotateSpeed = 3
  }
}

onMounted(() => {
  init3D()
})

onUnmounted(() => {
  if (renderer) {
    renderer.dispose()
    scene.dispose()
  }
})
</script>

<template>
  <div ref="containerRef" class="avatar-3d" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"></div>
</template>

<style scoped>
.avatar-3d {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;
  background: rgba(52, 152, 219, 0.05);
  transition: transform 0.3s ease;
}

.avatar-3d:hover {
  transform: scale(1.05);
}

.avatar-3d canvas {
  border-radius: 50%;
}
</style>
