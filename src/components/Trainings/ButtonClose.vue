<template lang="pug">
q-btn(
  round
  outline
  dense
  color="teal"
  label="x"
  @click="toPreviousePage"
  class="absolute-top-left q-ma-md"
  )
</template>

<script setup>
import useUtils from 'src/composables/useUtils';
const { toPreviousePage } = useUtils();
</script>
