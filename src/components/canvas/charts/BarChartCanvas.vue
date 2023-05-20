<script lang="ts" setup>
import { ref, onMounted } from 'vue';
const canvasRef = ref(null)

function drawBarChart(dataPoints: Array<number>) {
    const canvas: HTMLCanvasElement = canvasRef.value!;
    const c: CanvasRenderingContext2D = canvas.getContext("2d")!;

    c.fillStyle = "white";
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "blue";
    // c.fillRect(20, 0, 30, 300);
    for (let i = 0; i < dataPoints.length; i++) {
        const dp = dataPoints[i];
        c.fillRect(40 + i * 100, 460 - dp * 5, 50, dp * 5);
        // c.fillRect(20 + i * 100, 500 - dp * 5 - 30, 50, pointVal * 5);
    }

    // creating axis lines
    c.fillStyle = "black";
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(30, 10);
    c.lineTo(30, 460);
    c.lineTo(490, 460);
    c.stroke();
}

onMounted(() => {
    const dataPoints = [16, 68, 20, 30, 54];
    drawBarChart(dataPoints);
})

</script>

<template>
    <canvas ref="canvasRef" height="500" width="500"></canvas>
</template>