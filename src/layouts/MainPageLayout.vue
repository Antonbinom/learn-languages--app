<template lang="pug">
q-layout(view="lHh Lpr lFf")
  HeaderComponent
  LanguagesMenu
  SettingsComponent
  q-page-container.q-px-md
    router-view
</template>

<script setup lang="ts">
import HeaderComponent from 'src/components/HeaderComponent.vue';

import LanguagesMenu from 'src/components/LanguagesMenu.vue';
import SettingsComponent from 'src/components/SettingsComponent.vue';

defineOptions({
  name: 'SecondaryLayout',
});
</script>
