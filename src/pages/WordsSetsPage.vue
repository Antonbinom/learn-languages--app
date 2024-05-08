<template lang="pug">
q-page
  .flex.justify-between.items-center.q-my-md
    .text-h5.text-bold.text-capitalize {{ $t(currentPageTitle) }}
    router-link(to="/words/sets/create")
      q-btn(
        square
        dense
        color="primary"
        icon="add"
      )
  q-scroll-area(v-if="wordsSets" :style="{height:  scrollAreaHeight}" :bar-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.1 }" :thumb-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.5 }")
    q-item.q-px-none(clickable v-for="(item) in wordsSets" :key="item.id" :style="{'border-bottom': '1px solid gray'}")
      q-item-section
        q-item-label.text-bold.text-h6 {{ item.name}}
</template>

<script setup>
import { ref, onMounted } from 'vue';

import useUtils from 'src/composables/useUtils';
import { useWordsSets } from 'src/composables/useWordsSets';
const { currentPageTitle } = useUtils();

const { getAllWordsSets } = useWordsSets();

const wordsSets = ref([{ name: 'Animals' }, { name: 'Flowers' }]);

const scrollAreaHeight = ref();

onMounted(async () => {
  wordsSets.value = await getAllWordsSets();
  scrollAreaHeight.value =
    document.getElementsByClassName('q-page')[0]?.clientHeight - 140 + 'px';
});
</script>
