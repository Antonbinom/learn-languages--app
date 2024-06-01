import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTermsStore = defineStore('terms', () => {
  const currentTermId = ref('');

  const setCurrentTermId = (id: string) => {
    currentTermId.value = id;
  };

  return { currentTermId, setCurrentTermId };
});
