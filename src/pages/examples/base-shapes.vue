<script setup lang="ts">

import { ref, onMounted, onBeforeUnmount } from 'vue'
import RectCanvas from '@/components/canvas/base-shapes/RectCanvas.vue';
import DrawingCanvas from '@/components/canvas/base-shapes/DrawingCanvas.vue';
import earth from '@/assets/earth.jpg'

const canvasRef = ref(null)
const canvasWidth = 400;
const canvasHeight = 400;
let requestId;
let c: CanvasRenderingContext2D
let radian = 1;
function rotateBrick() {

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

    const img = new Image()
    console.log('radian', radian)

    img.onload = () => {
        console.log('rotateBrick calklked')
        c.drawImage(img, 100, 0)
    }
    img.src = earth
    c.rotate((radian / 180) * Math.PI);
    // c.translate(-canvasWidth / 2, -canvasHeight / 2)
    // c.restore();
    // c.translate(100, 0);
}

function animate() {
    radian = 0.1
    // c.fillRect(0, 0, canvasWidth, canvasHeight)
    requestId = requestAnimationFrame(animate)
    rotateBrick()
}

onMounted(() => {
    const canvas: HTMLCanvasElement = canvasRef.value!
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    c = canvas.getContext('2d')
    c.translate(canvasWidth / 2, canvasHeight / 2)

    // rotateBrick()
    animate()
})

onBeforeUnmount(() => {
    cancelAnimationFrame(requestId)
})

</script>

<template>
    <div class="gap-4">
        <h1 class="text-xl text-gray-600 my-3">Base Shapes</h1>
        <canvas ref="canvasRef" style="background-color: black;">

        </canvas>
        <RectCanvas></RectCanvas>
        <DrawingCanvas></DrawingCanvas>



    </div>
</template>