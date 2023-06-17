<script lang="ts" setup>
import { defineProps, onMounted, onBeforeUnmount, ref } from 'vue';
const canvasRef = ref(null);
const canvasWidth = 500;
const canvasHeight = 500;
let requestId: number;
let counter = 0;
let twoPlanets;
import earthSrc from '@/assets/earth.webp'
import marsSrc from '@/assets/mars.png'

const props = defineProps({
    innerPlanetSpeed: {
        type: Number,
        default: 10
    },
    innerPlanetOrbitDistance: {
        type: Number,
        default: 75
    },
    outerPlanetSpeed: {
        type: Number,
        default: 1
    },
    outerPlanetOrbitDistance: {
        type: Number,
        default: 240
    }
})

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
    c.lineWidth = 0.25
    c.beginPath()
    c.arc(canvasWidth / 2, canvasHeight / 2, props.outerPlanetOrbitDistance, 0, 2 * Math.PI)
    c.stroke();
}

function createEarthOrbit(c: CanvasRenderingContext2D) {
    c.strokeStyle = 'white'
    c.beginPath()
    c.arc(canvasWidth / 2, canvasHeight / 2, props.innerPlanetOrbitDistance, 0, 2 * Math.PI)
    c.stroke();
}


class Planet {
    c: CanvasRenderingContext2D
    orbitDistance: number
    angularSpeed: number
    dTheta: number
    x: number
    y: number
    planetSize: number;
    planetXPos: number
    planetYPos: number
    img: HTMLImageElement

    constructor(c: CanvasRenderingContext2D, orbitDistance: number, angularSpeed: number, planetImgSrc: string, planetSize: number) {
        this.c = c
        this.orbitDistance = orbitDistance
        this.angularSpeed = angularSpeed
        this.dTheta = 0;
        this.planetSize = planetSize

        this.x = canvasWidth / 2 + this.orbitDistance * Math.cos((this.dTheta / 180) * Math.PI)
        this.y = canvasHeight / 2 + this.orbitDistance * Math.sin((this.dTheta / 180) * Math.PI)

        this.planetXPos = canvasWidth / 2 - this.planetSize / 2 + this.orbitDistance * Math.cos((this.dTheta / 180) * Math.PI)
        this.planetYPos = canvasHeight / 2 - this.planetSize / 2 + this.orbitDistance * -(Math.sin((this.dTheta / 180) * Math.PI))

        this.img = new Image()
        this.img.onload = () => {
            this.c.drawImage(this.img, this.planetXPos, this.planetYPos, this.planetSize, this.planetSize)
        }
        this.img.src = planetImgSrc
    }

    draw() {
        this.c.drawImage(this.img, this.planetXPos, this.planetYPos, this.planetSize, this.planetSize)
    }

    update() {
        this.dTheta += this.angularSpeed
        this.x = canvasWidth / 2 + this.orbitDistance * Math.cos((this.dTheta / 180) * Math.PI)
        this.y = canvasHeight / 2 + this.orbitDistance * -(Math.sin((this.dTheta / 180) * Math.PI))

        this.planetXPos = canvasWidth / 2 - this.planetSize / 2 + this.orbitDistance * Math.cos((this.dTheta / 180) * Math.PI)
        this.planetYPos = canvasHeight / 2 - this.planetSize / 2 + this.orbitDistance * -(Math.sin((this.dTheta / 180) * Math.PI))
        this.draw()
    }
}

class DrawTwoPlanetRelativePosition {
    c: CanvasRenderingContext2D
    earth: Planet
    mars: Planet

    constructor(c: CanvasRenderingContext2D) {
        this.c = c
        this.earth = new Planet(c, props.innerPlanetOrbitDistance, props.innerPlanetSpeed, earthSrc, 24)
        this.mars = new Planet(c, props.outerPlanetOrbitDistance, props.outerPlanetSpeed, marsSrc, 36)
    }

    draw() {
        this.c.beginPath();
        this.c.moveTo(this.mars.x, this.mars.y);
        this.c.lineTo(this.earth.x, this.earth.y)
        this.c.stroke()
    }

    update() {
        this.earth.update();
        this.mars.update();
        this.draw();
    }
}

function animate(c: CanvasRenderingContext2D) {
    counter++;
    // console.log(`counter called`, counter)
    if (counter <= 360) {
        requestId = requestAnimationFrame(() => animate(c));
        twoPlanets.update();
    }
}

onMounted(() => {
    const canvas: HTMLCanvasElement = canvasRef.value!
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    const c: CanvasRenderingContext2D = canvas.getContext('2d');
    createSun(c);
    createMarsOrbit(c);
    createEarthOrbit(c);

    twoPlanets = new DrawTwoPlanetRelativePosition(c)
    animate(c);
})

onBeforeUnmount(() => {
    cancelAnimationFrame(requestId)
})

</script>
<template>
    <canvas class="inline-block" style="background-color: black;" ref="canvasRef"></canvas>
</template>