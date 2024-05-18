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
    },
    {
      name: 'irregular verbs',
      label: 'Irregular verbs',
      path: '/irregular-verbs',
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
