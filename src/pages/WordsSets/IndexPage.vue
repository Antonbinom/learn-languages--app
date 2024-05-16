<template lang="pug">
q-page.q-pt-md
  ResponsiveScrollArea(v-if="wordsSets" :height="scrollAreaHeight")
    q-slide-item(
      right-color="negative"
      @right="removeWordsSet(item.name)"
      v-for="(item) in wordsSets"
      :key="item.id")
      template(v-slot:right)
        .row.items-center
          .text-capitalize {{$t('delete')}}
          q-icon(name="delete")
      q-item.list-item(
        :style="{'border-bottom': '1px solid gray', 'cursor': 'pointer'}"
        )
        q-item-section(@click="$router.push(`/words/sets/${item.name}`)")
          q-item-label.list-item__name {{ item.name}}
  q-footer
    router-link(to="/words/sets/create")
      q-btn.absolute-bottom.full-width(
        square
        color="warning"
        :label="$t('add new words set')"
      )
.q-px-md.absolute-center.full-width.text-center(v-if="!wordsSets?.length")
  .text-h5.text-grey {{$t('There is nothing')}}
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ResponsiveScrollArea from 'components/ResponsiveScrollArea.vue';

import useAppEventBus from 'src/composables/useAppEventBus';
const { $on } = useAppEventBus();
import { useWordsSets } from 'src/composables/useWordsSets';

const { getAllWordsSets, removeWordsSet } = useWordsSets();

const scrollAreaHeight = ref();
const wordsSets = ref([]);
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
