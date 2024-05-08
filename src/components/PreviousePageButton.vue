<template lang="pug">
q-btn(dense flat @click="back()" icon="arrow_back" :label="$t('back')")
q-space
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();

const back = () => {
  if (route.path.split('/').length === 2) router.push('/');
  else router.back();
};
</script>
