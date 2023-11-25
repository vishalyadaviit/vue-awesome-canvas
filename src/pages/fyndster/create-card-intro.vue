<template>
    <div>
        <h1 class="text-3xl">Create Card Intro</h1>
        <canvas ref="createCardCanvas" style="background-color: black;"></canvas>
    </div>
</template>

<script lang="ts" >
import { defineComponent } from 'vue'
export default defineComponent({
    name: "CreateCardIntro",
    data() {
        return {
            context2d: ""
        }
    },
    methods: {
        draw() {
            console.log(`this.$data`)
            console.log(this.context2d)
            const { context2d } = this
            context2d.fillStyle = "red"
            context2d.fillRect(0, 0, 100, 100)
        }
    },
    mounted() {
        const { createCardCanvas } = this.$refs
        createCardCanvas.width = 500
        createCardCanvas.height = 500
        this.$data.context2d = createCardCanvas.getContext("2d")
        this.draw()
    }
})
</script>
