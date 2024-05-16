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
    path: '/words/sets',
    component: () => import('layouts/NoFooterLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/WordsSets/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/words/sets/create',
    component: () => import('layouts/NoFooterLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/WordsSets/CreateSetPage.vue'),
      },
    ],
  },
  {
    path: '/words/sets/:name',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/WordsSets/SetPage.vue'),
      },
      // { path: 'edit', component: () => import('pages/EditWordsSetPage.vue') },
    ],
  },
  {
    path: '/words/sets/edit/:name',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/WordsSets/EditSetPage.vue'),
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
    path: '/sentences',
    component: () => import('layouts/MainLayout.vue'),
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
        component: () => import('pages/Trainings/Words/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/trainings/words/sprint',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Trainings/Words/SprintPage.vue'),
      },
    ],
  },
  {
    path: '/trainings/words/spelling',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Trainings/Words/SpellingPage.vue'),
      },
    ],
  },
  {
    path: '/trainings/words/quiz',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Trainings/Words/TermQuizPage.vue'),
      },
    ],
  },
  {
    path: '/trainings/words/repeat',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Trainings/Words/RepeatPage.vue'),
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
