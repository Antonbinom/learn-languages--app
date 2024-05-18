import { pages } from 'src/data';
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const useUtils = () => {
  const router = useRouter();
  const route = useRoute();

  const currentPageTitle = computed(() => {
    const rootPage = pages?.().find((page) => route.path.includes(page.path));
    if (rootPage?.path === route.path) {
      return rootPage.name;
    } else if (rootPage?.children) {
      return rootPage.children.find((child) => child.path === route.path)?.name;
    } else return '';
  });

  const toPreviousePage = () => {
    if (route.path.split('/').length === 2) router.push('/');
    else if (route.path === `/words/collections/edit/${route.params.name}`) {
      router.push('/words/collections');
    } else {
      const prevRoutePath = route.path.split('/').slice(0, -1).join('/');
      router.push(prevRoutePath);
    }
  };

  return { currentPageTitle, toPreviousePage };
};

export default useUtils;
