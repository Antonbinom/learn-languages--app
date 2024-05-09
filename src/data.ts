// interface Page {
//   name: string;
//   label: string;
//   path: string;
//   children?: Page[];

import { useRoute } from 'vue-router';

// }
export const pages = () => {
  const route = useRoute();

  return [
    {
      name: 'words',
      label: 'Words',
      path: '/words',
      children: [
        {
          name: 'vocabulary',
          label: 'Vocabulary',
          path: '/words/vocabulary',
        },
        {
          name: 'words sets',
          label: 'Words sets',
          path: '/words/sets',
        },
        {
          name: `${route?.params?.name}`,
          label: 'Words sets',
          path: `/words/sets${'/' + route?.params?.name || ''}`,
        },
        {
          name: 'trainings',
          label: 'Trainings',
          path: '/words/trainings',
        },
        {
          name: 'create set',
          label: 'Create set',
          path: '/words/sets/create',
        },
        {
          name: `Edit ${route?.params?.name}`,
          label: 'Edit set',
          path: `/words/sets/edit${'/' + route?.params?.name || ''}`,
        },
      ],
    },
    {
      name: 'phrasal verbs',
      label: 'Phrasal verbs',
      path: '/phrasal-verbs',
    },
    {
      name: 'sentences',
      label: 'Sentences',
      path: '/sentences',
    },
    {
      name: 'grammar',
      label: 'Grammar',
      path: '/grammar-rules',
    },
    {
      name: 'books',
      label: 'Books',
      path: '/books',
    },
  ];
};
