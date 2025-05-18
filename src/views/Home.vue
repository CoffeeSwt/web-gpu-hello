<template>
  <div size-screen flex-center>
    <div class="hover-line" cursor-pointer text-2xl font-mono @click="navigateTo('/webgpu')">Web GPU Demo</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<style>
.hover-line {
  position: relative;
  display: inline-block;
}

.hover-line::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -3px;
  /* 调整线条距离文字的间距 */
  width: 0;
  height: 2px;
  /* 线条的高度 */
  background-color: currentColor;
  /* 使用文字颜色 */
  transition: width 0.3s ease-in-out;
  /* 动画效果 */
}

.hover-line:hover::after {
  width: 100%;
  /* 在 hover 时展开线条 */
}

.hover-line:not(:hover)::after {
  width: 0;
  /* 离开 hover 时收回线条 */
}
</style>
