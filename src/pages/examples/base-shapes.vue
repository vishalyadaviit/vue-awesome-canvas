<script setup lang="ts">
import RectCanvas from '@/components/canvas/base-shapes/RectCanvas.vue';
import DrawingCanvas from '@/components/canvas/base-shapes/DrawingCanvas.vue';

</script>

<template>
    <div class="flex flex-col gap-4">
        <h1 class="text-xl text-gray-600 my-3">Base Shapes</h1>
        <RectCanvas></RectCanvas>
        <DrawingCanvas></DrawingCanvas>
    </div>
</template>