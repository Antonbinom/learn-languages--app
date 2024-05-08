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
        name: 'words sets',
        label: 'Words sets',
        path: '/words/sets',
      },
      {
        name: 'trainings',
        label: 'Trainings',
        path: '/words/trainings',
      },
      {
        name: 'create',
        label: 'Create',
        path: '/words/sets/create',
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
