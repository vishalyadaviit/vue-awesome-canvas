<script lang="ts" setup>
import { defineProps, onMounted, onBeforeUnmount, ref } from 'vue';
const canvasRef = ref(null);
const canvasWidth = 750;
const canvasHeight = 750;
let requestId: number;
let counter = 0;
let twoPlanets;
import earthSrc from '@/assets/earth.webp'
import marsSrc from '@/assets/mars.png'
import sunImgSrc from '@/assets/sunPng.png'
// import starrySrc from '@/assets/starrySmall.jpg
import starrySrc from '@/assets/hdSpace.jpg'

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
        default: 230
    }
})


class Sun {
    c: CanvasRenderingContext2D
    img = HTMLImageElement
    sunSize = 60
    constructor(c: CanvasRenderingContext2D) {
        this.c = c
        this.img = new Image()
        this.img.onload = () => {
            c.drawImage(this.img, canvasWidth / 2 - 40, canvasHeight / 2 - 40, this.sunSize, this.sunSize)
        }
        this.img.src = sunImgSrc
    }

    draw() {
        this.c.drawImage(this.img, canvasWidth / 2 - this.sunSize / 2, canvasHeight / 2 - this.sunSize / 2, this.sunSize, this.sunSize)
    }

    update() {
        this.draw()
    }
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
        // To create orbit circle starts here
        this.c.strokeStyle = 'white'
        this.c.lineWidth = 0.25
        this.c.beginPath()
        this.c.arc(canvasWidth / 2, canvasHeight / 2, this.orbitDistance, 0, 2 * Math.PI)
        this.c.stroke();
        // To create orbit circle ends here

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
    sun: Sun
    innerPlanet: Planet
    outerPlanet: Planet
    spaceBgImg: HTMLImageElement

    spiderPoints: Array<any> = []

    constructor(c: CanvasRenderingContext2D) {
        this.c = c
        this.sun = new Sun(c)
        this.innerPlanet = new Planet(c, props.innerPlanetOrbitDistance, props.innerPlanetSpeed, earthSrc, 24)
        this.outerPlanet = new Planet(c, props.outerPlanetOrbitDistance, props.outerPlanetSpeed, marsSrc, 36)
        // this.spaceBgImg = new Image()
        // this.spaceBgImg.onload = () => {
        //     this.c.drawImage(this.spaceBgImg, 0, 0)
        // }
        // this.spaceBgImg.src = starrySrc
    }

    draw() {
        this.c.beginPath();
        this.c.moveTo(this.outerPlanet.x, this.outerPlanet.y);
        this.c.lineTo(this.innerPlanet.x, this.innerPlanet.y)
        this.c.stroke()

        for (let planet of this.spiderPoints) {
            this.c.beginPath();
            this.c.moveTo(planet.outerPlanet.x, planet.outerPlanet.y);
            this.c.lineTo(planet.innerPlanet.x, planet.innerPlanet.y)
            this.c.stroke()
        }
    }

    update() {
        // this.c.drawImage(this.spaceBgImg, 0, 0)
        this.spiderPoints.push({
            innerPlanet: {
                x: this.innerPlanet.x,
                y: this.innerPlanet.y
            },
            outerPlanet: {
                x: this.outerPlanet.x,
                y: this.outerPlanet.y
            }
        })
        this.draw();
        this.sun.update();
        this.innerPlanet.update();
        this.outerPlanet.update();
    }
}

function animate(c: CanvasRenderingContext2D) {
    counter++;
    if (counter <= 2160) {
        c.clearRect(0, 0, canvasWidth, canvasHeight)
        twoPlanets.update();
        requestId = requestAnimationFrame(() => animate(c));
    }
}

onMounted(() => {
    const canvas: HTMLCanvasElement = canvasRef.value!
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    const c: CanvasRenderingContext2D = canvas.getContext('2d');
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