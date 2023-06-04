<script setup lang="ts">
</script>

<template>
    <div class="container mx-auto">
        <div class="flex flex-col gap-4">
            <h1 class="text-3xl font-medium">Canvas Examples</h1>
            <div class="flex gap-2">
                <router-link to="/examples/base-shapes"
                    class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">Base
                    Shapes</router-link>
                <router-link to="/examples/charts"
                    class="text-slate-800 hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-medium">Charts</router-link>
                <router-link to="/examples/bouncing-balls"
                    class="text-slate-800 hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-medium">Bouncing
                    Balls</router-link>
            </div>

        </div>
        <router-view></router-view>
    </div>
</template>