<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
const canvasRef = ref(null)
let particles: Array<Particle>
let requestId: any;
let c2d: CanvasRenderingContext2D;

const canvasWidth = 500
const canvasHeight = 500
const colorPallete = [
    '#ffbe0b',
    '#fb5607',
    '#ff006e',
    '#8338ec',
    '#3a86ff'
];
const mousePos = {
    x: canvasWidth / 2,
    y: canvasHeight / 2
}

const props = defineProps({
    ringRadiusRange: {
        type: Array<number>,
        default: () => [90, 120]
    },
    maxAngularVelocity: {
        type: Number,
        default: () => 3
    },
    maxParticles: {
        type: Number,
        default: () => 30
    }
})

function setMouseCoords(event: any) {
    const canvas: HTMLCanvasElement = canvasRef.value!
    mousePos.x = event.x - canvas.offsetLeft;
    mousePos.y = event.y - canvas.offsetTop;
    c2d.clearRect(0, 0, canvasWidth, canvasHeight)
}

window.addEventListener('mousemove', setMouseCoords)

class Particle {
    c: CanvasRenderingContext2D
    size: number
    ringRadius: number
    x: number
    y: number
    radian: number
    angularVelocity: number
    color: string

    constructor(c: CanvasRenderingContext2D, size: number, ringRadius: number, angularVelocity: number) {
        this.c = c;
        this.size = size;
        this.ringRadius = ringRadius
        this.x = mousePos.x + ringRadius
        this.y = mousePos.y / 2
        this.angularVelocity = angularVelocity
        this.radian = this.angularVelocity
        this.color = colorPallete[Math.floor(Math.random() * 5)]
    }

    draw(lastPoint: any) {
        this.c.beginPath()
        this.c.strokeStyle = this.color
        this.c.lineWidth = this.size
        this.c.moveTo(lastPoint.x, lastPoint.y)
        this.c.lineTo(this.x, this.y)
        this.c.stroke();
    }

    update() {
        const lastPoint = {
            x: this.x,
            y: this.y
        }
        this.radian = this.radian + this.angularVelocity
        this.x = mousePos.x + this.ringRadius * (Math.cos(this.radian * Math.PI / 180))
        this.y = mousePos.y + this.ringRadius * (Math.sin(this.radian * Math.PI / 180))
        this.draw(lastPoint)
    }
}

function animate(c: CanvasRenderingContext2D) {
    requestId = requestAnimationFrame(() => { animate(c) })
    c.fillStyle = 'rgba(0,0,0,0.05)'
    c.fillRect(0, 0, canvasWidth, canvasHeight)

    for (let particle of particles) {
        particle.update()
    }
}

function randomIntFromRange(r1: number, r2: number) {
    return Math.floor(Math.random() * (r2 - r1) + r1);
}

function creatParticles(c: CanvasRenderingContext2D) {
    const result = []
    for (let i = 0; i < props.maxParticles; i++) {
        const size = randomIntFromRange(3, 6);
        const { ringRadiusRange } = props;
        const ringRadius = randomIntFromRange(ringRadiusRange[0], ringRadiusRange[1]);
        const angularVelocity = Math.random() * props.maxAngularVelocity;
        result.push(new Particle(c, size, ringRadius, angularVelocity))
    }
    return result;
}


onMounted(() => {
    const canvas: HTMLCanvasElement = canvasRef.value!
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    c2d = canvas.getContext('2d')!
    particles = creatParticles(c2d);
    animate(c2d)
})

onBeforeUnmount(() => {
    cancelAnimationFrame(requestId)
    window.removeEventListener('mousemove', setMouseCoords)
})

</script>

<template>
    <canvas ref="canvasRef" style="background-color: black;"></canvas>
</template>