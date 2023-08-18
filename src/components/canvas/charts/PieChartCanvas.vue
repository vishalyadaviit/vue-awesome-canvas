<script lang="ts" setup>
import { ref, onMounted } from 'vue';
const canvasRef = ref(null)

function draw() {
    const canvas: HTMLCanvasElement = canvasRef.value!;
    const c: CanvasRenderingContext2D = canvas.getContext("2d")!;

    c.fillStyle = "#eaeaea";
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "blue";
    c.strokeStyle = "black";
    c.beginPath();
    c.moveTo(250, 250);
    c.arc(250, 250, 100, 0, 1 * Math.PI)
    c.stroke();
}

onMounted(() => {
    // const dataPoints = [16, 68, 20, 30, 54];
    draw();
})

</script>

<template>
    <canvas ref="canvasRef" height="500" width="500"></canvas>
</template>