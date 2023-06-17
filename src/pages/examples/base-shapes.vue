<script setup lang="ts">

import { ref, onMounted, onBeforeUnmount } from 'vue'
import RectCanvas from '@/components/canvas/base-shapes/RectCanvas.vue';
import DrawingCanvas from '@/components/canvas/base-shapes/DrawingCanvas.vue';
import earthSrc from '@/assets/earth.webp'

const canvasRef = ref(null)
const canvasWidth = 400;
const canvasHeight = 400;
let requestId;
let c: CanvasRenderingContext2D
let radian = 1;
const img = new Image()
let earth: Earth

class Earth {
    c: CanvasRenderingContext2D
    initialX: number
    initialY: number
    x: number
    y: number
    orbitDistance: number
    angularVelocity: number
    img: HTMLImageElement
    radian: number

    constructor(c: CanvasRenderingContext2D, initialX: number, initialY: number, orbitDistance: number, angularVelocity: number) {
        this.c = c
        this.initialX = initialX
        this.initialY = initialY
        this.x = initialX + orbitDistance
        this.y = initialY
        this.orbitDistance = orbitDistance
        this.angularVelocity = angularVelocity
        this.radian = angularVelocity
        this.img = new Image()
        this.loadEarth()
    }

    loadEarth() {
        this.img.onload = () => {
            this.c.drawImage(this.img, this.x, this.y, 48, 48)
        }
        this.img.src = earthSrc
    }

    update() {
        this.radian = this.radian + this.angularVelocity
        this.x = this.initialX - 24 + this.orbitDistance * Math.cos(this.radian * (Math.PI / 180))
        this.y = this.initialY - 24 + this.orbitDistance * Math.sin(this.radian * (Math.PI / 180))
        console.log(`this.x`, this.x)
        console.log(`this.y`, this.y)
        // this.c.drawImage(this.img, this.x, this.y, 48, 48)
        this.draw()
    }

    draw() {
        this.c.strokeStyle = 'white';
        c.lineWidth = 0.5
        this.c.beginPath()
        this.c.arc(canvasWidth / 2, canvasHeight / 2, 75, 0, 2 * Math.PI);
        this.c.stroke()

        this.c.drawImage(this.img, this.x, this.y, 48, 48)
    }
}

// c.moveTo(canvasWidth / 2, canvasHeight / 2);
// c.fillStyle = 'white'
// c.fillRect(canvasWidth / 2, canvasHeight / 2, 100, 50)

// c.translate(canvasWidth / 2, canvasHeight / 2);

// c.rotate((15 * Math.PI) / 180);
// c.fillStyle = "red";
// c.fillRect(100, 0, 80, 20);
// c.setTransform(1, 0, 0, 1, 0, 0);

// c.rotate((45 * Math.PI) / 180);
// c.fillStyle = "red";
// c.fillRect(100, 0, 80, 20);
// c.save();

// const img = new Image()
// console.log('radian', radian)

// img.onload = () => {
//     // console.log('rotateBrick calklked')
//     c.drawImage(img, canvasWidth / 2, canvasHeight / 2, 48, 48)
//     // animate()
// }
// img.src = earth
// c.rotate((radian / 180) * Math.PI);
// c.translate(-canvasWidth / 2, -canvasHeight / 2)
// c.restore();
// c.translate(100, 0);

function animate() {
    c.clearRect(0, 0, canvasWidth, canvasHeight)
    requestId = requestAnimationFrame(animate)
    earth.update()
}

onMounted(() => {
    const canvas: HTMLCanvasElement = canvasRef.value!
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    c = canvas.getContext('2d')
    // c.translate(canvasWidth / 2, canvasHeigh1t / 2)
    earth = new Earth(c, canvasWidth / 2, canvasHeight / 2, 75, 2)
    animate()
})

onBeforeUnmount(() => {
    cancelAnimationFrame(requestId)
})

</script>

<template>
    <div class="gap-4">
        <h1 class="text-xl text-gray-600 my-3">Base Shapes</h1>
        <canvas ref="canvasRef" style="background-color: black;"></canvas>
        <RectCanvas></RectCanvas>
        <DrawingCanvas></DrawingCanvas>
    </div>
</template>