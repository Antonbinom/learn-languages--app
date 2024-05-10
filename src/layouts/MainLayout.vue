<template lang="pug">
q-layout(view="lHh Lpr lFf")
  HeaderComponent
  SettingsComponent
  q-page-container
    router-view
  FooterComponent
</template>

<script setup lang="ts">
import HeaderComponent from 'src/components/HeaderComponent.vue';
import FooterComponent from 'src/components/FooterComponent.vue';
import SettingsComponent from 'src/components/SettingsComponent.vue';

defineOptions({
  name: 'MainLayout',
});
</script>
