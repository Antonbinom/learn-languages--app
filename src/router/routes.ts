import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainPageLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/words',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Words/IndexPage.vue') },
    ],
  },
  {
    path: '/words/vocabulary',
    component: () => import('layouts/NoFooterLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Words/VocabularyPage.vue'),
      },
    ],
  },
  {
    path: '/words/collections',
    component: () => import('layouts/NoFooterLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/WordsCollections/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/words/collections/create',
    component: () => import('layouts/NoFooterLayout.vue'),
    children: [
      {
        path: '',
        component: () =>
          import('pages/WordsCollections/CreateCollectionPage.vue'),
      },
    ],
  },
  {
    path: '/words/collections/:name',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/WordsCollections/CollectionPage.vue'),
      },
      // { path: 'edit', component: () => import('pages/EditwordsCollectionPage.vue') },
    ],
  },
  {
    path: '/words/collections/edit/:name',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () =>
          import('pages/WordsCollections/EditCollectionPage.vue'),
      },
    ],
  },
  {
    path: '/phrasal-verbs',
    component: () => import('layouts/NoFooterLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PhrasalVerbs/IndexPage.vue') },
    ],
  },
  {
    path: '/irregular-verbs',
    component: () => import('layouts/NoFooterLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IrregularVerbs/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/sentences',
    component: () => import('layouts/NoFooterLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Sentences/IndexPage.vue') },
    ],
  },
  {
    path: '/grammar-rules',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/GrammarRules/IndexPage.vue') },
    ],
  },
  {
    path: '/trainings',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Trainings/IndexPage.vue') },
      {
        path: 'words',
        component: () => import('pages/Trainings/WordsPage.vue'),
      },
      {
        path: 'phrasal-verbs',
        component: () => import('pages/Trainings/PhrasalVerbsPage.vue'),
      },
      {
        path: 'irregular-verbs',
        component: () => import('pages/Trainings/IrregularVerbsPage.vue'),
      },
      {
        path: 'sentences',
        component: () => import('pages/Trainings/SentencesPage.vue'),
      },
    ],
  },
  {
    path: '/trainings/words/sprint',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Trainings/SprintPage.vue'),
      },
    ],
  },
  {
    path: '/trainings/words/spelling',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Trainings/SpellingPage.vue'),
      },
    ],
  },
  {
    path: '/trainings/words/quiz',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Trainings/TermQuizPage.vue'),
      },
    ],
  },
  {
    path: '/trainings/words/repeat',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Trainings/RepeatPage.vue'),
      },
    ],
  },
  {
    path: '/trainings/phrasal-verbs/sprint',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Trainings/SprintPage.vue'),
      },
    ],
  },
  {
    path: '/trainings/phrasal-verbs/spelling',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Trainings/SpellingPage.vue'),
      },
    ],
  },
  {
    path: '/trainings/phrasal-verbs/quiz',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Trainings/TermQuizPage.vue'),
      },
    ],
  },
  {
    path: '/trainings/phrasal-verbs/repeat',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Trainings/RepeatPage.vue'),
      },
    ],
  },
  {
    path: '/trainings/irregular-verbs/sprint',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Trainings/SprintPage.vue'),
      },
    ],
  },
  {
    path: '/trainings/irregular-verbs/spelling',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Trainings/SpellingPage.vue'),
      },
    ],
  },
  {
    path: '/trainings/irregular-verbs/quiz',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Trainings/TermQuizPage.vue'),
      },
    ],
  },
  {
    path: '/trainings/irregular-verbs/repeat',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Trainings/RepeatPage.vue'),
      },
    ],
  },
  {
    path: '/books',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Books/IndexPage.vue') },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
