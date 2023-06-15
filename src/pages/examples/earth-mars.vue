<script lang="ts" setup>
import DrawTwoPlanet from '@/components/canvas/outer-space/DrawTwoPlanetRelativePosition.vue';

</script>
<template>
    <DrawTwoPlanet :inner-planet-speed="9" :inner-planet-orbit-distance="75" :outer-planet-speed="0.5"></DrawTwoPlanet>
    <DrawTwoPlanet :inner-planet-speed="0.5" :inner-planet-orbit-distance="50" :outer-planet-speed="9"></DrawTwoPlanet>

    <DrawTwoPlanet :inner-planet-speed="12" :inner-planet-orbit-distance="200" :outer-planet-speed="0.5"
        :outer-planet-orbit-distance="240">
    </DrawTwoPlanet>
    <DrawTwoPlanet :inner-planet-speed="1" :inner-planet-orbit-distance="150" :outer-planet-speed="10"
        :outer-planet-orbit-distance="240"></DrawTwoPlanet>

    <DrawTwoPlanet :inner-planet-speed="1" :inner-planet-orbit-distance="75" :outer-planet-speed="5"
        :outer-planet-orbit-distance="240"></DrawTwoPlanet>
</template>