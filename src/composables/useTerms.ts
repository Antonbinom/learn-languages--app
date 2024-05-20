import { useRoute } from 'vue-router';
import { useVocabulary } from 'src/composables/useVocabulary';
import { usePhrasalVerbs } from 'src/composables/usePhrasalVerbs';
import { useIrregularVerbs } from './useIrregularVerbs';
import { useSentences } from 'src/composables/useSentences';

const useTerms = () => {
  const route = useRoute();
  const { getVocabulary } = useVocabulary();
  const { getPhrasalVerbs } = usePhrasalVerbs();
  const { getIrregularVerbs } = useIrregularVerbs();
  const { getSentences } = useSentences();

  type Term = {
    id: string;
    term: string;
    translation: string;
    training: boolean;
  };

  const getTerms = async (): Promise<Term[]> => {
    const routeActions: Record<
      string,
      () => Promise<{ terms: Term[] } | undefined>
    > = {
      '/trainings/words': getVocabulary,
      '/trainings/phrasal-verbs': getPhrasalVerbs,
      '/trainings/irregular-verbs': getIrregularVerbs,
      '/trainings/sentences': getSentences,
    };

    const fetchAction = Object.keys(routeActions).find((key) =>
      route.path.includes(key)
    );

    if (!fetchAction) return [];

    const data = await routeActions[fetchAction]();

    return data?.terms?.filter((item) => item.training) || [];
  };

  return { getTerms };
};

export default useTerms;
