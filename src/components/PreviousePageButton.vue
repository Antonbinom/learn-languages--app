<template lang="pug">
q-btn(dense flat @click="toPreviousePage" icon="arrow_back" :label="$t('back')")
q-space
</template>

<script setup>
import useUtils from 'src/composables/useUtils';

const { toPreviousePage } = useUtils();
</script>
