import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLanguagesStore = defineStore(
  'languages',
  () => {
    const searchValue = ref('');
    const currentLanguage = ref('english');
    const selectedLanguages = ref(['english']);
    const notSelectedLanguages = ref([
      'french',
      'italian',
      'german',
      'spanish',
    ]);

    const setSelectedLanguages = (language: string) => {
      selectedLanguages.value.push(language);
      const languageIndex = notSelectedLanguages.value.findIndex(
        (item) => item === language
      );
      notSelectedLanguages.value.splice(languageIndex, 1);
    };

    const setCurrentLanguage = (value: string) => {
      if (currentLanguage.value === value) return;
      currentLanguage.value = value;
    };

    return {
      searchValue,
      currentLanguage,
      selectedLanguages,
      setCurrentLanguage,
      setSelectedLanguages,
      notSelectedLanguages,
    };
  },
  { persist: true }
);
