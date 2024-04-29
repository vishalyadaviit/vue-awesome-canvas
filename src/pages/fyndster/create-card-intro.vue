<template>
    <div>
        <h1 class="text-3xl">Create Card Intro</h1>
        <canvas ref="createCardCanvas" style="background-color: black;"></canvas>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "CreateCardIntro",
    data() {
        return {
            context2d: null as CanvasRenderingContext2D | null
        }
    },
    methods: {
        draw() {
            const { context2d } = this
            if (context2d) {
                context2d.fillStyle = "red"
                context2d.fillRect(0, 0, 100, 100)
            }
        }
    },
    mounted() {
        const createCardCanvas = this.$refs.createCardCanvas as HTMLCanvasElement
        createCardCanvas.width = 500
        createCardCanvas.height = 500
        this.$data.context2d = createCardCanvas.getContext("2d")
        this.draw()
    }
})
</script>
