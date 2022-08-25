<template>
    <div>
        <h1>
            space
        </h1>
        <canvas id="space"></canvas>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import ThreeJs from "../plugins/ThreeJS";
onMounted(() => {
    new ThreeJs();
})
</script>

<style>
</style>