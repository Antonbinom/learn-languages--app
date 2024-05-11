<template lang="pug">
q-btn(
  color="dark"
  dense
  round
  flat
  @click="toPreviousePage"
  icon="arrow_back"
)
</template>

<script setup>
import useUtils from 'src/composables/useUtils';

const { toPreviousePage } = useUtils();
</script>
