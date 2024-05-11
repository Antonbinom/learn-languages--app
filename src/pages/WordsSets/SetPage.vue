<template lang="pug">
q-page
  q-header(elevated).bg-white.text-center
    q-toolbar
      q-toolbar-title.text-dark.text-capitalize {{ $t('edit') }} {{ currentPageTitle }}
  SearchComponent.q-px-md
  q-scroll-area.q-pr-sm.q-pt-md(:style="{height:  scrollAreaHeight}" :bar-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.1 }" :thumb-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.5 }")
    q-item.q-px-none.list-item(
      v-for="(item) in filteredTerms"
      :key="item.id"
      :style="{'border-bottom': '1px solid gray'}"
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
          q-card-section.q-pb-none.q-pt-xs {{ item.explanation }}
q-footer
  q-btn-group(spread)
    q-btn(
      color="warning"
      :label="$t('back')"
      @click="$router.push('/words/sets')"
    )
    q-btn(
      color="teal"
      :label="$t('edit')"
      @click="$router.push(`/words/sets/edit/${$route.params.name}`)"
    )

</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { db } from 'src/db';
import useUtils from 'src/composables/useUtils';
import { useLanguagesStore } from 'src/stores/languagesStore';
//Components
import SearchComponent from 'components/SearchComponent.vue';
import { useRoute } from 'vue-router';

const languageStore = useLanguagesStore();

const route = useRoute();

const { currentPageTitle } = useUtils();

const scrollAreaHeight = ref();
const setName = ref('');
const vocabularyTerms = ref();
const setTerms = ref([]);

const filteredTerms = computed(() => {
  return setTerms.value
    ?.filter((item) => item.term.includes(languageStore.searchValue))
    .sort((a, b) => a.term.localeCompare(b.term));
});

onMounted(async () => {
  const { terms } = await db.vocabularies
    .where('lang')
    .equals(languageStore.currentLanguage)
    .first();

  const { terms: setTermsIds, name } = await db.wordsSets
    .where('lang')
    .equals(languageStore.currentLanguage)
    .and((set) => set.name === route.params.name)
    .first();

  vocabularyTerms.value = terms.filter(
    (item) => !setTermsIds.includes(item.id)
  );
  setTerms.value = terms.filter((item) => setTermsIds.includes(item.id));
  setName.value = name;
  scrollAreaHeight.value =
    document.getElementsByClassName('q-page')[0]?.clientHeight - 80 + 'px';
});
</script>

<style lang="scss">
.list-item {
  cursor: pointer;
}
</style>
