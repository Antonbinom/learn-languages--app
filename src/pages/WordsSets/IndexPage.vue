<template lang="pug">
q-page.q-pt-md
  q-scroll-area(
    v-if="wordsSets"
    :style="{height:  scrollAreaHeight}"
    :bar-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.1 }"
    :thumb-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.5 }"
    )
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
      q-btn.absolute-bottom(
        square
        color="warning"
        :label="$t('add new words set')"
        style={width: "100%"}
      )
</template>

<script setup>
import { ref, onMounted } from 'vue';
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
