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
          name: 'words collections',
          label: 'Words collections',
          path: '/words/collections',
        },
        {
          name: `${route?.params?.name}`,
          label: 'Words collections',
          path: `/words/collections${'/' + route?.params?.name || ''}`,
        },
        {
          name: 'trainings',
          label: 'Trainings',
          path: '/words/trainings',
        },
        {
          name: 'word training',
          label: 'Words',
          path: '/trainings/words',
        },
        {
          name: 'create collection',
          label: 'Create collection',
          path: '/words/collections/create',
        },
        {
          name: `Edit ${route?.params?.name}`,
          label: 'Edit collection',
          path: `/words/collections/edit${'/' + route?.params?.name || ''}`,
        },
      ],
    },
    {
      name: 'phrasal verbs',
      label: 'Phrasal verbs',
      path: '/phrasal-verbs',
      children: [
        {
          name: 'collections',
          label: 'Phrasal verbs collections',
          path: '/phrasal-verbs/collections',
        },
        {
          name: `${route?.params?.name}`,
          label: 'Phrasal verbs collections',
          path: `/phrasal-verbs/collections${'/' + route?.params?.name || ''}`,
        },
        {
          name: 'trainings',
          label: 'Trainings',
          path: '/phrasal-verbs/trainings',
        },
        {
          name: 'phrasal verbs',
          label: 'Phrasal verbs',
          path: '/trainings/phrasal-verbs',
        },
        {
          name: 'create collection',
          label: 'Create collection',
          path: '/phrasal-verbs/collections/create',
        },
        {
          name: `Edit ${route?.params?.name}`,
          label: 'Edit collection',
          path: `/phrasal-verbs/collections/edit${
            '/' + route?.params?.name || ''
          }`,
        },
      ],
    },
    {
      name: 'irregular verbs',
      label: 'Irregular verbs',
      path: '/irregular-verbs',
      children: [
        {
          name: 'collections',
          label: 'Irregular verbs collections',
          path: '/irregular-verbs/collections',
        },
        {
          name: `${route?.params?.name}`,
          label: 'Irregular verbs collections',
          path: `/irregular-verbs/collections${
            '/' + route?.params?.name || ''
          }`,
        },
        {
          name: 'trainings',
          label: 'Trainings',
          path: '/irregular-verbs/trainings',
        },
        {
          name: 'irregular verbs',
          label: 'Irregular verbs',
          path: '/trainings/irregular-verbs',
        },
        {
          name: 'create collection',
          label: 'Create collection',
          path: '/irregular-verbs/collections/create',
        },
        {
          name: `Edit ${route?.params?.name}`,
          label: 'Edit collection',
          path: `/irregular-verbs/collections/edit${
            '/' + route?.params?.name || ''
          }`,
        },
      ],
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
      name: 'trainings',
      label: 'Trainings',
      path: '/trainings',
      children: [
        {
          name: 'words',
          label: 'Words',
          path: '/trainings/words',
        },
        {
          name: 'phrasal verbs',
          label: 'Phrasal verbs',
          path: '/trainings/phrasal-verbs',
        },
        {
          name: 'irregular verbs',
          label: 'Irregular verbs',
          path: '/trainings/irregular-verbs',
        },
        {
          name: 'sentences',
          label: 'Sentences',
          path: '/trainings/sentences',
        },
      ],
    },
    {
      name: 'books',
      label: 'Books',
      path: '/books',
    },
    {
      name: 'translater',
      label: 'Translater',
      path: '/translater',
    },
  ];
};

// const phrasalVerbs = 'up
// around
// away
// off
// out
// over
// in
// down
// into
// on
// by
// along
// down
// through
// to

// be
// back
// blow
// break

// come
// cut
// get
// go
// hold
// knock
// let
// lie
// look
// make
// move
// pass
// pull
// put
// run
// set
// shut
// sit
// stand
// take
// turn
// walk
// '
