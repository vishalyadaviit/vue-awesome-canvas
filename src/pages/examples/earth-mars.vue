<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
const canvasRef = ref(null);
const canvasWidth = 1000;
const canvasHeight = 1000;
const earthOrbitDistance = 250;
const marsOrbitDistance = 450;
let requestId: number;
let counter = 0;
let earth: any;


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
    c.arc(canvasWidth / 2, canvasHeight / 2, marsOrbitDistance, 0, 2 * Math.PI)
    c.stroke();
}

function createEarthOrbit(c: CanvasRenderingContext2D) {
    c.strokeStyle = 'white'
    // c.moveTo(canvasWidth/2, canvasHeight/2)
    c.beginPath()
    c.arc(canvasWidth / 2, canvasHeight / 2, earthOrbitDistance, 0, 2 * Math.PI)
    c.stroke();
}

class Earth {
    c: CanvasRenderingContext2D
    x: number
    y: number
    dTheta: number
    // radius: number

    constructor(c: CanvasRenderingContext2D, dTheta: number,) {
        this.c = c
        this.dTheta = dTheta;

        this.x = canvasWidth / 2 + earthOrbitDistance * Math.cos((this.dTheta / 180) * Math.PI)
        this.y = canvasHeight / 2 + earthOrbitDistance * Math.sin((this.dTheta / 180) * Math.PI)
        // this.radius = radius
    }

    draw() {
        this.c.beginPath();
        this.c.moveTo(this.x, this.y);
        this.c.lineTo(canvasWidth / 2, canvasHeight / 2)
        this.c.stroke()
    }

    update() {
        this.dTheta += 2
        this.x = canvasWidth / 2 + earthOrbitDistance * Math.cos((this.dTheta / 180) * Math.PI)
        this.y = canvasHeight / 2 + earthOrbitDistance * Math.sin((this.dTheta / 180) * Math.PI)
        this.draw()
    }
}



function animate(c: CanvasRenderingContext2D) {
    counter++;
    console.log(`counter called`, counter)
    requestId = requestAnimationFrame(() => {
        while (counter < 180) {
            animate(c)
        }
    });
    // console.log(`animate called`, requestId)
    // c.clearRect(0, 0, canvasWidth, canvasHeight);
    // for (let i = 1; i < 100; i++) {
    earth.update();
    // }
}

onMounted(() => {
    const canvas: HTMLCanvasElement = canvasRef.value!
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    const c: CanvasRenderingContext2D = canvas.getContext('2d');
    createSun(c);
    createMarsOrbit(c);
    createEarthOrbit(c);
    // drawEarthLines(c);
    earth = new Earth(c, 0)
    animate(c);
})

onBeforeUnmount(() => {
    cancelAnimationFrame(requestId)
})

</script>
<template>
    <canvas style="background-color: black;" ref="canvasRef">

    </canvas>
</template>