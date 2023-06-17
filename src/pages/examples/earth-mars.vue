<script lang="ts" setup>
import DrawTwoPlanet from '@/components/canvas/outer-space/DrawTwoPlanetRelativePosition.vue';

</script>
<template>
    <DrawTwoPlanet :inner-planet-speed="1.35" :inner-planet-orbit-distance="250" :outer-planet-speed="3.5"
        :outer-planet-orbit-distance="330"></DrawTwoPlanet>

    <DrawTwoPlanet :inner-planet-speed="9" :inner-planet-orbit-distance="115" :outer-planet-orbit-distance="330"
        :outer-planet-speed="0.5"></DrawTwoPlanet>
    <DrawTwoPlanet :inner-planet-speed="1.7" :inner-planet-orbit-distance="180" :outer-planet-speed="9"
        :outer-planet-orbit-distance="330"></DrawTwoPlanet>
    <DrawTwoPlanet :inner-planet-speed="11" :inner-planet-orbit-distance="200" :outer-planet-speed="0.5"
        :outer-planet-orbit-distance="330">
    </DrawTwoPlanet>
    <DrawTwoPlanet :inner-planet-speed="1.35" :inner-planet-orbit-distance="100" :outer-planet-speed="5"
        :outer-planet-orbit-distance="330"></DrawTwoPlanet>
</template>