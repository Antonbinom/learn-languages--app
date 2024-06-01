<template lang="pug">
q-page
  ResponsiveScrollArea(v-if="wordsCollections" :height="scrollAreaHeight")
    q-slide-item(
      right-color="negative"
      @right="removewordsCollection(item.name)"
      v-for="(item) in wordsCollections"
      :key="item.id")
      template(v-slot:right)
        .row.items-center
          .text-capitalize {{$t('delete')}}
          q-icon(name="delete")
      q-item.list-item(
        :style="{'border-bottom': '1px solid gray', 'cursor': 'pointer'}"
        )
        q-item-section(@click="$router.push(`/words/collections/${item.name}`)")
          q-item-label.list-item__name {{ item.name}}
  q-footer
    router-link(to="/words/collections/create")
      q-btn.absolute-bottom.full-width(
        square
        color="warning"
        :label="$t('add new words collection')"
      )
.q-px-md.absolute-center.full-width.text-center(v-if="!wordsCollections?.length")
  .text-h5.text-grey {{$t('There is nothing')}}
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ResponsiveScrollArea from 'components/ResponsiveScrollArea.vue';

import useAppEventBus from 'src/composables/useAppEventBus';
const { $on } = useAppEventBus();
import { useWordsCollections } from 'src/composables/useWordsCollections';

const { getAllwordsCollections, removewordsCollection } = useWordsCollections();

const scrollAreaHeight = ref();
const wordsCollections = ref([]);
$on('request-words-collections', async () => {
  wordsCollections.value = await getAllwordsCollections();
});

onMounted(async () => {
  wordsCollections.value = await getAllwordsCollections();
  scrollAreaHeight.value =
    document.getElementsByClassName('q-page')[0]?.clientHeight - 80 + 'px';
});
</script>

<style lang="scss" scoped>
.list-item__name {
  font-size: 18px;
}
</style>
