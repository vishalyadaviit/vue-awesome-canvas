<script setup lang="ts">
import BarChartCanvas from '@/components/canvas/charts/BarChartCanvas.vue';
import PieChartCanvas from '@/components/canvas/charts/PieChartCanvas.vue';
</script>

<template>
    <div>
        <h1>Charts</h1>
        <div class="flex flex-wrap gap-3">
            <BarChartCanvas></BarChartCanvas>
            <PieChartCanvas></PieChartCanvas>
        </div>
    </div>
</template>