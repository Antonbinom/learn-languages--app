<template lang="pug">
ResponsiveScrollArea(v-if="itemsRef?.value" :height="scrollAreaHeight")
  q-slide-item(
    v-for="(item, index) in itemsRef.value"
    @right="removeTerm(item.id, index)"
    @left="openEditTerm($event, item.term)"
    :key="item.id"
    right-color="negative"
    left-color="positive"
    )
    template(v-slot:right)
      .row.items-center
        .text-capitalize {{$t('delete')}}
        q-icon(name="delete")
    template(v-slot:left)
      .row.items-center
        .text-capitalize {{$t('edit')}}
        q-icon(name="edit")
    q-item.q-px-none.list-item(
      :style="{'border-bottom': (itemsRef?.value.length-1 !== index) ? '1px solid gray' : 'none'}"
      )
      q-expansion-item.list-item__accordion(
        dense
        style="width: 200%"
        :hide-expand-icon="!item.explanation"
        expand-icon-toggle
        expand-separator
        :caption="item.translation"
        :label="`${item.term}`"
        )
        q-card(v-if="item.explanation")
          q-card-section.item-description {{ item.explanation }}
q-footer
  q-btn.full-width(
    @click="drawersStore.setIsAddTermOpen(true)"
    square
    color="warning"
    :label="$t('add term')"
)
EditTermDialog(v-if="$route.query.term")
AddTermDialog
</template>

<script setup>
import { ref, toRefs, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useVocabulary } from 'src/composables/useVocabulary';
import { usePhrasalVerbs } from 'src/composables/usePhrasalVerbs';

//Components
import AddTermDialog from 'src/components/AddTermDialog.vue';
import EditTermDialog from 'src/components/EditTermDialog.vue';
import ResponsiveScrollArea from 'src/components/ResponsiveScrollArea.vue';
//Stores
import { useDrawersStore } from 'src/stores/drawersStore';
//
const drawersStore = useDrawersStore();

const route = useRoute();
const router = useRouter();
const { removeVocabularyTerm } = useVocabulary();
const { removePhrasalVerb } = usePhrasalVerbs();
const props = defineProps({
  items: Object,
});
const { items: itemsRef } = toRefs(props);

const removeTerm = async (id, index) => {
  itemsRef.value.value.splice(index, 1);
  if (route.path === '/words/vocabulary') {
    await removeVocabularyTerm(id);
  } else if (route.path === '/phrasal-verbs') {
    removePhrasalVerb(id);
  }
};

// const addToTraining = ({ reset }, item) => {
//   if (route.path === '/words/vocabulary') {
//     editVocabularyTerm(item.id, { ...item, training: !item.training });
//   } else if (route.path === '/phrasal-verbs') {
//     editPhrasalVerb(item.id, { ...item, training: !item.training });
//   }
//   reset();
// };

const openEditTerm = ({ reset }, term) => {
  drawersStore.setIsEditTermOpen(true);
  router.push({ query: { term: term.toLowerCase() } });
  reset();
};

const scrollAreaHeight = ref();

onMounted(() => {
  scrollAreaHeight.value =
    document.getElementsByClassName('q-page')[0]?.clientHeight - 140 + 'px';
});
</script>

<style lang="scss">
.list-item {
  cursor: pointer;
}
.list-item__accordion {
  & .q-item__label {
    font-size: 16px;
    font-weight: bold;
  }
  & .q-item__label--caption {
    font-size: 14px;
    font-weight: normal;
    color: $positive;
    // color: green;
  }
  & .item-description {
    color: rgba(0, 0, 0, 0.54);
    font-style: italic;
  }
}
</style>
