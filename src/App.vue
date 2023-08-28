<script setup lang="ts">
import { onMounted } from "vue";
import lines from "./components/lines12.ts";

onMounted(() => {
  lines();
});
</script>

<template>
  <svg id="svg" width="2000" height="2000"></svg>
</template>

<style lang="scss" scoped></style>
