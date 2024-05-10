<template lang="pug">
q-page.q-pt-md
  q-scroll-area(
    v-if="wordsSets"
    :style="{height:  scrollAreaHeight}"
    :bar-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.1 }"
    :thumb-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.5 }"
    )
    q-item.list-item(
      v-for="(item) in wordsSets"
      :key="item.id"
      :style="{'border-bottom': '1px solid gray', 'cursor': 'pointer'}"
      )
      q-item-section(@click="$router.push(`/words/sets/${item.name}`)")
        q-item-label.list-item__name {{ item.name}}
      q-item-section(side top)
        q-icon(  color="blue-grey" name="more_vert")
        q-menu(auto-close anchor="center middle" self="bottom right")
          q-list(style="min-width: 100px")
            q-item(clickable v-close-popup @click="removeWordsSet(item.name)")
              q-item-section.text-capitalize {{ $t('delete') }}
            q-item(clickable v-close-popup @click="$router.push(`/words/sets/edit/${item.name}`)")
              q-item-section.text-capitalize {{ $t('edit') }}
  q-footer
    router-link(to="/words/sets/create")
      q-btn.absolute-bottom(
        square
        color="warning"
        label="add new words set"
        style={width: "100%"}
      )
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useAppEventBus from 'src/composables/useAppEventBus';
const { $on } = useAppEventBus();
import { useWordsSets } from 'src/composables/useWordsSets';

const { getAllWordsSets, removeWordsSet } = useWordsSets();

const wordsSets = ref([{ name: 'Animals' }, { name: 'Flowers' }]);

const scrollAreaHeight = ref();

$on('request-words-sets', async () => {
  wordsSets.value = await getAllWordsSets();
});
onMounted(async () => {
  wordsSets.value = await getAllWordsSets();
  scrollAreaHeight.value =
    document.getElementsByClassName('q-page')[0]?.clientHeight - 80 + 'px';
});
</script>

<style lang="scss" scoped>
.list-item__name {
  font-size: 18px;
}
</style>
