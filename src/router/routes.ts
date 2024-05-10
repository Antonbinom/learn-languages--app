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
    children: [{ path: '', component: () => import('pages/WordsPage.vue') }],
  },
  {
    path: '/words/vocabulary',
    component: () => import('layouts/NoFooterLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/VocabularyPage.vue'),
      },
    ],
  },
  {
    path: '/words/sets',
    component: () => import('layouts/NoFooterLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/WordsSets/WordsSetsPage.vue'),
      },
    ],
  },
  {
    path: '/words/sets/create',
    component: () => import('layouts/NoFooterLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/WordsSets/CreateWordsSetPage.vue'),
      },
    ],
  },
  {
    path: '/words/sets/:name',
    component: () => import('layouts/NoFooterLayout.vue'),
    children: [
      { path: '', component: () => import('pages/WordsSets/WordsSetPage.vue') },
      // { path: 'edit', component: () => import('pages/EditWordsSetPage.vue') },
    ],
  },
  {
    path: '/words/sets/edit/:name',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/WordsSets/EditWordsSetPage.vue'),
      },
    ],
  },
  {
    path: '/phrasal-verbs',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PhrasalVerbsPage.vue') },
    ],
  },
  {
    path: '/sentences',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SentencesPage.vue') },
    ],
  },
  {
    path: '/grammar-rules',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/GrammarRulesPage.vue') },
    ],
  },
  {
    path: '/books',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/BooksPage.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
