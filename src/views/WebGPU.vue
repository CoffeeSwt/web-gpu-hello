<template>
    <div ref="renderTarget" overflow-hidden size-screen></div>
</template>

<script setup lang="ts">
import * as THREE from "three";
import Engine from '@/assets/ts/Engine';
import { onMounted, ref } from 'vue'
//@ts-ignore
import vertexShader from '@/assets/shader/vertexShader.glsl';
//@ts-ignore
import fragmentShader from '@/assets/shader/fragmentShader.glsl';
const renderTarget = ref<HTMLElement | null>(null)
onMounted(async () => {
    const engine = new Engine(renderTarget.value!)
    engine.start()
    var geometry = new THREE.PlaneGeometry(2, 2);
    var uniforms = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new THREE.Vector2() }
    };
    const mat = new THREE.ShaderMaterial(
        { uniforms, vertexShader, fragmentShader }
    )
    const material = new THREE.MeshBasicMaterial({ color: "#00dd00" })
    const plane = new THREE.Mesh(geometry, mat)
    engine.addObj(plane)
    engine.setCameraPosition(new THREE.Vector3(10, 10, 10))
    engine.setCameraLookAt(new THREE.Vector3(0, 0, 0))

})

</script>

<style scoped></style>
