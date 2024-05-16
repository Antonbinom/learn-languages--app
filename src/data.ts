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
          name: 'word training',
          label: 'Words',
          path: '/trainings/words',
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
