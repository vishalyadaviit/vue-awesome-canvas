<script lang="ts" setup>
import SpinningRings from '@/components/canvas/rings/SpinningRings.vue';

</script>

<template>
    <SpinningRings class="inline-block"></SpinningRings>
    <SpinningRings class="inline-block" :max-particles="80" :max-angular-velocity="1" :ring-radius-range="[120, 180]">
    </SpinningRings>
    <SpinningRings class="inline-block" :max-angular-velocity="4" :ring-radius-range="[70, 120]"></SpinningRings>
</template>