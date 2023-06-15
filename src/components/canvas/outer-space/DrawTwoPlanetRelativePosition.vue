<script lang="ts" setup>
import { defineProps, onMounted, onBeforeUnmount, ref, withCtx } from 'vue';
const canvasRef = ref(null);
const canvasWidth = 500;
const canvasHeight = 500;
let requestId: number;
let counter = 0;
let twoPlanets;
import earth from '@/assets/earth.jpg'

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
    // c.moveTo(canvasWidth/2, canvasHeight/2)
    c.beginPath()
    c.arc(canvasWidth / 2, canvasHeight / 2, props.outerPlanetOrbitDistance, 0, 2 * Math.PI)
    c.stroke();

}

function createEarthOrbit(c: CanvasRenderingContext2D) {
    c.strokeStyle = 'white'
    // c.moveTo(canvasWidth/2, canvasHeight/2)
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
    earthXPos: number
    earthYPos: number

    constructor(c: CanvasRenderingContext2D, orbitDistance: number, angularSpeed: number, planetSize: number) {
        this.c = c
        this.orbitDistance = orbitDistance
        this.angularSpeed = angularSpeed
        this.dTheta = 0;
        this.planetSize = planetSize

        this.x = canvasWidth / 2 + this.orbitDistance * Math.cos((this.dTheta / 180) * Math.PI)
        this.y = canvasHeight / 2 + this.orbitDistance * Math.sin((this.dTheta / 180) * Math.PI)

        this.earthXPos = canvasWidth / 2 + this.orbitDistance * Math.cos((this.dTheta / 180) * Math.PI)
        this.earthYPos = canvasHeight / 2 + this.orbitDistance * Math.sin((this.dTheta / 180) * Math.PI)
    }

    draw() {
        // this.c.beginPath();
        // this.c.moveTo(this.x, this.y);
        // this.c.lineTo(canvasWidth / 2, canvasHeight / 2)
        // this.c.stroke()

        console.log(`createMarsOrbit ca;l;ed`)
        console.log(props.innerPlanetOrbitDistance);
        this.c.translate(canvasWidth / 2, canvasHeight / 2);


        const img = new Image()
        // const earthXPos = (canvasWidth / 2) + innerPlanetOrbitDistance - earthSize / 2

        // const earthYPos = (canvasHeight / 2) + -earthSize / 2
        console.log(this.earthXPos)
        console.log(this.earthYPos)

        img.onload = () => {
            this.c.drawImage(img, this.earthXPos, this.earthYPos)
        }
        // c.rotate((45 * Math.PI) / 180);
        img.src = earth
    }

    update() {
        this.dTheta += this.angularSpeed
        this.x = canvasWidth / 2 + this.orbitDistance * Math.cos((this.dTheta / 180) * Math.PI)
        this.y = canvasHeight / 2 + this.orbitDistance * -(Math.sin((this.dTheta / 180) * Math.PI))

        this.earthXPos = canvasWidth / 2 + (this.orbitDistance * Math.cos((this.dTheta / 180) * Math.PI) - (this.planetSize / 2) * Math.cos((this.dTheta / 180) * Math.PI))
        this.earthYPos = canvasHeight / 2 + (this.orbitDistance * -Math.sin((this.dTheta / 180) * Math.PI) + (this.planetSize / 2 * -Math.sin((this.dTheta / 180) * Math.PI)))
        // this.draw()
    }
}

class DrawTwoPlanetRelativePosition {
    c: CanvasRenderingContext2D
    earth: Planet
    mars: Planet

    constructor(c: CanvasRenderingContext2D) {
        this.c = c
        this.earth = new Planet(c, props.innerPlanetOrbitDistance, props.innerPlanetSpeed, 48)
        this.mars = new Planet(c, props.outerPlanetOrbitDistance, props.outerPlanetSpeed, 48)
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
    console.log(`counter called`, counter)
    if (counter <= 1080) {
        requestId = requestAnimationFrame(() => animate(c));
        twoPlanets.update();
        // mars.update();
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
    // drawEarthLines(c);
    animate(c);
})

onBeforeUnmount(() => {
    cancelAnimationFrame(requestId)
})

</script>
<template>
    <canvas class="inline-block" style="background-color: black;" ref="canvasRef">

    </canvas>
</template>