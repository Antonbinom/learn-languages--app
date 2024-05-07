import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDrawersStore = defineStore('drawers', () => {
  const isSettingsOpen = ref(false);
  const isLangugesMenuOpen = ref(false);
  const isAddLanguageMenuOpen = ref(false);
  const isAddTermOpen = ref(false);
  const isEditTermOpen = ref(false);

  const setIsSettingsMenuOpen = () => {
    isSettingsOpen.value = !isSettingsOpen.value;
  };

  const setIsLangugesMenuOpen = (state: boolean) => {
    isLangugesMenuOpen.value = state;
  };

  const setIsAddLanguageMenuOpen = (state: boolean) => {
    isAddLanguageMenuOpen.value = state;
  };

  const setIsAddTermOpen = (state: boolean) => {
    isAddTermOpen.value = state;
  };

  const setIsEditTermOpen = (state: boolean) => {
    isEditTermOpen.value = state;
  };

  return {
    isAddTermOpen,
    isEditTermOpen,
    isSettingsOpen,
    isLangugesMenuOpen,
    isAddLanguageMenuOpen,
    setIsAddTermOpen,
    setIsEditTermOpen,
    setIsSettingsMenuOpen,
    setIsLangugesMenuOpen,
    setIsAddLanguageMenuOpen,
  };
});
