<script lang="ts" setup>
import { onMounted, ref } from 'vue';
const canvasRef = ref(null);
const canvasWidth = 1000;
const canvasHeight = 1000;


function createSun(c: CanvasRenderingContext2D) {
    // c.strokeStyle = 'orange'
    c.fillStyle = '#ff6c00'

    // c.moveTo(canvasWidth/2, canvasHeight/2)
    c.beginPath()
    c.arc(canvasWidth / 2, canvasHeight / 2, 30, 0, 2 * Math.PI)
    c.fill();
}


function createMarsOrbit(c: CanvasRenderingContext2D) {
    c.strokeStyle = 'white'
    // c.moveTo(canvasWidth/2, canvasHeight/2)
    c.beginPath()
    c.arc(canvasWidth / 2, canvasHeight / 2, 450, 0, 2 * Math.PI)
    c.stroke();
}

function createEarthOrbit(c: CanvasRenderingContext2D) {
    c.strokeStyle = 'white'
    // c.moveTo(canvasWidth/2, canvasHeight/2)
    c.beginPath()
    c.arc(canvasWidth / 2, canvasHeight / 2, 250, 0, 2 * Math.PI)
    c.stroke();
}

class Earth {
    c: CanvasRenderingContext2D
    x: number
    y: number
    dx: number
    dy: number
    radius: number
    minRadius: number
    color: string

    constructor(c: CanvasRenderingContext2D, x: number, y: number, dx: number, dy: number, radius: number) {
        this.c = c
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius
        this.minRadius = radius
        this.color = colorPallete[Math.floor(Math.random() * 5)]

    }
}

function drawEarthLines(c: CanvasRenderingContext2D) {

}

onMounted(() => {
    const canvas: HTMLCanvasElement = canvasRef.value!
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;

    const c: CanvasRenderingContext2D = canvas.getContext('2d');
    createSun(c);
    createMarsOrbit(c);
    createEarthOrbit(c);
})

</script>
<template>
    <canvas style="background-color: black;" ref="canvasRef">

    </canvas>
</template>