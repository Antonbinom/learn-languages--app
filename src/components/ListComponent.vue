<template lang="pug">
ResponsiveScrollArea(v-if="itemsRef?.value" :height="scrollAreaHeight")
  q-slide-item(
    v-for="(item, index) in itemsRef.value"
    @right="removeTerm(item.id, index)"
    @left="openEditTerm($event, item)"
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
        )
        //- :caption="item.translation"
        //- :label="item.term"
        //- icon="directions_run"
        template(v-slot:header)
          q-item-section.q-pr-none(avatar)
            q-icon(:color="item.training ? 'positive' : 'grey'" name="directions_run")

          q-item-section
            span.text-bold {{item.term }}
            span {{item.translation }}

        q-card(v-if="item.explanation")
          q-card-section.item-description {{ item.explanation }}
    q-menu(touch-position)
      q-list
        q-item(clickable v-close-popup @click="toggleTraining(item)")
          q-item-section.text-capitalize {{ $t(item.training ?  'remove from training' : 'add to training') }}
q-footer
  q-btn.full-width(
    @click="drawersStore.setIsAddTermOpen(true)"
    square
    color="warning"
    :label="$t('add new')"
)
EditTermDialog(v-if="$route.query.term")
AddTermDialog
</template>

<script setup>
import { ref, toRefs, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
//Components
import AddTermDialog from 'src/components/AddTermDialog.vue';
import EditTermDialog from 'src/components/EditTermDialog.vue';
import ResponsiveScrollArea from 'src/components/ResponsiveScrollArea.vue';
//Stores
import { useDrawersStore } from 'src/stores/drawersStore';
import { useTermsStore } from 'src/stores/termsStore';
//
const drawersStore = useDrawersStore();
const termsStore = useTermsStore();

// Composables
import { useVocabulary } from 'src/composables/useVocabulary';
import { usePhrasalVerbs } from 'src/composables/usePhrasalVerbs';
import { useIrregularVerbs } from 'src/composables/useIrregularVerbs';
import { useSentences } from 'src/composables/useSentences';
//
const { removeWord, editWord } = useVocabulary();
const { removePhrasalVerb, editPhrasalVerb } = usePhrasalVerbs();
const { removeIrregularVerb, editIrregularVerb } = useIrregularVerbs();
const { removeSentence, editSentence } = useSentences();

const route = useRoute();
const router = useRouter();

const props = defineProps({
  items: Object,
});
const { items: itemsRef } = toRefs(props);

const removeTerm = async (id, index) => {
  itemsRef.value.value.splice(index, 1);

  const routeActions = {
    '/words/vocabulary': removeWord,
    '/phrasal-verbs': removePhrasalVerb,
    '/irregular-verbs': removeIrregularVerb,
    '/sentences': removeSentence,
  };

  const removeAction = routeActions[route.path];
  if (removeAction) removeAction(id);
};

const toggleTraining = async (item) => {
  const data = {
    ...item,
    training: !item.training,
  };
  const routeActions = {
    '/words/vocabulary': editWord,
    '/phrasal-verbs': editPhrasalVerb,
    '/irregular-verbs': editIrregularVerb,
    '/sentences': editSentence,
  };

  const editAction = routeActions[route.path];
  if (!editAction) return;

  await editAction(item.id, data);
  item.training = !item.training;
};

const openEditTerm = ({ reset }, { id, term }) => {
  drawersStore.setIsEditTermOpen(true);
  router.push({ query: { term: term.toLowerCase().split(', ').join('-') } });
  reset();
  termsStore.setCurrentTermId(id);
};

const scrollAreaHeight = ref();

onMounted(() => {
  router.push({ query: {} });

  scrollAreaHeight.value =
    document.getElementsByClassName('q-page')[0]?.clientHeight - 60 + 'px';
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
  }
  & .item-description {
    color: rgba(0, 0, 0, 0.54);
    font-style: italic;
  }
}
</style>
