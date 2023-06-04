<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref(null)
const canvasWidth = 1000;
const canvasHeight = 400;
let circlesArray: Array<any> = []
let requestId: number;
const bubbleOffset = 50;
const maxRadius = 50;

// const colorPallete = [
//     '#8ecae6',
//     '#219ebc',
//     '#023047',
//     '#ffb703',
//     '#fb8500'
// ];

const colorPallete = [
    '#ffbe0b',
    '#fb5607',
    '#ff006e',
    '#8338ec',
    '#3a86ff'
];

const relativeMouseReference = {
    x: 0,
    y: 0
};

function setMouseCoords(event: any) {
    const canvas: HTMLCanvasElement = canvasRef.value!
    console.log(canvas.offsetLeft)
    console.log(canvas.offsetTop)

    relativeMouseReference.x = event.x - (canvas?.offsetLeft || 0);
    relativeMouseReference.y = event.y - (canvas?.offsetTop || 0);
}

window.addEventListener('mousemove', setMouseCoords)

class Circle {
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

    draw() {
        // console.log(`draw calkkled`)
        this.c.beginPath()
        this.c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.c.strokeStyle = this.color;
        this.c.lineWidth = 2;
        this.c.stroke();
        // this.c.fillStyle = 'purple'
        // this.c.fill()
    }

    update() {
        if (this.x + this.radius >= canvasWidth || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius >= canvasHeight || this.y - this.radius <= 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        // console.log(`relativeMouseReference`)
        // console.log(relativeMouseReference)

        if (relativeMouseReference.x > 0 && relativeMouseReference.y > 0) {
            if (this.x < relativeMouseReference.x + bubbleOffset && this.x > relativeMouseReference.x - bubbleOffset &&
                this.y < relativeMouseReference.y + bubbleOffset && this.y > relativeMouseReference.y - bubbleOffset) {

                // if (relativeMouseReference.x - this.x < bubbleOffset && relativeMouseReference.x - this.x > -bubbleOffset
                //     && relativeMouseReference.y - this.y < bubbleOffset && relativeMouseReference.y - this.y > -bubbleOffset
                // ) {
                if (this.radius < maxRadius) {
                    this.radius += 1
                }
            } else if (this.radius > this.minRadius) {
                this.radius -= 1
            }
        }


        this.draw();
    }
}


function animate(c: CanvasRenderingContext2D) {
    requestId = requestAnimationFrame(() => animate(c));
    c.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let circle of circlesArray) {
        circle.update()
    }
}



function makeCircles(c: CanvasRenderingContext2D) {
    const circles = []
    for (let i = 0; i < 200; i++) {
        const radius = Math.random() * 3 + 2;
        const xCord = Math.random() * (canvasWidth - 2 * radius) + radius;
        const yCord = Math.random() * (canvasHeight - 2 * radius) + radius;
        const dx = Math.random() * 1;
        const dy = Math.random() * 1;
        circles.push(new Circle(c, xCord, yCord, dx, dy, radius))
    }
    return circles
}

onMounted(() => {
    const canvas: HTMLCanvasElement = canvasRef.value!
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const c: CanvasRenderingContext2D = canvas.getContext('2d')!
    // c.fillStyle = "red"
    // c.fillRect(100, 100, 100, 100)
    circlesArray = makeCircles(c)
    animate(c)
})

onBeforeUnmount(() => {
    cancelAnimationFrame(requestId)
    window.removeEventListener('mousemove', setMouseCoords)
})

</script>

<template>
    <canvas style="background-color: black;" ref="canvasRef"></canvas>
</template>
