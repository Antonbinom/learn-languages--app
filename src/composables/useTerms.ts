import { useRoute } from 'vue-router';
import { useVocabulary } from 'src/composables/useVocabulary';
import { usePhrasalVerbs } from 'src/composables/usePhrasalVerbs';
import { useIrregularVerbs } from './useIrregularVerbs';
import { useSentences } from 'src/composables/useSentences';

const useTerms = () => {
  const route = useRoute();
  const { getAllWords } = useVocabulary();
  const { getAllPhrasalVerbs } = usePhrasalVerbs();
  const { getAllIrregularVerbs } = useIrregularVerbs();
  const { getAllSentences } = useSentences();

  type Term = {
    id?: string;
    term: string | string[];
    lang: string;
    translation: string;
    explanation?: string;
    training: boolean;
  };

  const getTerms = async (): Promise<Term[]> => {
    const routeActions: Record<string, () => Promise<Term[] | undefined>> = {
      '/trainings/words': getAllWords,
      '/trainings/phrasal-verbs': getAllPhrasalVerbs,
      '/trainings/irregular-verbs': getAllIrregularVerbs,
      '/trainings/sentences': getAllSentences,
    };

    const fetchAction = Object.keys(routeActions).find((key) =>
      route.path.includes(key)
    );

    if (!fetchAction) return [];

    const data = await routeActions[fetchAction]();

    return data?.filter((item) => item.training) || [];
  };

  return { getTerms };
};

export default useTerms;
