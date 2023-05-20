<script lang="ts" setup>
import { ref, onMounted } from 'vue';
const canvasRef = ref(null)
const canvasRef2 = ref(null)
const canvasRef3 = ref(null)
const canvasRef4 = ref(null)

function drawOverlayBox() {
  const canvas: HTMLCanvasElement = canvasRef.value!
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

  ctx.fillStyle = "rgba(200,0,0,1)";
  ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2);

  ctx.fillStyle = "rgba(0,0,200,0.5)";
  ctx.fillRect(50, 50, canvas.width / 2, canvas.height / 2)

  ctx.fillStyle = "rgba(0,200,0,0.5)";
  ctx.fillRect(100, 100, canvas.width / 2, canvas.height / 2)

  ctx.fillStyle = "rgba(0,200,200,0.5)";
  ctx.fillRect(-50, 100, canvas.width / 2, canvas.height / 2)

  ctx.fillStyle = "rgba(0,50,50,0.8)";
  ctx.beginPath();
  ctx.arc(100, 100, 50, 0, 2 * Math.PI)
  ctx.fill()
}

function drawRectBox() {
  const canvas: HTMLCanvasElement = canvasRef2.value!
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

  ctx.fillStyle = "rgba(240, 240, 240, 1)"
  ctx.fillRect(0, 0, canvas.width, canvas.height)


  // ctx.fillStyle = "rgba(200, 200, 0, 0.5)"
  ctx.clearRect(50, 50, canvas.width / 2, canvas.height / 2)

  ctx.lineWidth = 4;
  ctx.strokeRect(60, 60, 80, 80);
}

function createArrow() {
  const canvas: HTMLCanvasElement = canvasRef3.value!
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

  ctx.fillStyle = "rgba(240, 240, 240, 1)"
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(200,50,250,0.5)";
  ctx.arc(100, 100, 50, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = "rgba(0,50,250,1)";
  // ctx.strokeStyle = "rgba(0,0,0,1)"
  ctx.beginPath();
  ctx.moveTo(100, 0)
  ctx.lineTo(100, 200);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 100)
  ctx.lineTo(200, 100);
  ctx.stroke();

  ctx.fillStyle = "rgba(0,50,250,1)";
  ctx.beginPath();
  ctx.moveTo(60, 100);
  ctx.lineTo(125, 140);
  ctx.lineTo(125, 60);
  ctx.closePath();

  ctx.fill()
}



function createSmiley() {
  const canvas: HTMLCanvasElement = canvasRef3.value!
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

  ctx.fillStyle = "rgba(240, 240, 240, 1)"
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.lineWidth = 3;
  // ctx.moveTo(100, 100)
  ctx.arc(100, 100, 75, 0, 2 * Math.PI)

  ctx.moveTo(150, 100)
  ctx.arc(100, 100, 50, 0, 1 * Math.PI)

  ctx.moveTo(85, 75)
  ctx.arc(75, 75, 10, 0, 2 * Math.PI)


  ctx.moveTo(135, 75)
  ctx.arc(125, 75, 10, 0, 2 * Math.PI)
  // ctx.moveTo()
  ctx.stroke()
}

onMounted(() => {
  drawOverlayBox();
  drawRectBox();
  createArrow();
  createSmiley();
})

</script>

<template>
  <div class="flex gap-3 flex-wrap">
    <canvas ref="canvasRef" height="200" width="200"></canvas>
    <canvas ref="canvasRef2" height="200" width="200"></canvas>
    <canvas ref="canvasRef3" height="200" width="200"></canvas>
    <canvas ref="canvasRef4" height="200" width="200"></canvas>
  </div>
</template>