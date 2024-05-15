<template lang="pug">
q-icon(
  @click="show = !show"
  v-if="!show"
  color="teal"
  name="help_outline"
  style="cursor: pointer"
)
.text-h6(v-if="show") {{ hint }}

</template>

<script setup>
import { ref } from 'vue';
import { watch } from 'vue';

const props = defineProps({
  hint: String,
});

const show = ref(false);

watch(
  () => props.hint,
  () => (show.value = false)
);
</script>
