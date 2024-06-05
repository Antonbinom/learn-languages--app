import { db } from 'src/db';
import { liveQuery } from 'dexie';
import { useLanguagesStore } from 'src/stores/languagesStore';
import { computed } from 'vue';
import useAppEventBus from 'src/composables/useAppEventBus';
import { useErrors } from './useErrors';

interface Word {
  id: string;
  lang: string;
  term: string;
  translation: string;
  explanation: string;
  training: boolean;
}
export const useVocabulary = () => {
  const { $emit } = useAppEventBus();
  const languagesStore = useLanguagesStore();
  const currentLanguage = computed(() => {
    return languagesStore.currentLanguage;
  });
  const { alreadyExists } = useErrors();

  const getAllWords = async () => {
    return db.words.where({ lang: currentLanguage.value }).sortBy('term');
  };

  const getWords = (offset = 0, trainingValue: boolean) => {
    const searchLower = languagesStore.searchValue?.toLowerCase();
    console.log(trainingValue);

    return liveQuery(() =>
      db.words
        .where('lang')
        .equals(currentLanguage.value)
        .filter((item) => {
          return (
            (!trainingValue || item.training === trainingValue) &&
            (item.term.toLowerCase().includes(searchLower) ||
              item.translation.toLowerCase().includes(searchLower))
          );
        })
        .offset(offset)
        .limit(15)
        .sortBy('term')
    );
  };

  const getWord = async (query: object) => {
    return await db.words
      .where({ lang: currentLanguage.value, ...query })
      .first();
  };

  const addNewWord = async (word: Word) => {
    if (await getWord({ term: word.term })) {
      alreadyExists('word', word.term);
    }
    await db.words.add({ ...word, lang: currentLanguage.value });
    $emit('request-words');
  };

  const removeWord = async (id: string) => {
    await db.words.where({ lang: currentLanguage.value, id }).delete();
  };

  const editWord = async (id: string, data: Word, refresh?: boolean) => {
    await db.words.where({ lang: currentLanguage.value, id }).modify(data);
    refresh && $emit('request-words');
  };

  return {
    getWords,
    getAllWords,
    addNewWord,
    removeWord,
    editWord,
    getWord,
  };
};
