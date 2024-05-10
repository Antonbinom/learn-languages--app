<template lang="pug">
q-scroll-area.q-mt-md(
  v-if="itemsRef?.value"
  :style="{height:  scrollAreaHeight}"
  :bar-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.1 }"
  :thumb-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.5 }")
  q-item.q-px-none.list-item(
    v-close-popup
    v-for="(item, index) in itemsRef.value"
    :key="item.id"
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

    q-menu(
      auto-close
      anchor="center middle"
      self="center middle"
      )
      q-list(style="min-width: 100px")
        q-item(clickable v-close-popup @click="removeTerm(item.id, index)")
          q-item-section.text-capitalize {{ $t('delete') }}
        q-item(clickable v-close-popup @click="openEditTerm(item.term)")
          q-item-section.text-capitalize {{ $t('edit') }}
        q-item(v-if="!item.training" clickable v-close-popup @click="addToTraining(item, index)")
          q-item-section.text-capitalize {{ $t('add to training') }}
q-footer
  q-btn(
    style={width: "100%"}
    @click="drawersStore.setIsAddTermOpen(true)"
    square
    color="warning"
    label="add term"
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
//Stores
import { useDrawersStore } from 'src/stores/drawersStore';
//
const drawersStore = useDrawersStore();

const route = useRoute();
const router = useRouter();
const { removeVocabularyTerm, editVocabularyTerm } = useVocabulary();
const { removePhrasalVerb, editPhrasalVerb } = usePhrasalVerbs();
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

const addToTraining = (item) => {
  if (route.path === '/words/vocabulary') {
    editVocabularyTerm(item.id, { ...item, training: !item.training });
  } else if (route.path === '/phrasal-verbs') {
    editPhrasalVerb(item.id, { ...item, training: !item.training });
  }
};

const openEditTerm = (term) => {
  drawersStore.setIsEditTermOpen(true);
  router.push({ query: { term: term.toLowerCase() } });
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
