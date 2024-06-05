<template lang="pug">
q-checkbox.q-px-md.q-pt-md(
  v-model="training"
  @update:model-value="fetchFilteredData(0, training)"
  label="training"
  color="teal"
  dense)
ResponsiveScrollArea(v-if="itemsRef?.value" :height="scrollAreaHeight")
  q-slide-item(
    v-for="(item, index) in itemsRef.value"
    @right="removeTerm(item.id, index)"
    @left="openEditTerm($event, item)"
    :key="item.id"
    right-color="negative"
    left-color="positive"
    v-intersection="itemsRef?.value.length >= 15 && onIntersection"
    :data-index="index"
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
q-spinner-dots.q-mb-md.absolute-bottom.full-width(color="warning" size="1em" v-if="preloader")
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
import { watch } from 'vue';
//
const { removeWord, editWord } = useVocabulary();
const { removePhrasalVerb, editPhrasalVerb } = usePhrasalVerbs();
const { removeIrregularVerb, editIrregularVerb } = useIrregularVerbs();
const { removeSentence, editSentence } = useSentences();

const route = useRoute();
const router = useRouter();

const props = defineProps({
  items: Object,
  fetchData: Function,
  fetchFilteredData: Function,
});
const { items: itemsRef } = toRefs(props);
const offsetPage = ref(0);
const preloader = ref(false);
const training = ref(false);

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

const onIntersection = (entry) => {
  if (entry.isIntersecting === true) {
    if (entry.target.dataset.index == itemsRef.value.value.length - 1) {
      offsetPage.value = offsetPage.value + 15;
      props.fetchData(offsetPage.value, training.value);
      preloader.value = true;
    }
  }
  setTimeout(() => (preloader.value = false), 300);
};

watch(
  () => itemsRef.value?.value?.length,
  () => {
    preloader.value = false;
  }
);

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
    document.getElementsByClassName('q-page')[0]?.clientHeight - 100 + 'px';
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
