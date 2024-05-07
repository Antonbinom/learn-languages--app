import { pages } from 'src/data';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const useUtils = () => {
  const route = useRoute();

  const languageImage = (language: string) => {
    const imagePath = `../assets/images/${language}.svg`;
    return new URL(imagePath, import.meta.url).href;
  };

  const currentPageTitle = computed(() => {
    const rootPage = pages.find((page) => route.path.includes(page.path));
    if (rootPage?.path === route.path) {
      return rootPage.name;
    } else if (rootPage?.children) {
      return rootPage.children.find((child) => child.path === route.path)?.name;
    } else return '';
  });

  return { languageImage, currentPageTitle };
};

export default useUtils;
