<template lang="pug">
q-scroll-area.q-py-md(
  :style="{height}"
  :bar-style="{right: '0px', background: 'blue', width: '2px', opacity: 0.1 }"
  :thumb-style="{right: '0px', background: 'blue', width: '2px', opacity: 0.5 }")
  slot
</template>

<script setup>
defineProps({
  height: String,
});
</script>
