<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Point from "@/components/atoms/Point"
import Circle from '@/components/atoms/Circle';

const totalAnimations = 1200;
// const goldenRatio = (1 + Math.sqrt(5)) / 2;
const canvasRef = ref(null)
const canvasWidth = 500;
const canvasHeight = 500;
let c: CanvasRenderingContext2D
let requestId: number;
let counter: number = 0;
let point1: Point
let point2: Point

let circle1: Circle
let circle2: Circle



function animate(c: CanvasRenderingContext2D) {
    counter++;
    if (counter <= totalAnimations) {
        c.clearRect(0, 0, canvasWidth, canvasHeight)
        circle1 = new Circle(c, 250, 50, 50)
        circle1.draw();

        circle2 = new Circle(c, 50, 250, 50)
        circle2.draw();

        point1.rotate(50, 20);
        point2.rotate(50, 20, 15);

        const crossPoints = [];

        for (let i = 0; i < point1.allPoints.length; i++) {
            const newPoint = new Point(c, point1.allPoints[i].x, point2.allPoints[i].y, 1)
            crossPoints.push(newPoint);
        }

        for (let point of crossPoints) {
            point.draw()
        }


        requestId = requestAnimationFrame(() => animate(c));
    } else {
        console.log(point1.allPoints)
    }
}


onMounted(() => {
    const canvas: HTMLCanvasElement = canvasRef.value!
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    c = canvas.getContext('2d')!

    point1 = new Point(c, 250, 50, 2, true)
    point2 = new Point(c, 50, 250, 2, true)

    animate(c);
})

onBeforeUnmount(() => {
    cancelAnimationFrame(requestId)
})

</script>

<template>
    <div>
        <h1>Two Circle Path</h1>

        <canvas ref="canvasRef" style="background-color: black;"></canvas>
    </div>
</template>