<script lang="ts" setup>
import { ref, onMounted } from 'vue';
const canvasRef = ref(null)
const canvasRef2 = ref(null)
const canvasRef3 = ref(null)


function drawBox() {
  const canvas: HTMLCanvasElement = canvasRef.value!
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawTriangleShape() {
  const canvas: HTMLCanvasElement = canvasRef.value!
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

  ctx.fillStyle = "#eaeaea";
  ctx.beginPath();
  ctx.moveTo(50, 20);
  ctx.lineTo(200, 50);
  ctx.lineTo(250, 180);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawBezierShape() {
  const canvas: HTMLCanvasElement = canvasRef2.value!
  const c: CanvasRenderingContext2D = canvas.getContext("2d")!;
  c.fillStyle = "#eaeaea";
  c.beginPath();
  c.moveTo(10, 30);
  c.bezierCurveTo(50, 90, 160, -30, 200, 30);
  c.lineTo(200, 90);
  c.lineTo(40, 90);
  c.closePath();
  c.fill();
  c.lineWidth = 4;
  c.strokeStyle = "black";
  c.stroke();
}

function drawGradientShape() {
  const canvas: HTMLCanvasElement = canvasRef3.value!
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

  const gradient = ctx.createLinearGradient(0, 0, 200, 50);
  gradient.addColorStop(0, "black");
  gradient.addColorStop(0.5, "pink");
  gradient.addColorStop(1, "blue");
  ctx.fillStyle = gradient;

  ctx.fillRect(0, 0, 250, 250);
}



onMounted(() => {
  drawBox();
  drawTriangleShape();
  drawBezierShape();
  drawGradientShape();
})

</script>

<template>
  <div class="flex gap-3 flex-wrap">
    <canvas ref="canvasRef" height="250" width="250"></canvas>
    <canvas ref="canvasRef2" height="250" width="250"></canvas>
    <canvas ref="canvasRef3" height="250" width="250"></canvas>
    <!-- <canvas ref="canvasRef4" height="250" width="250"></canvas> -->

  </div>
</template>