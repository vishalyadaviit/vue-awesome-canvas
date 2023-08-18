<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref(null);
const canvasWidth = 1000;
const canvasHeight = 600;
let balls: Array<Ball>;
let requestId: number
const defaultDy = 2;
const gravity = 1;
const friction = 0.95;

const colorPallete = [
    '#ffbe0b',
    '#fb5607',
    '#ff006e',
    '#8338ec',
    '#3a86ff'
];

function randomIntFromRange(r1: number, r2: number) {
    return Math.floor(Math.random() * (r2 - r1) + r1);
}

class Ball {
    c: CanvasRenderingContext2D
    x: number
    y: number
    dx: number
    dy: number
    radius: number
    color: string

    constructor(c: CanvasRenderingContext2D, x: number, y: number, dx: number, dy: number, radius: number) {
        this.c = c
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius
        this.color = colorPallete[Math.floor(Math.random() * 5)]
    }

    draw() {
        this.c.beginPath()
        this.c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        this.c.fillStyle = this.color;
        this.c.lineWidth = 2;
        this.c.fill()
    }

    update() {
        if (this.y + this.radius + this.dy > canvasHeight) {
            this.dy = -this.dy * friction
        } else {
            this.dy += gravity;
        }
        this.y += this.dy
        this.draw()
    }
}

function createBall(c: CanvasRenderingContext2D) {
    const balls = [];

    for (let i = 0; i < 100; i++) {
        const radius = randomIntFromRange(5, 30);
        const x = randomIntFromRange(radius, canvasWidth - radius);
        const y = randomIntFromRange(radius, canvasHeight - radius);
        const dy = defaultDy;
        balls.push(new Ball(c, x, y, 0, dy, radius))
    }

    return balls;
}


function animate(c: CanvasRenderingContext2D) {
    c.clearRect(0, 0, canvasWidth, canvasHeight)
    requestId = requestAnimationFrame(() => animate(c))

    for (let ball of balls) {
        ball.update()
    }
}


onMounted(() => {
    const canvas: HTMLCanvasElement = canvasRef.value!
    const c: CanvasRenderingContext2D = canvas.getContext('2d')!;
    balls = createBall(c);
    animate(c)
})

onBeforeUnmount(() => {
    cancelAnimationFrame(requestId)
    // window.removeEventListener('mousemove', setMouseCoords)
})

</script>

<template>
    <canvas style="background-color: black;" :width="canvasWidth" :height="canvasHeight" ref="canvasRef"></canvas>
</template>
