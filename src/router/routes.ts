import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/words',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/WordsPage.vue') },
      {
        path: 'vocabulary',
        component: () => import('pages/VocabularyPage.vue'),
      },
      {
        path: 'collections',
        component: () => import('pages/CollectionsPage.vue'),
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
