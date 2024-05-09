<template lang="pug">
q-page
  .flex.justify-between.items-center.q-py-md
    .text-h5.text-bold.text-capitalize {{ $t(currentPageTitle) }}
    router-link(to="/words/sets/create")
      q-btn(
        square
        dense
        color="primary"
        icon="add"
      )
  q-scroll-area(v-if="wordsSets" :style="{height:  scrollAreaHeight}" :bar-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.1 }" :thumb-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.5 }")
    q-item.q-px-none(
      v-for="(item) in wordsSets"
      :key="item.id"
      :style="{'border-bottom': '1px solid gray'}"
      )
      q-item-section(@click="$router.push(`/words/sets/${item.name}`)")
        q-item-label.text-bold.text-h6 {{ item.name}}
      q-item-section(side top)
        q-btn(flat dense round color="blue-grey" icon="more_vert")
        q-menu(auto-close anchor="center middle" self="bottom right")
          q-list(style="min-width: 100px")
            q-item(clickable v-close-popup @click="removeWordsSet(item.name)")
              q-item-section {{$t('delete')}}
            q-item(clickable v-close-popup @click="$router.push(`/words/sets/edit/${item.name}`)")
              q-item-section {{$t('edit')}}
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useAppEventBus from 'src/composables/useAppEventBus';
const { $on } = useAppEventBus();
import useUtils from 'src/composables/useUtils';
import { useWordsSets } from 'src/composables/useWordsSets';
const { currentPageTitle } = useUtils();

const { getAllWordsSets, removeWordsSet } = useWordsSets();

const wordsSets = ref([{ name: 'Animals' }, { name: 'Flowers' }]);

const scrollAreaHeight = ref();

$on('request-words-sets', async () => {
  wordsSets.value = await getAllWordsSets();
});
onMounted(async () => {
  wordsSets.value = await getAllWordsSets();
  scrollAreaHeight.value =
    document.getElementsByClassName('q-page')[0]?.clientHeight - 140 + 'px';
});
</script>
