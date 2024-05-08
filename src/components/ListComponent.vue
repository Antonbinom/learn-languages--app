<template lang="pug">
.flex.justify-between.items-center.q-my-md
  .text-h6.text-capitalize {{ $t(currentPageTitle) }}
  q-btn(
    @click="drawersStore.setIsAddTermOpen(true)"
    square
    dense
    color="primary"
    icon="add"
  )
q-scroll-area(v-if="itemsRef?.value" :style="{height:  scrollAreaHeight}" :bar-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.1 }" :thumb-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.5 }")
  q-item.q-px-none(v-for="(item, index) in itemsRef.value" :key="item.id")
    q-item-section
      q-item-label {{ item.term }} - {{ item.translation }}
      q-item-label(caption) {{ item?.explanation }}
    q-item-section(side top)
      q-btn(flat dense round color="blue-grey" icon="more_vert")
      q-menu(auto-close anchor="center middle" self="bottom right")
        q-list(style="min-width: 100px")
          q-item(clickable v-close-popup @click="removeTerm(item.id, index)")
            q-item-section Delete
          q-item(clickable v-close-popup @click="openEditTerm(item.term)")
            q-item-section Edit
          q-item(v-if="!item.training" clickable v-close-popup @click="addToTraining(item, index)")
            q-item-section Add to training
EditTermDialog(v-if="$route.query.term")
AddTermDialog

</template>

<script setup>
import { ref, toRefs, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useUtils from 'src/composables/useUtils';
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
const { currentPageTitle } = useUtils();

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
