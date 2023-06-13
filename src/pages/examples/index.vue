<script setup lang="ts">

const exampleNavs = [
    {
        name: 'Base Shapes',
        to: '/examples/base-shapes'
    },
    {
        name: 'Charts',
        to: '/examples/charts'
    },
    {
        name: 'Bouncing Balls',
        to: '/examples/bouncing-balls'
    },
    {
        name: 'Gravity',
        to: '/examples/gravity'
    },
    {
        name: 'Earth Mars',
        to: '/examples/earth-mars'
    },
]

</script>

<template>
    <div class="container mx-auto">
        <div class="flex flex-col gap-4 my-4">
            <h1 class="text-3xl font-medium">Canvas Examples</h1>
            <ul class="flex gap-2">
                <li class="flex" v-for="(nav, index) in exampleNavs" :key="'example-nav-' + index">
                    <router-link :to="nav.to"
                        class="text-slate-800 hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-medium"
                        active-class="bg-gray-900 text-white hover:bg-gray-950">{{ nav.name }}</router-link>
                </li>
            </ul>
        </div>
        <router-view></router-view>
    </div>
</template>