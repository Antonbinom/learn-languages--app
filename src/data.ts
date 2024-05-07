interface Page {
  name: string;
  label: string;
  path: string;
  children?: Page[];
}
export const pages: Page[] = [
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
        name: 'collections',
        label: 'Collections',
        path: '/words/collections',
      },
      {
        name: 'trainings',
        label: 'Trainings',
        path: '/words/trainings',
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
