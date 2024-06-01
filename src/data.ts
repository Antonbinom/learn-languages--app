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

export const phrasalVerbs = [
  {
    term: 'act up',
    translation: 'барахлить',
    explanation:
      'барахлить, плохо работать, плохо себя вести, капризничать, болеть, мучить, оправдывать (ожидания)',
  },
  {
    term: 'agree with',
    translation: 'соглашаться с кем-либо',
  },
  {
    term: 'argue back',
    translation: 'возражать',
  },
  {
    term: 'ask around',
    translation: 'разузнавать',
    explanation: 'наводить справки',
  },
  {
    term: 'ask back',
    translation: 'приглашать кого-то снова',
  },
  {
    term: 'ask for',
    translation: 'просить о чем-то',
  },
  {
    term: 'ask out',
    translation: 'приглашать на свидание',
  },
  {
    term: 'back away',
    translation: 'отступать',
  },
  {
    term: 'back down',
    translation: 'отказываться от своих слов',
  },
  {
    term: 'back off',
    translation: 'отступать',
    explanation: 'отступать, возвращаться, сбрасывать скорость',
  },
  {
    term: 'back out',
    translation: 'отказываться от чего-либо',
  },
  {
    term: 'back up',
    translation: 'поддерживать кого-либо',
    explanation: 'поддерживать кого-либо; делать резервную копию',
  },
  {
    term: 'bake off',
    translation: 'отказываться от участия в чем-либо',
  },
  {
    term: 'be back',
    translation: 'возвращаться',
  },
  {
    term: 'be off',
    translation: 'уходить',
    explanation:
      'уходить, отправляться; начинать движение; испортиться, закончиться (о еде), освобождаться от работы, начинаться',
  },
  {
    term: 'be out',
    translation: 'быть без сознания',
    explanation:
      'находиться на дежурстве, быть без сознания, не функционировать, отходить от чего-то, расцветать, выйти из моды, публиковаться, выходить, появляться',
  },
  {
    term: 'be over',
    translation: 'закончиться',
    explanation: 'закончиться; приходить; оставаться',
  },
  {
    term: 'be up',
    translation: 'встать',
    explanation:
      'встать; проснуться; не ложиться спать; увеличиться; случаться; заканчиваться; прибывать в большой город; столкнуться; быть готовым, быть в настроении',
  },
  {
    term: 'be up to',
    translation: 'соответствовать',
    explanation:
      'быть способным; делать (что-то плохое); соответствовать; зависеть от',
  },
  {
    term: 'bear down on',
    translation: 'оказывать давление на кого-либо',
  },
  {
    term: 'beat around the bush',
    translation: 'ходить вокруг да около',
  },
  {
    term: 'beg for',
    translation: 'умолять о чем-то',
  },
  {
    term: 'belong to',
    translation: 'принадлежать кому-либо/чему-либо',
  },
  {
    term: 'bet on',
    translation: 'делать ставку на что-либо',
  },
  {
    term: 'blame on',
    translation: 'обвинять кого-либо в чем-либо',
  },
  {
    term: 'blow away',
    translation: 'уносить ветром; поражать',
  },
  {
    term: 'blow in',
    translation: 'неожиданно появиться',
  },
  {
    term: 'blow out',
    translation: 'тушить (свечу); лопаться',
  },
  {
    term: 'blow over',
    translation: 'успокоиться, пройти (о проблеме)',
  },
  {
    term: 'blow up',
    translation: 'взрываться; увеличиваться',
  },
  {
    term: 'blur out',
    translation: 'выпаливать',
  },
  {
    term: 'blush at',
    translation: 'краснеть от чего-либо',
  },
  {
    term: 'boil down to',
    translation: 'сводиться к чему-либо',
  },
  {
    term: 'bomb out',
    translation: 'провалиться',
  },
  {
    term: 'book in',
    translation: 'бронировать',
  },
  {
    term: 'book out',
    translation: 'выезжать из гостиницы',
  },
  {
    term: 'boost up',
    translation: 'повышать, увеличивать',
  },
  {
    term: 'break away',
    translation: 'отрываться, убегать',
  },
  {
    term: 'break down',
    translation: 'ломаться; переставать работать',
  },
  {
    term: 'break in',
    translation: 'взламываться; приучаться к чему-либо',
  },
  {
    term: 'break into',
    translation: 'врываться; начинать делать что-либо',
  },
  {
    term: 'break off',
    translation: 'отламывать; прекращать отношения',
  },
  {
    term: 'break out',
    translation: 'вырываться; появляться (о болезни)',
  },
  {
    term: 'break through',
    translation: 'прорываться; добиваться успеха',
  },
  {
    term: 'break up',
    translation: 'расставаться; разделять на части',
  },
  {
    term: 'bring about',
    translation: 'вызывать, приводить к чему-либо',
  },
  {
    term: 'bring back',
    translation: 'возвращать; напоминать',
  },
  {
    term: 'bring down',
    translation: 'снижать; разрушать',
  },
  {
    term: 'bring forward',
    translation: 'предлагать, выдвигать',
  },
  {
    term: 'bring out',
    translation: 'выпускать (продукт); подчеркивать',
  },
  {
    term: 'bring round',
    translation: 'приводить в чувство',
  },
  {
    term: 'bring up',
    translation: 'воспитывать; поднимать тему',
  },
  {
    term: 'brush aside',
    translation: 'отмахиваться',
  },
  {
    term: 'brush up on',
    translation: 'повторять что-либо',
  },
  {
    term: 'buckle down',
    translation: 'серьезно взяться за что-либо',
  },
  {
    term: 'bump into',
    translation: 'случайно встретиться',
  },
  {
    term: 'burn down',
    translation: 'сгорать',
  },
  {
    term: 'burn out',
    translation: 'выгорать; перегорать (о лампочке)',
  },
  {
    term: 'burn up',
    translation: 'сгорать; очень сильно сердиться',
  },
  {
    term: 'burst out',
    translation:
      'вспыхивать, разражаться; начинать бурно, внезапно; сбегать; восклицать, вопить; вырастать из одежды',
  },
  {
    term: 'bury oneself in',
    translation: 'целиком погрузиться в работу',
  },
  {
    term: 'bust up',
    translation: 'разрушать; прекращать отношения',
  },
  {
    term: 'buy back',
    translation: 'выкупать обратно',
  },
  {
    term: 'buy into',
    translation: 'покупать акции; соглашаться с чьей-либо точкой зрения',
  },
  {
    term: 'buy out',
    translation: 'выкупать полностью',
  },
  {
    term: 'call away',
    translation: 'отзывать',
  },
  {
    term: 'call back',
    translation: 'перезвонить',
  },
  {
    term: 'call for',
    translation: 'требовать; навещать',
  },
  {
    term: 'call in',
    translation: 'приглашать; сдавать (долг)',
  },
  {
    term: 'call off',
    translation: 'отменять',
  },
  {
    term: 'call on',
    translation: 'обращаться к кому-либо; посещать',
  },
  {
    term: 'call out',
    translation: 'кричать; вызывать на бой',
  },
  {
    term: 'call over',
    translation: 'подзывать',
  },
  {
    term: 'call round',
    translation: 'заходить в гости',
  },
  {
    term: 'call up',
    translation: 'призывать в армию',
  },
  {
    term: 'calm down',
    translation: 'успокаиваться',
  },
  {
    term: 'care for',
    translation: 'заботиться о ком-либо/чем-либо; хотеть',
  },
  {
    term: 'carry away',
    translation: 'увлекать; смывать (водой)',
  },
  {
    term: 'carry back',
    translation: 'возвращать воспоминания',
  },
  {
    term: 'carry in',
    translation: 'вносить',
  },
  {
    term: 'carry on',
    translation: 'продолжать; вести себя плохо',
  },
  {
    term: 'carry out',
    translation: 'выполнять (работу, приказ)',
  },
  {
    term: 'carry over',
    translation: 'переносить (на другой день, счет)',
  },
  {
    term: 'carry through',
    translation: 'доводить до конца',
  },
  {
    term: 'cash in',
    translation: 'получать прибыль; пользоваться чем-либо',
  },
  {
    term: 'catch on',
    translation: 'понимать; становиться популярным',
  },
  {
    term: 'catch out',
    translation: 'обнаружить кого-либо за чем-либо',
  },
  {
    term: 'catch up',
    translation: 'догонять; наверстывать упущенное',
  },
  {
    term: 'catch up with',
    translation: 'догнать кого-либо',
  },
  {
    term: 'chair a meeting',
    translation: 'председательствовать на собрании',
  },
  {
    term: 'change into',
    translation: 'переодеваться',
  },
  {
    term: "change one's mind",
    translation: 'передумать',
  },
  {
    term: 'charge around',
    translation: 'носиться туда-сюда',
  },
  {
    term: 'charge up',
    translation: 'заряжать',
  },
  {
    term: 'chat up',
    translation: 'заигрывать',
    explanation:
      'заводить разговор с кем-либо, часто с флиртовыми или романтическими намерениями',
  },
  {
    term: 'check in',
    translation: 'регистрироваться (в гостинице)',
    explanation: 'сообщать о своем прибытии в отель, хостел и т.д.',
  },
  {
    term: 'check out',
    translation: 'выехать (из гостиницы)',
    explanation: 'заплатить счет и покинуть отель, хостел и т.д.',
  },
  {
    term: 'cheer up',
    translation: 'становиться счастливее',
    explanation: 'поднять настроение кому-либо',
  },
  {
    term: 'chew out',
    translation: 'грубо ругать кого-либо',
    explanation: 'строго отчитывать кого-либо за его ошибки',
  },
  {
    term: 'chill out',
    translation: 'расслабляться',
    explanation: 'успокоиться, снять напряжение',
  },
  {
    term: 'chip in',
    translation: 'вносить свой вклад',
    explanation: 'помогать деньгами, идеями или усилиями',
  },
  {
    term: 'clean out',
    translation: 'убрать все из какого-либо места',
    explanation: 'полностью избавиться от вещей в каком-либо месте',
  },
  {
    term: 'clean up',
    translation:
      'прибирать, приводить в порядок; мыться, приводить себя в порядок; сорвать большой куш',
  },
  {
    term: 'clear off',
    translation: 'уйти',
    explanation: 'покинуть какое-либо место, часто используется в грубой форме',
  },
  {
    term: 'clear up',
    translation: 'становиться яснее, понятнее',
    explanation:
      'становиться более прозрачным (о погоде) или более понятным (о ситуации)',
  },
  {
    term: 'clock in',
    translation: 'начать работать',
    explanation: 'зарегистрировать начало рабочего дня',
  },
  {
    term: 'clock out',
    translation: 'закончить работу',
    explanation: 'зарегистрировать окончание рабочего дня',
  },
  {
    term: 'clog up',
    translation: 'забивать, блокировать',
    explanation: 'делать что-либо непроходимым или непригодным к использованию',
  },
  {
    term: 'close down',
    translation: 'закрыть (бизнес)',
    explanation: 'прекратить работу магазина, ресторана и т.д. навсегда',
  },
  {
    term: 'come about',
    translation: 'происходить',
    explanation: 'случиться',
  },
  {
    term: 'come across',
    translation: 'наткнуться на что-либо',
    explanation: 'случайно найти что-либо',
  },
  {
    term: 'come along',
    translation:
      'идти, появляться где-то; "быстрее!", "поторопись!"; идти с кем-то, сопровождать; улучшаться, поправляться',
  },
  {
    term: 'come around',
    translation: 'передумать',
    explanation: 'изменить свое мнение',
  },
  {
    term: 'come back',
    translation: 'вернуться',
    explanation: 'повторно прибыть в какое-либо место',
  },
  {
    term: 'come by',
    translation: 'заглядывать, заходить; получать, приобретать',
  },
  {
    term: 'come clean',
    translation: 'признаться',
    explanation: 'рассказать правду, особенно о чем-то, что вы скрывали',
  },
  {
    term: 'come down',
    translation:
      'падать, приземляться; понижаться, уменьшаться; отойти, успокоиться после чего-то хорошего; ехать на юг; поддерживать, принимать чью-то сторону',
  },
  {
    term: 'come forward',
    translation: 'выступить вперед',
    explanation: 'предоставить информацию добровольно',
  },
  {
    term: 'come from',
    translation: 'происходить; быть результатом; иметь корни из, в',
  },
  {
    term: 'come in',
    translation: 'войти',
    explanation: 'пройти внутрь здания или комнаты',
  },
  {
    term: 'come off',
    translation:
      'покидать, уходить; отрываться, отваливаться, падать; состояться, иметь место; преодолеть, справиться; перестать, бросить дело, оставить привычку',
  },
  {
    term: 'come on',
    translation: 'давай',
    explanation: 'используется, чтобы поторопить кого-либо',
  },
  {
    term: 'come out',
    translation: 'выйти; выйти в свет',
    explanation:
      'покинуть какое-либо место; быть опубликованным или выпущенным',
  },
  {
    term: 'come over',
    translation:
      'заезжать, заходить куда-то; переезжать, уезжать; менять мнение, переходить на другую сторону; почувствовать себя, прийти в какое-то состояние; быть понятным, доходить, казаться, быть понятым',
  },
  {
    term: 'come through',
    translation: 'преуспеть',
    explanation: 'добиться успеха, несмотря на трудности',
  },
  {
    term: 'come together',
    translation: 'работать хорошо вместе',
    explanation: 'сотрудничать эффективно',
  },
  {
    term: 'come up',
    translation:
      'подниматься, повышаться, восходить; подходить, приближаться; всплывать, появляться, представляться (о шансе), упоминаться; сталкиваться, встречаться',
  },
  {
    term: 'come up with',
    translation: 'придумать',
    explanation: 'создать новую идею',
  },
  {
    term: 'cool down',
    translation: 'успокоиться',
    explanation: 'стать менее сердитым',
  },
  {
    term: 'coop someone up',
    translation: 'запереть кого-либо в тесном помещении',
    explanation: 'ограничивать чью-либо свободу передвижения',
  },
  {
    term: 'cope with',
    translation: 'справляться с чем-либо',
    explanation: 'успешно иметь дело с проблемой или трудной ситуацией',
  },
  {
    term: 'count down',
    translation: 'отсчитывать время',
    explanation: 'объявлять оставшееся время до какого-либо события',
  },
  {
    term: 'count on',
    translation: 'рассчитывать на кого-либо',
    explanation: 'полагаться на кого-либо, чтобы он помог вам',
  },
  {
    term: 'crash out',
    translation: 'резко заснуть',
    explanation: 'внезапно уснуть, особенно из-за усталости',
  },
  {
    term: 'creep up on',
    translation: 'подкрасться к кому-либо',
    explanation: 'приблизиться к кому-либо тихо и незаметно',
  },
  {
    term: 'cross out',
    translation: 'вычеркнуть',
    explanation:
      'стереть или зачеркнуть что-либо, написанное карандашом или ручкой',
  },
  {
    term: 'cut back on',
    translation: 'сократить',
    explanation:
      'уменьшить количество чего-либо, например, еды, расходов или привычки',
  },
  {
    term: 'cut down',
    translation: 'уменьшить размер или количество чего-либо',
    explanation: 'сделать что-либо меньшим по размеру или количеству',
  },
  {
    term: 'cut in',
    translation: 'перебить кого-либо',
    explanation: 'начать говорить, когда кто-то еще говорит',
  },
  {
    term: 'cut off',
    translation: 'прекратить подачу чего-либо',
    explanation:
      'остановить поток чего-либо, например, воды, газа или электричества',
  },
  {
    term: 'cut out',
    translation: 'прекратить делать что-либо',
    explanation: 'перестать делать что-то, что вы обычно делаете',
  },
  {
    term: 'cut up',
    translation: 'разрезать на кусочки',
    explanation:
      'разделить что-либо на более мелкие части с помощью ножа или ножниц',
  },
  {
    term: 'dash off',
    translation: 'убежать',
    explanation: 'быстро уйти',
  },
  {
    term: 'daydream',
    translation: 'витать в облаках',
    explanation: 'фантазировать о приятных вещах',
  },
  {
    term: 'die down',
    translation: 'стихнуть',
    explanation: 'стать менее интенсивным (о шуме, огне и т.д.)',
  },
  {
    term: 'dig in',
    translation: 'приступить к еде',
    explanation: 'начать есть с удовольствием',
  },
  {
    term: 'dish out',
    translation: 'подавать еду',
    explanation: 'разложить еду по тарелкам и подать ее людям',
  },
  {
    term: 'do away with',
    translation: 'избавиться от чего-либо',
    explanation: 'устранить что-либо ненужное или нежелательное',
  },
  {
    term: 'do over',
    translation: 'переделать',
    explanation:
      'сделать что-то снова, потому что оно было сделано неправильно в первый раз',
  },
  {
    term: 'do up',
    translation: 'застегнуть',
    explanation: 'застегнуть пуговицы, молнию или шнурки на одежде',
  },
  {
    term: 'dodge out',
    translation: 'уклониться от чего-либо',
    explanation: 'избежать чего-либо неприятного',
  },
  {
    term: 'doll up',
    translation: 'нарядиться',
    explanation: 'одеться элегантно',
  },
  {
    term: 'drag on',
    translation: 'тянуться',
    explanation:
      'продолжаться в течение долгого времени, особенно кажущегося таким',
  },
  {
    term: 'draw back',
    translation: 'отступить',
    explanation: 'двинуться назад',
  },
  {
    term: 'draw in',
    translation: 'привлекать',
    explanation: 'заинтересовать кого-либо чем-либо',
  },
  {
    term: 'draw out',
    translation: 'затягивать',
    explanation: 'делать что-то  дольше, чем необходимо',
  },
  {
    term: 'draw up',
    translation: 'остановиться (о транспортном средстве)',
    explanation: 'остановить транспортное средство у обочины или другого места',
  },
  {
    term: 'dream up',
    translation: 'придумать',
    explanation: 'создать новую идею',
  },
  {
    term: 'dress down',
    translation: 'строго отчитать кого-либо',
    explanation: 'грубо критиковать кого-либо за его одежду или поведение',
  },
  {
    term: 'drip-feed',
    translation: 'давать информацию понемногу',
    explanation: 'предоставлять информацию небольшими порциями',
  },
  {
    term: 'drop back',
    translation: 'отстать',
    explanation:
      'оказаться позади кого-либо или чего-либо во время бега, езды на велосипеде и т.д.',
  },
  {
    term: 'drop by',
    translation: 'зайти ненадолго',
    explanation:
      'посетить кого-либо ненадолго без предварительной договоренности',
  },
  {
    term: 'drop in',
    translation: 'зайти ненадолго',
    explanation: 'посетить кого-либо ненадолго, часто неожиданно',
  },
  {
    term: 'drop off',
    translation: 'доставить',
    explanation: 'отвезти кого-либо или что-либо куда-либо и оставить там',
  },
  {
    term: 'drop out',
    translation: 'бросить учебу',
    explanation: 'прекратить обучение в школе, университете и т.д.',
  },
  {
    term: 'drum up',
    translation: 'добиться поддержки',
    explanation: 'генерировать интерес или поддержку для чего-либо',
  },
  {
    term: 'dust off',
    translation: 'стереть пыль',
    explanation:
      'очистить что-либо от пыли, особенно что-то, что не использовалось в течение длительного времени',
  },
  {
    term: 'dwell on',
    translation: 'зацикливаться на чем-либо',
    explanation: 'слишком много думать о чем-то неприятном',
  },
  {
    term: 'eat out',
    translation: 'поесть вне дома',
    explanation: 'принять пищу в ресторане, кафе и т.д., а не дома',
  },
  {
    term: 'end up',
    translation: 'оказаться',
    explanation:
      'быть в определенном месте или ситуации, часто непреднамеренно',
  },
  {
    term: 'even out',
    translation: 'выровняться',
    explanation: 'стать более гладким, ровным или сбалансированным',
  },
  {
    term: 'face up to',
    translation: 'не бояться чего-либо',
    explanation: 'честно признать проблему или трудную ситуацию',
  },
  {
    term: 'fade away',
    translation: 'исчезнуть',
    explanation:
      'стать постепенно слабее или тише и в конечном итоге исчезнуть',
  },
  {
    term: 'fall apart',
    translation: 'развалиться',
    explanation:
      'рассыпаться на части; перестать функционировать должным образом',
  },
  {
    term: 'fall back on',
    translation: 'обратиться к чему-либо',
    explanation:
      'использовать что-то знакомое или надежное, когда у вас нет ничего лучшего',
  },
  {
    term: 'fall behind',
    translation: 'отстать',
    explanation: 'оказаться позади других людей или не успевать за графиком',
  },
  {
    term: 'fall down',
    translation: 'упасть, падать ниц; потерпеть неудачу',
  },
  {
    term: 'fall for',
    translation: 'влюбиться',
    translation_alt: 'попасться на обман',
    explanation:
      'испытать романтические чувства к кому-либо; стать жертвой обмана',
  },
  {
    term: 'fall off',
    translation:
      'уменьшаться, ослабевать; ухудшаться; не слушаться руля (о судне, машине)',
  },
  {
    term: 'fall out',
    translation: 'поссориться',
    explanation: 'прекратить дружить с кем-либо',
  },
  {
    term: 'fall through',
    translation: 'не состояться',
    explanation: 'не произойти, как планировалось',
  },
  {
    term: 'feed off',
    translation: 'питаться чем-либо',
    explanation: 'получать энергию или идеи от чего-либо',
  },
  {
    term: 'feed up',
    translation: 'надоесть',
    explanation: 'стать раздраженным или недовольным чем-то',
  },
  {
    term: 'feel down',
    translation: 'чувствовать себя подавленным',
    explanation: 'испытывать грусть или уныние',
  },
  {
    term: 'feel for',
    translation: 'сочувствовать кому-либо',
    explanation: 'понимать и разделять чьи-либо чувства',
  },
  {
    term: 'feel out',
    translation: 'прощупывать почву',
    explanation:
      'пытаться узнать чье-либо точку зрения или намерения косвенным образом',
  },
  {
    term: 'figure out',
    translation: 'понять',
    explanation: 'найти решение проблемы или понять что-либо сложное',
  },
  {
    term: 'fill in',
    translation: 'заполнить',
    explanation: 'писать информацию в пустые места на бланке',
  },
  {
    term: 'fill out',
    translation: 'заполнять',
    explanation: 'стать более полным или округлым',
  },
  {
    term: 'find out',
    translation: 'узнать',
    explanation: 'получить информацию о чем-либо',
  },
  {
    term: 'fish for',
    translation: 'пытаться добиться чего-либо косвенно',
    explanation:
      'пытаться получить комплимент, информацию или что-либо еще косвенным образом',
  },
  {
    term: 'fit in',
    translation: 'вписаться',
    explanation: 'быть подходящим по размеру или форме для чего-либо',
  },
  {
    term: 'flare up',
    translation: 'вспыхнуть',
    explanation: 'внезапно стать более серьезным (о проблеме, болезни и т.д.)',
  },
  {
    term: 'flee the scene',
    translation: 'скрыться с места происшествия',
    explanation: 'быстро убежать с места преступления или аварии',
  },
  {
    term: 'flip out',
    translation: 'сойти с ума',
    explanation: 'очень сильно разозлиться или расстроиться',
  },
  {
    term: 'flog a dead horse',
    translation: 'делать бессмысленную работу',
    explanation: 'тратить время и усилия на что-то, что не принесет результата',
  },
  {
    term: 'flow in',
    translation: 'поступать в большом количестве',
    explanation: 'приходить или прибывать в большом количестве',
  },
  {
    term: 'fly off the handle',
    translation: 'взбеситься',
    explanation: 'внезапно очень сильно разозлиться',
  },
  {
    term: 'fold up',
    translation: 'сложить',
    explanation: 'сделать что-то плоским, сложив его',
  },
  {
    term: 'fool around',
    translation: 'дурачиться',
    explanation: 'вести себя глупо или по-детски',
  },
  {
    term: 'fool someone',
    translation: 'обмануть кого-либо',
    explanation: 'заставить кого-либо поверить во что-то неправдивое',
  },
  {
    term: 'forget about',
    translation: 'забыть о чем-либо',
    explanation: 'перестать думать о чем-либо',
  },
  {
    term: 'fork out',
    translation: 'раскошелиться',
    explanation: 'заплатить деньги за что-либо, часто неохотно',
  },
  {
    term: 'form up',
    translation: 'строиться',
    explanation: 'встать в линию или другую формацию (о людях)',
  },
  {
    term: 'freak out',
    translation: 'испугаться',
    explanation: 'очень сильно испугаться или расстроиться',
  },
  {
    term: 'fritter away',
    translation: 'растрачивать',
    explanation: 'тратить время, деньги или ресурсы впустую',
  },
  {
    term: 'get across',
    translation: 'донести мысль',
    explanation: 'убедиться, что другие люди понимают ваши идеи',
  },
  {
    term: 'get ahead',
    translation: 'продвигаться вперед',
    explanation: 'добиваться успеха в жизни или карьере',
  },
  {
    term: 'get along',
    translation:
      'уживаться, ладить; справляться, преуспевать; жить, обходиться без, продержаться; проходить (о времени), стареть',
  },
  {
    term: 'get along (with someone)',
    translation: 'ладить с кем-либо',
    explanation: 'иметь хорошие отношения с кем-либо',
  },
  {
    term: 'get around',
    translation: 'передвигаться',
    explanation: 'путешествовать с одного места в другое',
  },
  {
    term: 'get away',
    translation: 'уехать',
    explanation: 'уехать в отпуск или на выходные',
  },
  {
    term: 'get back',
    translation: 'вернуться',
    explanation: 'приехать домой, на работу и т.д. после поездки',
  },
  {
    term: 'get down',
    translation:
      'сбивать с ног; проглатывать (с трудом); подстрелить, подбить; записывать; приняться, засесть за (работу, учебу)',
  },
  {
    term: 'get down to business',
    translation: 'приступить к делу',
    explanation: 'начать серьезно работать над чем-либо',
  },
  {
    term: 'get in',
    translation:
      'попасть куда-то, зайти; приходить домой, на работу прибывать (о транспорте); поступить в (институт)',
  },
  {
    term: 'get off',
    translation:
      'отбывать, отправляться; чистить, отчищать; спасать, спасаться, избежать наказания, избежать ранения; заканчивать работу',
  },
  {
    term: 'get on',
    translation: 'садиться (в транспорт)',
    explanation:
      'занять место в транспортном средстве, таком как поезд, автобус или самолет',
  },
  {
    term: 'get on with (something)',
    translation: 'продолжать делать что-либо',
    explanation: 'продолжать делать что-либо, несмотря на трудности',
  },
  {
    term: 'get out',
    translation: 'выйти',
    explanation: 'покинуть здание, комнату или транспортное средство',
  },
  {
    term: 'get out of',
    translation: 'избежать чего-либо',
    explanation: 'найти способ избежать чего-либо неприятного',
  },
  {
    term: 'get over',
    translation: 'пережить',
    explanation: 'преодолеть негативные чувства, такие как грусть или гнев',
  },
  {
    term: 'get round to (something)',
    translation: 'наконец сделать что-либо',
    explanation: 'сделать что-то, что вы откладывали',
  },
  {
    term: 'get through',
    translation: 'пройти через что-либо',
    explanation:
      'успешно справиться с трудным временем, ситуацией или экзаменом',
  },
  {
    term: 'get together',
    translation: 'встретиться',
    explanation: 'договориться о встрече с кем-либо',
  },
  {
    term: 'get up',
    translation: 'встать',
    explanation:
      'подняться с кровати, стула или другого места, где вы сидели или лежали',
  },
  {
    term: 'give away',
    translation: 'отдать',
    explanation: 'предоставить кому-либо что-либо бесплатно',
  },
  {
    term: 'give back',
    translation: 'вернуть',
    explanation: 'возвращать что-либо владельцу',
  },
  {
    term: 'give in',
    translation: 'поддаться',
    explanation: 'перестать сопротивляться кому-либо или чему-либо',
  },
  {
    term: 'give off',
    translation: 'излучать',
    explanation: 'производить свет, тепло или запах',
  },
  {
    term: 'give out',
    translation: 'закончиться',
    explanation: 'исчерпаться (о запасах, энергии и т.д.)',
  },
  {
    term: 'give someone up',
    translation: 'предать кого-либо',
    explanation: 'сообщить полиции о преступнике',
  },
  {
    term: 'give up',
    translation: 'бросить',
    explanation:
      'перестать делать что-либо, потому что вы больше не хотите этого делать или потому что это слишком сложно',
  },
  {
    term: 'go along',
    translation:
      'идти куда-то (часто заранее не планируя этого); продвигаться, развиваться; сопровождаться чем-то; соглашаться с кем-то или чем-то; уходить, убираться',
  },
  {
    term: 'go along with',
    translation: 'согласиться с чем-либо',
    explanation:
      'принимать решение или план другого человека, даже если вы с ним не согласны',
  },
  {
    term: 'go around/round',
    translation:
      'вращаться, вертеться, кружиться, повторяться; передаваться, распространяться; хватать на всех; вести себя определенным образом; появляться в обществе, ходить к кому-то в гости',
  },
  {
    term: 'go away',
    translation: 'уходить, покидать, сбегать; исчезать, прекращаться',
  },
  {
    term: 'go back',
    translation:
      'возвращаться (к чему-то, куда-то), вспоминать что-то; тянуться, простираться назад, вглубь; отказываться (от чего-то); изменять, предавать кого-то',
  },
  {
    term: "go back on (one's word)",
    translation: 'нарушить обещание',
    explanation: 'не сдержать свое обещание',
  },
  {
    term: 'go by',
    translation:
      'быть упущенным (о шансе), проходить незамеченным; проходить мимо, проходить (о времени); верить, следовать (чему-то); заходить (к кому-то)',
  },
  {
    term: 'go down',
    translation:
      'понижаться, уменьшаться, стихать, спадать, садиться; доходить, продолжаться до; быть принятым, одобренным, воспринятым; случаться, происходить; провалиться, терпеть неудачу, идти ко дну',
  },
  {
    term: 'go for',
    translation: 'пытаться сделать что-либо',
    explanation: 'делать попытку достичь чего-либо',
  },
  {
    term: 'go in',
    translation:
      'входить, попадать куда-то; заходить за тучи (о солнце); доходить, быть понятым, запомненным; интересоваться, увлекаться; выбирать, позволять, разрешать себе; объединяться, действовать совместно',
  },
  {
    term: 'go off',
    translation: 'испортиться',
    explanation: 'стать непригодным к употреблению (о пище)',
  },
  {
    term: 'go on',
    translation: 'продолжаться',
    explanation:
      'происходить непрерывно в течение определенного периода времени',
  },
  {
    term: 'go out',
    translation: 'выйти',
    explanation: 'покинуть здание или комнату, чтобы куда-то пойти',
  },
  {
    term: 'go out with',
    translation: 'встречаться с кем-либо',
    explanation: 'иметь романтические отношения с кем-либо',
  },
  {
    term: 'go over',
    translation: 'просмотреть',
    explanation: 'внимательно изучить что-либо',
  },
  {
    term: 'go through',
    translation:
      'быть одобренным, принятым; проверять, проходиться по, изучать, рассматривать; пребывать, проходить через (сложный период); быть опубликованным, напечатанным, изданным',
  },
  {
    term: 'go through with',
    translation: 'выполнить',
    explanation: 'завершить начатое дело',
  },
  {
    term: 'go under',
    translation: 'обанкротиться',
    explanation: 'прекратить свою деятельность из-за финансовых трудностей',
  },
  {
    term: 'go up',
    translation: 'подняться',
    explanation: 'переместиться на более высокий уровень',
  },
  {
    term: 'grow on (someone)',
    translation: 'начать нравиться кому-либо',
    explanation: 'стать более приятным для кого-либо со временем',
  },
  {
    term: 'grow out of',
    translation: 'перерасти',
    explanation: 'стать слишком большим для чего-либо',
  },
  {
    term: 'grow up',
    translation: 'вырасти',
    explanation: 'стать взрослым',
  },
  {
    term: 'hand in',
    translation: 'сдать',
    explanation: 'предоставить кому-либо задание, которое вы выполнили',
  },
  {
    term: 'hang around',
    translation: 'болтаться',
    explanation: 'проводить время без особой цели',
  },
  {
    term: 'hang around/about',
    translation:
      'быть рядом, на виду, находиться, бродить где-то; мешкаться, "копаться"; проводить время, связаться с кем-то; прицепиться, не проходить',
  },
  {
    term: 'hang on',
    translation: 'держаться',
    explanation: 'не отпускать что-либо',
  },
  {
    term: 'hang out',
    translation: 'тусоваться',
    explanation: 'проводить время в непринужденной обстановке с друзьями',
  },
  {
    term: 'hang up',
    translation: 'повесить',
    explanation: 'поместить одежду или другой предмет на крючок',
  },
  {
    term: 'harp on about',
    translation: 'твердить одно и то же',
    explanation: 'постоянно говорить о чем-то',
  },
  {
    term: 'have a go at',
    translation: 'попробовать сделать что-либо',
    explanation: 'сделать попытку сделать что-либо',
  },
  {
    term: 'have a look',
    translation: 'взглянуть',
    explanation: 'посмотреть на что-либо',
  },
  {
    term: 'have it out (with someone)',
    translation: 'выяснить отношения с кем-либо',
    explanation:
      'обсудить проблему или разногласие с кем-либо открыто и честно',
  },
  {
    term: 'head off',
    translation: 'отправляться',
    explanation: 'уезжать или уходить в какое-либо место',
  },
  {
    term: 'hear back from (someone)',
    translation: 'получить ответ от кого-либо',
    explanation: 'узнать от кого-либо, с кем вы раньше общались',
  },
  {
    term: 'help out',
    translation: 'помочь в затруднении, выручить',
  },
  {
    term: 'hold on',
    translation: 'подождать',
    explanation: 'ждать немного времени',
  },
  {
    term: 'hold out',
    translation: 'продержаться',
    explanation: 'продолжать делать что-либо, несмотря на трудности',
  },
  {
    term: 'hold up',
    translation:
      'поддерживать, подпирать; устоять, выстоять; останавливать, задерживать; выставлять, показывать; грабить, обирать',
  },
  {
    term: 'hunt around for',
    translation: 'искать',
    explanation: 'пытаться найти что-либо, осматривая разные места',
  },
  {
    term: 'hurry up',
    translation: 'поторапливаться',
    explanation: 'делать что-либо быстрее',
  },
  {
    term: 'iron out',
    translation: 'урегулировать',
    explanation: 'решить проблему или разногласие',
  },
  {
    term: 'jack in',
    translation: 'бросить работу',
    explanation: 'прекратить работу на своей текущей должности',
  },
  {
    term: "jog someone's memory",
    translation: 'напомнить кому-либо',
    explanation: 'помочь кому-либо вспомнить что-то',
  },
  {
    term: 'keep in touch',
    translation: 'поддерживать связь',
    explanation: 'продолжать общаться с кем-либо',
  },
  {
    term: 'keep on',
    translation:
      'продолжать; сохранять в прежнем виде, оставлять; не снимать, оставлять (одежду); продлевать (аренду); ругать',
  },
  {
    term: 'keep out',
    translation: 'не пускать',
    explanation: 'не разрешать кому-либо входить в какое-либо место',
  },
  {
    term: 'keep up',
    translation:
      'поддерживать; продолжать; держаться бодро; поддерживать в порядке; соблюдать, придерживаться; быть в курсе, быть наравне, быть осведомленным',
  },
  {
    term: 'keep up with',
    translation: 'не отставать',
    explanation: 'успевать за кем-либо или чем-либо',
  },
  {
    term: 'kick back',
    translation: 'расслабиться',
    explanation: 'отдохнуть и приятно провести время',
  },
  {
    term: 'knock back',
    translation: 'отклонить',
    explanation: 'отказаться от предложения',
  },
  {
    term: 'knock down',
    translation: 'сбить с ног',
    explanation: 'заставить кого-либо упасть, ударив его',
  },
  {
    term: 'knock off',
    translation:
      'прекращать (делать что-то), останавливаться, закончить; сбить, убрать, свалить; сбавлять, снижать (цену); состряпать, быстро написать (музыку, текст)',
  },
  {
    term: 'knock out',
    translation:
      'нокаутировать (в боксе); одолеть, победить, сразить наповал; выключить, вырубить (электричество); утомлять, усыплять, одурманивать',
  },
  {
    term: 'lay down the law',
    translation: 'установить правила',
    explanation: 'четко объяснить кому-либо правила или ожидания',
  },
  {
    term: 'lay off',
    translation: 'уволить',
    explanation: 'прекратить чью-либо работу',
  },
  {
    term: 'let down',
    translation: 'подвести',
    explanation: 'разочаровать кого-либо, не выполнив обещания',
  },
  {
    term: 'let go of',
    translation: 'отпустить',
    explanation: 'перестать держать что-либо или кого-либо',
  },
  {
    term: 'let in',
    translation:
      'впускать, разрешить войти, пропускать; допускать, признавать; напрашиваться, впутывать; посвящать кого-то в планы',
  },
  {
    term: 'let out',
    translation:
      'выпускать, давать выйти, пропускать; заканчиваться (о занятиях); проговориться, проболтаться; издавать (звук); давать потухнуть огню',
  },
  {
    term: 'let someone in on (a secret)',
    translation: 'посвятить кого-либо в тайну',
    explanation: 'рассказать кому-либо секрет',
  },
  {
    term: 'lie ahead',
    translation: 'ждать впереди, быть в будущем',
  },
  {
    term: 'lie around',
    translation: 'валяться, быть разбросанным; лежать, проводить время',
  },
  {
    term: 'lie down',
    translation: 'ложиться, лечь; работать без старания',
  },
  {
    term: 'lie in',
    translation:
      'валяться в постели; находиться при родах; заключаться в чем-то, находиться, быть в чем-то',
  },
  {
    term: 'line up',
    translation:
      'лежать, не выходить (из-за болезни); скрываться (от полиции, преследования)',
  },
  {
    term: 'look after',
    translation: 'заботиться о ком-либо',
    explanation:
      'предоставлять кому-либо то, что ему нужно, чтобы быть здоровым и счастливым',
  },
  {
    term: 'look ahead',
    translation: 'смотреть в будущее, планировать на будущее',
  },
  {
    term: 'look around',
    translation: 'осматриваться',
    explanation: 'искать что-либо в определенном месте',
  },
  {
    term: 'look back',
    translation: 'вспоминать, оглядываться в прошлое; терпеть неудачи',
  },
  {
    term: 'look back on',
    translation: 'вспоминать',
    explanation: 'думать о чем-то, что произошло в прошлом',
  },
  {
    term: 'look down',
    translation:
      'смотреть свысока, презирать, быть расположенным выше чего-то, дешеветь, падать в цене',
  },
  {
    term: 'look down on',
    translation: 'презирать',
    explanation: 'считать кого-то или что-то ниже себя',
  },
  {
    term: 'look for',
    translation: 'искать; нарываться на драку, проблемы',
  },
  {
    term: 'look forward to',
    translation: 'с нетерпением ждать',
    explanation:
      'чувствовать волнение по поводу чего-то, что произойдет в будущем',
  },
  {
    term: 'look into',
    translation: 'исследовать',
    explanation: 'изучать или проводить исследование чего-либо',
  },
  {
    term: 'look out',
    translation:
      'быть настороже; выходить (на сторону), быть обращенным; подыскивать, выискивать; высматривать',
  },
  {
    term: 'look out for',
    translation: 'беречься от',
    explanation:
      'быть осторожным по отношению к чему-либо или следить за чем-либо',
  },
  {
    term: 'look over',
    translation: 'тщательно изучать, просматривать',
  },
  {
    term: 'look up',
    translation: 'искать',
    explanation: 'искать информацию в книге, словаре или интернете',
  },
  {
    term: 'look up to',
    translation: 'восхищаться',
    explanation: 'испытывать восхищение или уважение к кому-либо',
  },
  {
    term: 'make away',
    translation:
      'убежать, улизнуть; убить (кого-то, себя); растратить, разрушить',
  },
  {
    term: 'make do with',
    translation: 'обходиться тем, что есть',
    explanation: 'управляться с тем, что у вас есть, даже если это не идеально',
  },
  {
    term: 'make for',
    translation: 'направляться к чему-то, кому-то',
  },
  {
    term: 'make off',
    translation: 'убежать, ускользнуть, скрыться; украсть, воровать, стащить',
  },
  {
    term: 'make off with',
    translation: 'скрыться с чем-либо',
    explanation: 'украсть что-то и убежать',
  },
  {
    term: 'make out',
    translation: 'разобрать',
    explanation: 'понять что-то, что трудно слышно или видно',
  },
  {
    term: 'make up',
    translation: 'придумывать',
    explanation: 'изобретать историю или лгать',
  },
  {
    term: 'make up for',
    translation: 'компенсировать',
    explanation: 'восполнить что-то негативное, сделав что-то положительное',
  },
  {
    term: 'mess around',
    translation: 'бездельничать',
    explanation: 'тратить время впустую или вести себя неосторожно',
  },
  {
    term: 'miss out on',
    translation: 'упустить',
    explanation: 'не испытать чего-либо',
  },
  {
    term: 'move in',
    translation:
      'переезжать на новое место въезжать; надвигаться, наступать, окружать; контролировать, вмешиваться',
  },
  {
    term: 'move on',
    translation:
      'идти дальше, переходить (к чему-то новому); продвигаться, прогрессировать',
  },
  {
    term: 'move out',
    translation: 'уходить, покидать, выезжать; выдвигать',
  },
  {
    term: 'nod off',
    translation: 'задремать',
    explanation: 'заснуть ненадолго, особенно непреднамеренно',
  },
  {
    term: 'note down',
    translation: 'записывать',
    explanation: 'записывать что-либо для дальнейшего использования',
  },
  {
    term: 'object to',
    translation: 'возражать против',
    explanation: 'выступать против чего-либо или выражать свое несогласие',
  },
  {
    term: 'opt for',
    translation: 'выбирать',
    explanation: 'делать выбор из нескольких вариантов',
  },
  {
    term: 'pass away',
    translation: 'умереть',
    explanation: 'перестать жить',
  },
  {
    term: 'pass down',
    translation:
      'передавать, давать что-то (подчиненному); передавать, передаваться по наследству',
  },
  {
    term: 'pass off',
    translation:
      'прекращаться, проходить; пронестить, пройти (о буре); сбывать, подсовывать, выдавать (за кого-то); пропускать мимо ушей, оставлять без внимания',
  },
  {
    term: 'pass out',
    translation: 'обморочиться',
    explanation: 'внезапно потерять сознание',
  },
  {
    term: 'pay back',
    translation: 'возвращать',
    explanation: 'возвращать деньги, которые вам кто-то одолжил',
  },
  {
    term: 'pay off',
    translation: 'окупиться',
    explanation: 'принести пользу или прибыль, оправдав вложенные средства',
  },
  {
    term: 'pick on',
    translation: 'дразнить',
    explanation: 'беспокоить или обижать кого-то менее сильного',
  },
  {
    term: 'pick out',
    translation: 'выбирать',
    explanation: 'выбирать что-то из множества вариантов',
  },
  {
    term: 'pick up',
    translation: 'подбирать',
    explanation: 'поднять что-то с земли',
  },
  {
    term: 'pig out on',
    translation: ' объесться',
    explanation: 'есть слишком много чего-то, особенно нездорового',
  },
  {
    term: 'point out',
    translation: 'указывать',
    explanation: 'обращать чье-то внимание на что-либо',
  },
  {
    term: 'pull away',
    translation: 'оторваться (в гонке), рвануть, стартовать резко, отпрянуть',
  },
  {
    term: 'pull off',
    translation: 'совершить',
    explanation: 'успешно выполнить что-то сложное',
  },
  {
    term: 'pull on',
    translation:
      'справиться с ситуацией; дружить, поддерживать дружеские отношения',
  },
  {
    term: 'pull out',
    translation:
      'отправляться, отходить, начинать движение (о транспорте); вытаскивать, вытягивать, извлекать; выходить, отходить (от ссоры, депрессии); растягивать, удлинять; отказаться от участия, выйти из боя, покинуть',
  },
  {
    term: 'pull through',
    translation: 'выздороветь',
    explanation: 'выздороветь после болезни или травмы',
  },
  {
    term: 'pull up',
    translation:
      'останавливать, останавливаться; идти впереди или наравне с другими; исправлять, улучшать, совершенствовать',
  },
  {
    term: 'put across',
    translation: 'донести мысль',
    explanation: 'эффективно объяснить свою идею другим людям',
  },
  {
    term: 'put aside',
    translation:
      'откладывать на время, прерывать; прекращать, положить конец (чему-то); экономить, приберегать, запасать, резервировать; отбрасывать, стараться не замечать',
  },
  {
    term: 'put away',
    translation:
      'отказаться (от мысли); убирать, прятать (на место); помещать, упрятать (в тюрьму, больницу); откладывать (деньги); много есть, поглощать, лопать, трескать',
  },
  {
    term: 'put down',
    translation: 'записать',
    explanation: 'записать что-либо на бумаге',
  },
  {
    term: 'put in',
    translation:
      'вносить, устанавливать (оборудование); подавать, вносить (заявку, заявление); включать, добавлять; прерывать разговор, вставлять слово; напрягать силы, прилагать усилия; проводить время за чем-то',
  },
  {
    term: 'put off',
    translation: 'откладывать',
    explanation: 'перенести выполнение чего-либо на более позднее время',
  },
  {
    term: 'put on',
    translation: 'надеть',
    explanation: 'поместить одежду или аксессуар на свое тело',
  },
  {
    term: 'put out',
    translation:
      'выгонять, удалять, устранять, убирать; выпускать, производить, издавать; давать побеги; вывихнуть (сустав); тушить, гасить; расходовать, тратить силы; выводить из себя, смущать; отправляться, выходить',
  },
  {
    term: 'put someone up',
    translation: 'предоставить кому-либо жилье',
    explanation: 'разрешить кому-то жить в вашем доме',
  },
  {
    term: 'put something away',
    translation: 'убрать',
    explanation: 'поместить что-либо на его обычное место',
  },
  {
    term: 'put up',
    translation:
      'строить, воздвигать; показывать, выставлять, вывешивать; повышать; показывать, выражать (отношение, эмоции); вложить, внести (сумму); организовывать, устраивать; принимать, давать приют, оставаться на ночь где-то; мириться, терпеть, сносить',
  },
  {
    term: 'put up with',
    translation: 'терпеть',
    explanation: 'принимать кого-либо или что-либо неприятное, не жалуясь',
  },
  {
    term: 'run across',
    translation: 'случайно встретить, натолкнуться на кого-то или что-то',
  },
  {
    term: 'run away',
    translation: 'убегать, бежать',
  },
  {
    term: 'run down',
    translation:
      'сбивать (кого-то машиной); истощать, изнурять; сажать (батарейку); выслеживать, разыскивать',
  },
  {
    term: 'run into',
    translation:
      'случайно встретить кого-то; сталкиваться с проблемой, затруднением',
  },
  {
    term: 'run off',
    translation: 'убегать, бежать; печатать много копий',
  },
  {
    term: 'run out',
    translation: 'заканчиваться, иссякать; истекать срок действия',
  },
  {
    term: 'run over',
    translation:
      'переезжать (кого-то машиной); переполнять; просматривать, бегло осматривать',
  },
  {
    term: 'run through',
    translation:
      'быстро просмотреть, пробежаться глазами; быстро потратить; репетировать',
  },
  {
    term: 'run up',
    translation: 'набегать (о счете); взбегать, подниматься бегом',
  },
  {
    term: 'rush into',
    translation: 'делать что-то необдуманно, поспешно',
  },
  {
    term: 'rush out',
    translation: 'быстро выходить, выбегать',
  },
  {
    term: 'set about',
    translation: 'приниматься за что-то, начинать делать что-то',
  },
  {
    term: 'set aside',
    translation: 'откладывать, выделять',
  },
  {
    term: 'set back',
    translation: 'задерживать, препятствовать прогрессу',
  },
  {
    term: 'set down',
    translation: 'высаживать (пассажиров); устанавливать правила, принципы',
  },
  {
    term: 'set forth',
    translation: 'излагать, представлять факты, доводы',
  },
  {
    term: 'set in',
    translation: 'наступать, начинаться (о погоде, моде)',
  },
  {
    term: 'set off',
    translation: 'отправляться, выезжать; вызвать, спровоцировать',
  },
  {
    term: 'set on',
    translation: 'подстрекать, натравливать (одного на другого)',
  },
  {
    term: 'set out',
    translation: 'отправляться в путь; ставить перед собой цель',
  },
  {
    term: 'set to',
    translation: 'приниматься за что-то энергично',
  },
  {
    term: 'settle down',
    translation: 'устраиваться, обустраиваться; успокаиваться',
  },
  {
    term: 'settle for',
    translation: 'довольствоваться чем-то меньшим',
  },
  {
    term: 'settle in',
    translation: 'обустраиваться на новом месте',
  },
  {
    term: 'settle on',
    translation: 'остановиться на чём-то, сделать выбор',
  },
  {
    term: 'settle up',
    translation: 'расплачиваться, оплачивать счет',
  },
  {
    term: 'show off',
    translation: 'хвастаться, выставлять напоказ',
  },
  {
    term: 'show round',
    translation: 'показывать (здание, город и т.п.)',
  },
  {
    term: 'show up',
    translation: 'появляться; разоблачать',
  },
  {
    term: 'shut down',
    translation: 'закрывать (завод, фабрику и т.п.); прекращать работу',
  },
  {
    term: 'shut out',
    translation: 'исключать, не допускать',
  },
  {
    term: 'sign up',
    translation: 'записываться, регистрироваться',
  },
  {
    term: 'sit down',
    translation: 'садиться',
  },
  {
    term: 'sit out',
    translation: 'пропускать (часть игры, урока и т.п.)',
  },
  {
    term: 'sort out',
    translation: 'приводить в порядок; разбираться с чем-то',
  },
  {
    term: 'speak out',
    translation: 'открыто высказываться',
  },
  {
    term: 'stand by',
    translation: 'поддерживать кого-то; оставаться в стороне, не вмешиваться',
  },
  {
    term: 'stand for',
    translation: 'означать; терпеть, мириться',
  },
  {
    term: 'stand in',
    translation: 'заменять кого-то',
  },
  {
    term: 'stand out',
    translation: 'выделяться, бросаться в глаза',
  },
  {
    term: 'stand up',
    translation: 'вставать; выполнять обещание',
  },
  {
    term: 'stand up for',
    translation: 'защищать кого-то, отстаивать чьи-либо права',
  },
  {
    term: 'stay away',
    translation: 'держаться подальше, избегать',
  },
  {
    term: 'stay behind',
    translation: 'оставаться позади; отставать',
  },
  {
    term: 'stay in',
    translation: 'оставаться дома; не выходить на улицу',
  },
  {
    term: 'stay on',
    translation: 'продолжать работать, учиться и т.п.; оставаться включенным',
  },
  {
    term: 'stay up',
    translation: 'не ложиться спать; бодрствовать',
  },
  {
    term: 'strike back',
    translation: 'давать сдачи',
  },
  {
    term: 'strike out',
    translation: 'вычеркивать; отправляться в путь',
  },
  {
    term: 'switch off',
    translation: 'выключать; отвлекаться',
  },
  {
    term: 'switch on',
    translation: 'включать',
  },
  {
    term: 'take after',
    translation: 'походить на кого-то',
  },
  {
    term: 'take away',
    translation: 'забирать, уносить; ухудшать',
  },
  {
    term: 'take back',
    translation: 'возвращать; брать свои слова обратно',
  },
  {
    term: 'take down',
    translation: 'снимать; записывать',
  },
  {
    term: 'take in',
    translation: 'впускать; понимать',
  },
  {
    term: 'take off',
    translation: 'взлетать; снимать одежду; становиться успешным',
  },
  {
    term: 'take on',
    translation: 'брать на себя (обязанность); нанимать на работу',
  },
  {
    term: 'take out',
    translation: 'выносить, выводить; убивать; брать кредит',
  },
  {
    term: 'talk back',
    translation: 'перечить, огрызаться',
  },
  {
    term: 'talk over',
    translation: 'обсуждать',
  },
  {
    term: 'tell off',
    translation: 'отчитывать, ругать',
  },
  {
    term: 'think back',
    translation: 'вспоминать',
  },
  {
    term: 'think over',
    translation: 'обдумывать',
  },
  {
    term: 'throw away',
    translation: 'выбрасывать',
  },
  {
    term: 'throw out',
    translation: 'выгонять; избавляться от чего-то ненужного',
  },
  {
    term: 'tick off',
    translation: 'ставить галочку; раздражать',
  },
  {
    term: 'tidy up',
    translation: 'убираться',
  },
  {
    term: 'tie down',
    translation: 'привязывать; ограничивать свободу',
  },
  {
    term: 'tie up',
    translation: 'привязывать; блокировать',
  },
  {
    term: 'turn away',
    translation: 'отказывать; отворачиваться',
  },
  {
    term: 'turn back',
    translation: 'возвращаться',
  },
  {
    term: 'turn down',
    translation: 'отклонять предложение; уменьшать громкость',
  },
  {
    term: 'turn in',
    translation: 'сдавать (работу); ложиться спать',
  },
  {
    term: 'turn off',
    translation: 'выключать; сворачивать с дороги',
  },
  {
    term: 'turn on',
    translation: 'включать; настраивать против кого-то',
  },
  {
    term: 'turn out',
    translation: 'оказаться, выйти; присутствовать (на мероприятии)',
  },
  {
    term: 'turn over',
    translation: 'переворачивать; передавать управление',
  },
  {
    term: 'turn round/around',
    translation: 'поворачиваться; делать что-то быстро',
  },
  {
    term: 'turn up',
    translation: 'появляться; увеличивать громкость',
  },
  {
    term: 'type in',
    translation: 'вводить текст на компьютере',
  },
  {
    term: 'unwind',
    translation: 'расслабляться',
  },
];

export const irregularVerbs = [
  {
    term: 'abide, abode/abided, abode/abided',
    // infinitive: 'abide',
    // pastSimple: 'abode/abided',
    // pastParticiple: 'adobe/abided',
    translation: 'терпеть, выносить; придерживаться чего-либо, быть верным',
    explanation: '',
  },
  {
    term: 'arise, arose, arisen',
    translation: 'возникать, подниматься',
    explanation: '',
  },
  {
    term: 'awake, awaked/awoke, awaked/awoken',
    translation: 'будить, вызывать, просыпаться, понимать',
    explanation:
      'Существуют также правильные глаголы awaken (пробуждаться, будить) и waken (пробуждаться, будить), которые образуют формы прошедших времен по правилу (с помощью окончания -ed).',
  },
  {
    term: 'backslide, backslid, backslidden/backslid',
    translation: 'отступаться от веры, снова предаваться пороку',
    explanation: '',
  },
  {
    term: 'be, was/were, been',
    translation: 'быть, являться',
    explanation: '',
  },
  {
    term: 'bear, bore/beared, born/borne/beared',
    translation: 'нести, выносить, держать, питать чувство',
    explanation:
      'Форма beared используется, в основном, когда речь идет о финансовых делах.',
  },
  {
    term: 'beat, beat, beaten/beat',
    translation: 'бить, побеждать',
    explanation: 'Третья форма beat используется крайне редко.',
  },
  {
    term: 'become, became, become',
    translation: 'становиться, делаться',
    explanation: '',
  },
  {
    term: 'befall, befell, befallen',
    translation: 'случаться, приключаться',
    explanation: '',
  },
  {
    term: 'begin, began, begun',
    translation: 'начинать',
    explanation: '',
  },
  {
    term: 'behold, beheld, beheld',
    translation: 'увидеть, заметить, созерцать, наблюдать',
    explanation: '',
  },
  {
    term: 'bend, bent, bent',
    translation: 'гнуть, сгибать',
    explanation: '',
  },
  {
    term: 'bereave, bereft/bereaved, bereft/bereaved',
    translation: 'лишать, отнимать, отбирать',
    explanation: '',
  },
  {
    term: 'beseech, besought/beseeched, besought/beseeched',
    translation: 'умолять, просить, упрашивать',
    explanation: '',
  },
  {
    term: 'beset, beset, beset',
    translation: 'окружать, осаждать, преграждать',
    explanation: '',
  },
  {
    term: 'bet, bet/betted, bet/betted',
    translation: 'держать пари, быть уверенным',
    explanation: '',
  },
  {
    term: 'bid, bid/bade, bidden',
    translation: 'приглашать, приветствовать, прощаться',
    explanation:
      'Вторая и третья формы betted чаще встречаются в современном британском варианте английского языка, однако, bet считается более употребимой и желательной как в британском, так и в американском варианте английкого языка.',
  },
  {
    term: 'bid, bid, bid',
    translation: 'предлагать цену, велеть, просить',
    explanation: '',
  },
  {
    term: 'bide, bode/bided, bided',
    translation: 'ждать, выжидать, оставаться, находиться',
    explanation: '',
  },
  {
    term: 'bind, bound, bound',
    translation: 'связывать',
    explanation: '',
  },
  {
    term: 'bite, bit, bitten',
    translation: 'кусать, клевать, жалить',
    explanation: '',
  },
  {
    term: 'bleed, bled, bled',
    translation: 'кровоточить, истекать кровью',
    explanation: '',
  },
  {
    term: 'bless, blessed/blest, blessed/blest',
    translation: 'благословлять, одаривать, перекрестить',
    explanation: '',
  },
  {
    term: 'blow, blew, blown',
    translation: 'дуть, веять, задувать, выдувать, взрывать',
    explanation: '',
  },
  {
    term: 'break, broke, broken',
    translation: 'ломать, прерывать, разбивать',
    explanation: '',
  },
  {
    term: 'breed, bred, bred',
    translation: 'выводить, вскармливать, размножаться, порождать',
    explanation: '',
  },
  {
    term: 'bring, brought, brought',
    translation: 'приносить, приводить, доводить',
    explanation: '',
  },
  {
    term: 'broadcast, broadcast/broadcasted, broadcast/broadcasted',
    translation: 'вещать, распространять, передавать по радио',
    explanation: '',
  },
  {
    term: 'build, built, built',
    translation: 'строить, сооружать',
    explanation: '',
  },
  {
    term: 'burn, burned/burnt, burned/burnt',
    translation: 'гореть, сжигать',
    explanation:
      'Формы burnt являются формами британского варианта английского языка. Однако в современном английском эти формы постепенно ищезают.',
  },
  {
    term: 'burst, burst, burst',
    translation: 'лопаться, взрываться, быть переполненным, появиться',
    explanation: '',
  },
  {
    term: 'bust, busted/bust, busted/bust',
    translation: 'сломать, разрушать, разориться, бить',
    explanation: '',
  },
  {
    term: 'buy, bought, bought',
    translation: 'покупать',
    explanation: '',
  },
  {
    term: 'cast, cast, cast',
    translation: 'бросать, отбрасывать, уволить, отливать (метал)',
    explanation: '',
  },
  {
    term: 'catch, caught, caught',
    translation: 'поймать, ловить, догнать',
    explanation: '',
  },
  {
    term: 'chide, chided/chid, chided/chid/chidden',
    translation: 'распекать, ругать, бранить, реветь',
    explanation: '',
  },
  {
    term: 'choose, chose, chosen',
    translation: 'выбирать',
    explanation: '',
  },
  {
    term: 'cleave, cleft/clove, cleft/cloven',
    translation: 'раскалывать, рассекать',
    explanation: '',
  },
  {
    term: 'cling, clung, clung',
    translation: 'цепляться, держаться, липнуть',
    explanation: '',
  },
  {
    term: 'clothe, clothed/clad, clothed/clad',
    translation: 'одеть, одевать, выражать, одарять',
    explanation:
      'Форма clad чаще используется в виде причастия clad (одетый в) – clad in protecting clothing (одетый в защитную одежду), towel clad (в одном полотенце).',
  },
  {
    term: 'come, came, come',
    translation: 'приходить',
    explanation: '',
  },
  {
    term: 'cost, cost, cost',
    translation: 'оценивать, стоить',
    explanation: '',
  },
  {
    term: 'creep, crept, crept',
    translation: 'ползать, красться, охватывать, наводить ужас',
    explanation: '',
  },
  {
    term: 'crossbreed, crossbred, crossbred',
    translation: 'скрещивать',
    explanation: '',
  },
  {
    term: 'cut, cut, cut',
    translation: 'резать, обрезать',
    explanation: '',
  },
  {
    term: 'dare, durst, dared',
    translation: 'сметь, бросать вызов, рисковать',
    explanation: '',
  },
  {
    term: 'daydream, daydreamed/daydreamt, daydreamed/daydreamt',
    translation: 'грезить наяву, мечтать, фантазировать',
    explanation:
      'Формы daydreamt считаются более правильными, однако в современном английском формы daydreamed встречаются чаще.',
  },
  {
    term: 'deal, dealt, dealt',
    translation: 'иметь дело, торговать, рассматривать вопрос',
    explanation: '',
  },
  {
    term: 'dig, dug, dug',
    translation: 'копать, рыть, искать',
    explanation: '',
  },
  {
    term: 'disprove, disproved, disproved/disproven',
    translation: 'опровергать, доказывать ложность',
    explanation: '',
  },
  {
    term: 'dive, dove/dived, dived',
    translation: 'нырять, прыгать вниз, окунаться',
    explanation: '',
  },
  {
    term: 'do, did, done',
    translation: 'делать, выполнять',
    explanation: '',
  },
  {
    term: 'draw, drew, drawn',
    translation: 'чертить, рисовать, представлять; тащить, тянуть',
    explanation: '',
  },
  {
    term: 'dream, dreamed/dreamt, dreamed/dreamt',
    translation: 'видеть сны, мечтать',
    explanation:
      'Формы dreamt считаются более правильными, однако в современном английском формы dreamed встречаются чаще.',
  },
  {
    term: 'drink, drank, drunk',
    translation: 'пить, выпивать',
    explanation: '',
  },
  {
    term: 'drive, drove, driven',
    translation: 'водить (машину), управлять, ездить',
    explanation: '',
  },
  {
    term: 'dwell, dwelt/dwelled, dwelt/dwelled',
    translation: 'жить, обитать, пребывать, останавливаться',
    explanation:
      'Формы dreamt считаются более правильными, однако в современном английском формы dreamed встречаются чаще.',
  },
  {
    term: 'eat, ate, eaten',
    translation: 'есть, принимать пищу, кушать',
    explanation: '',
  },
  {
    term: 'fall, fell, fallen',
    translation: 'падать, опадать, опускаться',
    explanation: '',
  },
  {
    term: 'feed, fed, fed',
    translation: 'кормить',
    explanation: '',
  },
  {
    term: 'feel, felt, felt',
    translation: 'чувствовать',
    explanation: '',
  },
  {
    term: 'fight, fought, fought',
    translation: 'бороться, сражаться',
    explanation: '',
  },
  {
    term: 'find, found, found',
    translation: 'находить, обнаруживать',
    explanation: '',
  },
  {
    term: 'fit, fitted/fit, fitted/fit',
    translation: 'подгонять, прилаживать, приспосабливать, оснащать',
    explanation:
      'Для глагола to fit в значении «подгонять по размеру» чаще используется формы fitted.',
  },
  {
    term: 'flee, fled, fled',
    translation: 'бежать, спасаться бегством',
    explanation: '',
  },
  {
    term: 'fling, flung, flung',
    translation: 'кидать, бросать',
    explanation: '',
  },
  {
    term: 'fly, flew, flown',
    translation: 'летать, пролетать',
    explanation: '',
  },
  {
    term: 'forbear, forbore, forborne',
    translation: 'сдерживаться, воздерживаться, быть выдержанным',
    explanation: '',
  },
  {
    term: 'forbid, forbade, forbidden',
    translation: 'запрещать',
    explanation: '',
  },
  {
    term: 'forecast, forecast, forecast',
    translation: 'прогнозировать, предсказывать',
    explanation: '',
  },
  {
    term: 'forego, forewent, foregone',
    translation: 'предшествовать, идти впереди',
    explanation: '',
  },
  {
    term: 'foresee, foresaw, foreseen',
    translation: 'предвидеть, предугадывать',
    explanation: '',
  },
  {
    term: 'foretell, foretold, foretold',
    translation: 'предсказывать, прогнозировать',
    explanation: '',
  },
  {
    term: 'forget, forgot, forgotten/forgot',
    translation: 'забывать',
    explanation:
      'Форма forgotten более употребима как в британском, так и в американском варианте английского языка.',
  },
  {
    term: 'forgive, forgave, forgiven',
    translation: 'прощать, забыть (долг)',
    explanation: '',
  },
  {
    term: 'forgo, forwent, forgone',
    translation: 'отказываться, воздерживаться',
    explanation: '',
  },
  {
    term: 'forsake, forsook, forsaken',
    translation: 'бросать, оставлять, отказываться',
    explanation: '',
  },
  {
    term: 'forswear, forswore, forsworn',
    translation: 'отказываться, отрекаться',
    explanation: '',
  },
  {
    term: 'freeze, froze, frozen',
    translation: 'замерзать, замораживать',
    explanation: '',
  },
  {
    term: 'frostbite, frostbit, frostbitten',
    translation: 'обморозить, отморозить',
    explanation: '',
  },
  {
    term: 'get, got, gotten/got',
    translation: 'получать, становиться',
    explanation:
      'Форма gotten более употребима как в британском, так и в американском варианте английского языка. Однако got используется в обороте to have got (иметь, получать).',
  },
  {
    term: 'gild, gilded/gilt, gilded/gilt',
    translation: 'золотить, покрывать позолотой, украшать',
    explanation: '',
  },
  {
    term: 'give, gave, given',
    translation: 'давать',
    explanation: '',
  },
  {
    term: 'go, went, gone',
    translation: 'идти, ехать',
    explanation: '',
  },
  {
    term: 'grind, ground, ground',
    translation: 'молоть, растереть, шлифовать, точить',
    explanation: '',
  },
  {
    term: 'grow, grew, grown',
    translation: 'расти, выращивать',
    explanation: '',
  },
  {
    term: 'hand-feed, hand-fed, hand-fed',
    translation: 'подавать вручную',
    explanation: '',
  },
  {
    term: 'handwrite, handwrote, handwritten',
    translation: 'писать вручную',
    explanation: '',
  },
  {
    term: 'hang, hung, hung',
    translation: 'висеть, вешать',
    explanation: '',
  },
  {
    term: 'have, had, had',
    translation: 'иметь, обладать',
    explanation: '',
  },
  {
    term: 'hear, heard, heard',
    translation: 'слышать, слушать',
    explanation: '',
  },
  {
    term: 'heave, heaved/hove, heaved/hove',
    translation: 'поднимать, перемещать, вздыматься, напрягаться',
    explanation:
      'Форма hove часто используется как форма прошедшего времени от heave в значении "поворачиваться, менять местоположение" (о судне).',
  },
  {
    term: 'hew, hewed, hewn/hewed',
    translation: 'рубить, тесать, отбывать, согласовываться',
    explanation: '',
  },
  {
    term: 'hide, hid, hidden',
    translation: 'прятать, прятаться',
    explanation: '',
  },
  {
    term: 'hit, hit, hit',
    translation: 'ударять, поражать',
    explanation: '',
  },
  {
    term: 'hold, held, held',
    translation: 'занимать, держать, удерживать',
    explanation: '',
  },
  {
    term: 'hurt, hurt, hurt',
    translation: 'повредить, причинять боль, ранить',
    explanation: '',
  },
  {
    term: 'inbreed, inbred, inbred',
    translation: 'взращивать, воспитывать что-то в ком-то',
    explanation: '',
  },
  {
    term: 'inlay, inlaid, inlaid',
    translation: 'инкрустировать, делать вставку',
    explanation: '',
  },
  {
    term: 'input, input/inputted, input/inputted',
    translation: 'ввести, вводить, вкладывать (деньги)',
    explanation: '',
  },
  {
    term: 'interbreed, interbred, interbred',
    translation: 'скрещивать, скрещиваться',
    explanation: '',
  },
  {
    term: 'interweave, interwove/interweaved, interwoven/interweaved',
    translation: 'сплетать, переплетать, смешивать, воткать',
    explanation: '',
  },
  {
    term: 'interwind, interwound, interwound',
    translation: 'переплетать, перематывать',
    explanation: '',
  },
  {
    term: 'jerry-build, jerry-built, jerry-built',
    translation: 'построить на скорую руку, кое-как',
    explanation: '',
  },
  {
    term: 'keep, kept, kept',
    translation: 'держать, сохранять, хранить',
    explanation: '',
  },
  {
    term: 'kneel, knelt/kneeled, knelt/kneeled',
    translation: 'становиться на колени',
    explanation: '',
  },
  {
    term: 'knit, knitted/knit, knitted/knit',
    translation: 'вязать, штопать',
    explanation: '',
  },
  {
    term: 'know, knew, known',
    translation: 'знать, уметь, быть знакомым',
    explanation: '',
  },
  {
    term: 'lay, laid, laid',
    translation: 'класть, валить, накрывать',
    explanation: '',
  },
  {
    term: 'lead, led, led',
    translation: 'вести, сопровождать',
    explanation: '',
  },
  {
    term: 'lean, leaned/leant, leaned/leant',
    translation: 'опираться, наклоняться, прислоняться',
    explanation:
      'Обе формы leaned и leant считаются правильными, однако форма leaned встречается чаще в современном английском.',
  },
  {
    term: 'leap, leaped/leapt, leaped/leapt',
    translation: 'прыгать, скакать',
    explanation: 'Обе формы leaped и leapt используются одинаково часто. ',
  },
  {
    term: 'learn, learned/learnt, learned/learnt',
    translation: 'учиться, узнавать',
    explanation:
      'Обе формы learned и learnt считаются правильными, однако форма learned встречается чаще в современном анлийском.',
  },
  {
    term: 'leave, left, left',
    translation: 'оставлять, уезжать',
    explanation: '',
  },
  {
    term: 'lend, lent, lent',
    translation: 'одалживать, давать взаймы, занимать',
    explanation: '',
  },
  {
    term: 'let, let, let',
    translation: 'позволять, допускать, выпускать, проливать',
    explanation: '',
  },
  {
    term: 'lie, lay, lain',
    translation: 'лежать, распологаться, находиться',
    explanation:
      'Глагол lie в значении «врать», «лгать» является правильным глаголом, поэтому образует формы прошедшего времени с помощью окончания -ed.',
  },
  {
    term: 'light, lit/lighted, lit/lighted',
    translation: 'натолкнуться, обрушиться, освещать, зажигать, светиться',
    explanation: '',
  },
  {
    term: 'lip-read, lip-read, lip-read',
    translation: 'читать с губ, понимать по губам',
    explanation: '',
  },
  {
    term: 'lose, lost, lost',
    translation: 'терять, утрачивать, избавляться, пропадать',
    explanation: '',
  },
  {
    term: 'make, made, made',
    translation: 'делать, производить, совершать',
    explanation: '',
  },
  {
    term: 'mean, meant, meant',
    translation: 'значить, подразумевать',
    explanation: '',
  },
  {
    term: 'meet, met, met',
    translation: 'встречать, знакомиться',
    explanation: '',
  },
  {
    term: 'miscast, miscast, miscast',
    translation: 'неправильно распределять роли',
    explanation: '',
  },
  {
    term: 'misdeal, misdealt, misdealt',
    translation: 'ошибаться при сдаче',
    explanation: '',
  },
  {
    term: 'misdo, misdid, misdone',
    translation: 'делать неправильно, небрежно',
    explanation: '',
  },
  {
    term: 'mishear, misheard, misheard',
    translation: 'ослышаться, не расслышать',
    explanation: '',
  },
  {
    term: 'mislay, mislaid, mislaid',
    translation: 'положить не на место, затерять',
    explanation: '',
  },
  {
    term: 'mislead, misled, misled',
    translation: 'вводить в заблуждение, сбивать с пути',
    explanation: '',
  },
  {
    term: 'mislearn, mislearned/mislearnt, mislearned/mislearnt',
    translation: 'обучаться, учить неправильно',
    explanation:
      'Обе формы mislearned и mislearnt считаются правильными, однако форма mislearned встречается чаще в современном английском.',
  },
  {
    term: 'misread, misread, misread',
    translation: 'прочитать неправильно, неправильно понять',
    explanation: '',
  },
  {
    term: 'missay, missaid, missaid',
    translation: 'оговориться, сказать неправильно',
    explanation: '',
  },
  {
    term: 'misset, misset, misset',
    translation: 'неправильно установить',
    explanation: '',
  },
  {
    term: 'misspeak, misspoke, misspoken',
    translation: 'говорить, произносить неправильно',
    explanation: '',
  },
  {
    term: 'misspell, misspelled/misspelt, misspelled/misspelt',
    translation: 'писать с ошибками, делать орфографические ошибки',
    explanation:
      'Формы spelled и spelt считаются одинаково правильными, однако форма spelled встречается чаще в современном анлийском.',
  },
  {
    term: 'misspend, misspent, misspent',
    translation: 'неразумно тратить, транжирить',
    explanation: '',
  },
  {
    term: 'misswear, misswore, missworn',
    translation: 'давать ложную клятву',
    explanation: '',
  },
  {
    term: 'mistake, mistook, mistaken',
    translation: 'ошибаться, заблуждаться',
    explanation: '',
  },
  {
    term: 'misteach, mistaught, mistaught',
    translation: 'неправильно обучать',
    explanation: '',
  },
  {
    term: 'misunderstand, misunderstood, misunderstood',
    translation: 'не понимать, понять неправильно',
    explanation: '',
  },
  {
    term: 'miswrite, miswrote, miswritten',
    translation: 'неправильно писать',
    explanation: '',
  },
  {
    term: 'mow, mowed, mowed/mown',
    translation: 'косить, стричь (газон), жать',
    explanation: '',
  },
  {
    term: 'offset, offset, offset',
    translation: 'возмещать, компенсировать, ответвляться',
    explanation: '',
  },
  {
    term: 'outbid, outbid, outbid',
    translation: 'перебивать цену, превзойти, затмить',
    explanation: '',
  },
  {
    term: 'outdo, outdid, outdone',
    translation: 'превзойти, поражать, побороть',
    explanation: '',
  },
  {
    term: 'outdraw, outdrew, outdrawn',
    translation: 'добиться большей популярности, превзойти конкурентов',
    explanation: '',
  },
  {
    term: 'outdrink, outdrank, outdrunk',
    translation: 'перепить (кого-то), выпить больше, чем кто-то',
    explanation: '',
  },
  {
    term: 'outdrive, outdrove, outdriven',
    translation: 'обогнать, опередить',
    explanation: '',
  },
  {
    term: 'outfight, outfought, outfought',
    translation: 'иметь перевес над противником, побеждать',
    explanation: '',
  },
  {
    term: 'outfly, outflew, outflown',
    translation: 'вылетать, летать быстрее, дальше (чем кто-либо)',
    explanation: '',
  },
  {
    term: 'outgrow, outgrew, outgrown',
    translation: 'опережать в росте, перерастать, избавляться с возрастом',
    explanation: '',
  },
  {
    term: 'outleap, outleaped/outleapt, outleaped/outleapt',
    translation: 'перепрыгивать, выпрыгивать, прыгать лучше',
    explanation:
      'Обе формы outleaped и outleapt используются одинаково часто. ',
  },
  {
    term: 'outlie, outlay, outlain',
    translation: 'находиться снаружи, вне, простираться',
    explanation:
      'Глагол outlie в значении «превосходить во лжи» является правильным глаголом, поэтому образует формы прошедшего времени с помощью окончания -ed.',
  },
  {
    term: 'outrun, outran, outrun',
    translation: 'перегонять, опережать, убежать, сбежать',
    explanation: '',
  },
  {
    term: 'outsell, outsold, outsold',
    translation: 'продавать, продаваться лучше, превосходить в цене',
    explanation: '',
  },
  {
    term: 'outshine, outshined/outshone, outshined/outshone',
    translation: 'затмить',
    explanation:
      'Форма outshined чаще встречается в разговорном английском, тогда как outshone используется в литературном английском. ',
  },
  {
    term: 'outshoot, outshot, outshot',
    translation: 'стрелять лучше, отбрасывать, выбрасывать',
    explanation: '',
  },
  {
    term: 'outsing, outsang, outsung',
    translation: 'превзойти в пении',
    explanation: '',
  },
  {
    term: 'outsit, outsat, outsat',
    translation: 'пересидеть, засидеться',
    explanation: '',
  },
  {
    term: 'outsleep, outslept, outslept',
    translation: 'проспать, прозевать',
    explanation: '',
  },
  {
    term: 'outsmell, outsmelled/outsmelt, outsmelled/outsmelt',
    translation: 'пахнуть сильнее, чем что-то',
    explanation:
      'Формы outsmelled и outsmelt считаются одинаково правильными, однако форма outsmelled встречается чаще в современном английском',
  },
  {
    term: 'outspeak, outspoke, outspoken',
    translation: 'говорить лучше, высказаться, заявить',
    explanation: '',
  },
  {
    term: 'outspeed, outspeeded/outspeeded, outspeeded/outspeeded',
    translation: 'перегонять, быть, действовать быстрее',
    explanation: '',
  },
  {
    term: 'outspend, outspent, outspent',
    translation: 'превзойти по расходам, тратить больше',
    explanation: '',
  },
  {
    term: 'outstand, outstood, outstood',
    translation: 'выделяться, бросаться в глаза, выдержать',
    explanation: '',
  },
  {
    term: 'outswear, outswore, outworn',
    translation: 'превосходить в ругани',
    explanation: '',
  },
  {
    term: 'outswim, outswam, outswum',
    translation: 'превосходить в плавании',
    explanation: '',
  },
  {
    term: 'outthink, outthought, outthought',
    translation: 'превосходить разумом, перехитрить',
    explanation: '',
  },
  {
    term: 'outthrow, outthrew, outthrown',
    translation: 'выбрасывать, извергать, бросать лучше',
    explanation: '',
  },
  {
    term: 'outwear, outwore, worn',
    translation: 'изнашивать, служить дольше остальных вещей',
    explanation: '',
  },
  {
    term: 'outwrite, outwrote, outwritten',
    translation: 'писать лучше',
    explanation: '',
  },
  {
    term: 'overbid, overbid, overbid',
    translation: 'перебивать цену, взятку',
    explanation: '',
  },
  {
    term: 'overbreed, overbred, overbred',
    translation: 'разводить, выращивать животных в чрезмерном количестве',
    explanation: '',
  },
  {
    term: 'overbuild, overbuilt, overbuilt',
    translation: 'чрезмерно застраивать, надстраивать',
    explanation: '',
  },
  {
    term: 'overbuy, overbought, overbought',
    translation: 'покупать слишком много, слишком дорого',
    explanation: '',
  },
  {
    term: 'overcome, overcame, overcome',
    translation: 'преодолеть, побороть',
    explanation: '',
  },
  {
    term: 'overdo, overdid, overdone',
    translation: 'перестараться, переборщить, утрировать, переутомляться',
    explanation: '',
  },
  {
    term: 'overdraw, overdrew, overdrawn',
    translation: 'превысить кредит, гиперболизировать',
    explanation: '',
  },
  {
    term: 'overdrink, overdrank, overdrunk',
    translation: 'перепить, слишком много пить',
    explanation: '',
  },
  {
    term: 'overeat, overate, overeaten',
    translation: 'переесть, есть слишком много',
    explanation: '',
  },
  {
    term: 'overfeed, overfed, overfed',
    translation: 'перекармливать, объедаться',
    explanation: '',
  },
  {
    term: 'overfly, overflew, overflown',
    translation: 'перелетать, пролетать над чем-то',
    explanation: '',
  },
  {
    term: 'overhang, overhung, overhung',
    translation: 'выступать, нависать, угрожать, вешать драпировку',
    explanation: '',
  },
  {
    term: 'overhear, overheard, overheard',
    translation: 'подслушивать, нечаянно услышать',
    explanation: '',
  },
  {
    term: 'overlay, overlaid, overlaid',
    translation: 'покрывать, перекрывать, оказывать влияние',
    explanation: '',
  },
  {
    term: 'overlie, overlay, overlain',
    translation: 'лежать, залегать над чем-то, перекрывать',
    explanation: '',
  },
  {
    term: 'overpay, overpaid, overpaid',
    translation: 'переплачивать, возмещать с избытком',
    explanation: '',
  },
  {
    term: 'override, overrode, overridden',
    translation: 'отменять, перевешивать, преобладать, переехать',
    explanation: '',
  },
  {
    term: 'overrun, overran, overrun',
    translation: 'переходить пределы, захватывать, заполонять',
    explanation: '',
  },
  {
    term: 'oversee, oversaw, overseen',
    translation: 'наблюдать, надзирать, следить, подсмотреть',
    explanation: '',
  },
  {
    term: 'oversell, oversold, oversold',
    translation:
      'перехваливать, навязывать продукцию, продать больше своих запасов',
    explanation: '',
  },
  {
    term: 'overset, overset, overset',
    translation: 'нарушать порядок, расстраивать, опрокидываться',
    explanation: '',
  },
  {
    term: 'oversew, oversewed, oversewn/oversewed',
    translation: 'сшивать через край',
    explanation: '',
  },
  {
    term: 'overshoot, overshot, overshot',
    translation: 'промахнуться, перейти границы, стрелять до изнеможения',
    explanation: '',
  },
  {
    term: 'oversleep, overslept, overslept',
    translation: 'проспать, заспаться',
    explanation: '',
  },
  {
    term: 'overspeak, overspoke, overspoken',
    translation: 'слишком много разговаривать',
    explanation: '',
  },
  {
    term: 'overspend, overspent, overspent',
    translation: 'сорить деньгами, расстраивать свое здоровье',
    explanation: '',
  },
  {
    term: 'overspill, overspilled/overspilt, overspilled/overspilt',
    translation: 'проливать, переполнять, перенаселять',
    explanation:
      'Формы overspilled и overspilt считаются одинаково правильными, однако форма overspilled встречается чаще в современном английском.',
  },
  {
    term: 'overtake, overtook, overtaken',
    translation: 'догнать, настигать, овладевать, обогнать',
    explanation: '',
  },
  {
    term: 'overthink, overthought, overthought',
    translation: 'надумать лишнего, слишком много думать',
    explanation: '',
  },
  {
    term: 'overthrow, overthrew, overthrown',
    translation: 'бросать слишком далеко, свергать, разрушать',
    explanation: '',
  },
  {
    term: 'overwind, overwound, overwound',
    translation: 'перекрутить, крутить слишком сильно, быстро',
    explanation: '',
  },
  {
    term: 'overwrite, overwrote, overwritten',
    translation: 'переписывать, писать поверх текста, много писать',
    explanation: '',
  },
  {
    term: 'partake, partook, partaken',
    translation: 'принимать участие, разделять, отведать, воспользоваться',
    explanation: '',
  },
  {
    term: 'pay, paid, paid',
    translation: 'платить, вознаграждать, отомстить',
    explanation: '',
  },
  {
    term: 'plead, pleaded/pled, pleaded/pled',
    translation: 'защищать подсудимого, ходатайствовать, простить',
    explanation: '',
  },
  {
    term: 'prebuild, prebuilt, prebuilt',
    translation: 'предварительно собрать, выстроить',
    explanation: '',
  },
  {
    term: 'predo, predid, predone',
    translation: 'сделать заранее, подготовить',
    explanation: '',
  },
  {
    term: 'premake, premade, premade',
    translation: 'подготовить, сделать наперед, заранее',
    explanation: '',
  },
  {
    term: 'prepay, prepaid, prepaid',
    translation: 'предоплачивать, платить наперед',
    explanation: '',
  },
  {
    term: 'presell, presold, preset, prespresetold',
    translation:
      'рекламировать товар, организовать предпродажу, продавать наперед',
    explanation: '',
  },
  {
    term: 'preshrink, preshrank, preshrunk',
    translation: 'обрабатывать ткань для предотвращения ее стяжки',
    explanation: '',
  },
  {
    term: 'proofread, proofread, proofread',
    translation: 'читать корректуру, корректировать, вычитывать',
    explanation: '',
  },
  {
    term: 'prove, proved, proven/proved',
    translation: 'доказывать, удостоверять',
    explanation: '',
  },
  {
    term: 'put, put, put',
    translation: 'класть, положить',
    explanation: '',
  },
  {
    term: 'quick-freeze, quick-froze, quick-frozen',
    translation: 'быстро замораживать, замерзать',
    explanation: '',
  },
  {
    term: 'quit, quit/quitted, quit/quitted',
    translation: 'оставлять, покидать, выходить',
    explanation:
      'Вторая и третья формы quitted чаще встречаются в современном британском варианте английского языка, однако, quit считается более употребимой и желательной как в британском, так и в американском варианте английского языка.',
  },
  {
    term: 'read, read [red], read [red]',
    translation: 'читать',
    explanation: '',
  },
  {
    term: 'reawake, reawoke, reawaken',
    translation: 'снова пробуждать',
    explanation: '',
  },
  {
    term: 'rebid, rebid, rebid',
    translation: 'делать повторную ставку',
    explanation: '',
  },
  {
    term: 'rebind, rebound, rebound',
    translation: 'переплетать заново (книгу)',
    explanation: '',
  },
  {
    term: 'rebroadcast, rebroadcast/rebroadcasted, rebroadcast/rebroadcasted',
    translation: 'ретранслировать, показывать (передачу) заново',
    explanation: '',
  },
  {
    term: 'rebuild, rebuilt, rebuilt',
    translation: 'перестраивать',
    explanation: '',
  },
  {
    term: 'recast, recast, recast',
    translation: 'переделывать, изменять, пересчитывать',
    explanation: '',
  },
  {
    term: 'recut, recut, recut',
    translation: 'вторично нарезать, повторно вырезать (сцены из фильма)',
    explanation: '',
  },
  {
    term: 'redeal, redealt, redealt',
    translation: 'перераздавать карты в игре',
    explanation: '',
  },
  {
    term: 'redo, redid, redone',
    translation: 'переделывать, делать ремонт',
    explanation: '',
  },
  {
    term: 'redraw, redrew, redrawn',
    translation:
      'перерисовывать, обновлять рисунок, выставлять обратный вексель',
    explanation: '',
  },
  {
    term: 'refit, refitted/refit, refitted/refit',
    translation: 'перекраивать, подгонять заново (по размеру)',
    explanation:
      'Для глагола to refit в значении «подгонять по размеру заново» чаще используется формы refitted.',
  },
  {
    term: 'regrind, reground, reground',
    translation: 'перешлифовывать, перетачивать, притирать',
    explanation: '',
  },
  {
    term: 'regrow, regrew, regrown',
    translation: 'отрастать снова',
    explanation: '',
  },
  {
    term: 'rehang, rehung, rehung',
    translation: 'перевешивать',
    explanation: '',
  },
  {
    term: 'rehear, reheard, reheard',
    translation: 'услышать снова, рассматривать дело повторно',
    explanation: '',
  },
  {
    term: 'reknit, reknitted/reknit, reknitted/reknit',
    translation: 'вязать заново, соединять заново',
    explanation: '',
  },
  {
    term: 'relay, relayed, relayed',
    translation: 'класть заново, заменять (черепицу, кафель)',
    explanation:
      'Глагол relay в значении «передавать, пересылать, пробегать» является правильным глаголом, поэтому образует формы прошедшего времени с помощью окончания -ed.',
  },
  {
    term: 'relearn, relearned/re learnt, relearned/re learnt',
    translation: 'учить снова, заново изучать',
    explanation:
      'Обе формы relearned и relearnt считаются правильными, однако форма relearned встречается чаще в современном английском.',
  },
  {
    term: 'relight, relit/relighted, relit/relighted',
    translation: 'зажечь, зажечься снова, загореться',
    explanation: '',
  },
  {
    term: 'remake, remade, remade',
    translation: 'переделывать, переснимать фильм',
    explanation: '',
  },
  {
    term: 'rematch, rematched, rematched',
    translation: 'проводить повторный матч, соревноваться снова',
    explanation: '',
  },
  {
    term: 'remind, reminded, reminded',
    translation: 'напоминать, заставить вспомнить',
    explanation: '',
  },
  {
    term: 'remodel, remodeled/remodelled, remodeled/remodelled',
    translation: 'переделывать, перестраивать',
    explanation: '',
  },
  {
    term: 'rend, rent/rended, rent/rended',
    translation: 'отрывать, раздирать, дробить, расщеплять',
    explanation:
      'Форма rended чаще используется в американском варианте английского языка.',
  },
  {
    term: 'repay, repaid, repaid',
    translation: 'возвращать долг, платить обратно',
    explanation: '',
  },
  {
    term: 'replace, replaced, replaced',
    translation: 'заменять, ставить на место',
    explanation: '',
  },
  {
    term: 'replant, replanted, replanted',
    translation: 'пересаживать растения',
    explanation: '',
  },
  {
    term: 'reply, replied, replied',
    translation: 'отвечать, возражать',
    explanation: '',
  },
  {
    term: 'report, reported, reported',
    translation: 'докладывать, сообщать, писать отчет',
    explanation: '',
  },
  {
    term: 'reprove, reproved, reproved',
    translation: 'порицать, делать выговор',
    explanation: '',
  },
  {
    term: 'reread, reread, reread',
    translation: 'перечитывать',
    explanation: '',
  },
  {
    term: 'rerun, reran, rerun',
    translation: 'перезапускать, повторно проводить, показывать',
    explanation: '',
  },
  {
    term: 'rerun, rerun, rerun',
    translation: 'повторять, показывать (фильм) снова',
    explanation: '',
  },
  {
    term: 'resell, resold, resold',
    translation: 'перепродавать',
    explanation: '',
  },
  {
    term: 'resend, resent, resent',
    translation: 'переотправлять, посылать заново',
    explanation: '',
  },
  {
    term: 'reset, reset, reset',
    translation: 'устанавливать снова, перезапускать',
    explanation: '',
  },
  {
    term: 'resew, resewed, resewn/resewed',
    translation: 'пришивать заново, перешивать',
    explanation: '',
  },
  {
    term: 'reshoot, reshot, reshot',
    translation: 'переснимать (фильм)',
    explanation: '',
  },
  {
    term: 'reside, resided, resided',
    translation: 'проживать, жить',
    explanation: '',
  },
  {
    term: 'resign, resigned, resigned',
    translation: 'покидать должность, уходить в отставку',
    explanation: '',
  },
  {
    term: 'resist, resisted, resisted',
    translation: 'сопротивляться, противостоять',
    explanation: '',
  },
  {
    term: 'restart, restarted, restarted',
    translation: 'перезапускать, начинать снова',
    explanation: '',
  },
  {
    term: 'retake, retook, retaken',
    translation: 'снова взять, переснимать, пересдавать (экзамен)',
    explanation: '',
  },
  {
    term: 'reteach, retaught, retaught',
    translation: 'переучивать, учить заново',
    explanation: '',
  },
  {
    term: 'retear, retote, retorn',
    translation: 'снова разрывать, отрывать',
    explanation: '',
  },
  {
    term: 'retell, retold, retold',
    translation: 'пересказывать',
    explanation: '',
  },
  {
    term: 'rethink, rethought, rethought',
    translation: 'передумать',
    explanation: '',
  },
  {
    term: 'retrace, retraced, retraced',
    translation: 'возвращаться по своим следам, прослеживать путь заново',
    explanation: '',
  },
  {
    term: 'retread, retread, retread',
    translation: 'сменить покрышку, переобучать, заново давать работу',
    explanation: '',
  },
  {
    term: 'retrofit, retrofitted/retrofit, retrofitted/retrofit',
    translation: 'модифицировать, подгонять, настраивать',
    explanation:
      'Для глагола to retrofit в значении «подгонять» чаще используется формы retrofitted.',
  },
  {
    term: 'retype, retyped, retyped',
    translation: 'перепечатывать',
    explanation: '',
  },
  {
    term: 'rewake, rewoke/rewaked, reawaken/rewaked',
    translation: 'будить, пробуждаться заново',
    explanation: '',
  },
  {
    term: 'rewear, re wore, reworn',
    translation: 'носить заново',
    explanation: '',
  },
  {
    term: 'reweave, rewove/reweaved, rewoven/reweaved',
    translation: 'переткать, плести, ткать заново, снова соединяться',
    explanation: '',
  },
  {
    term: 'rewed, rewed/rewedded, rewed/rewedded',
    translation: 'жениться во второй раз',
    explanation: '',
  },
  {
    term: 'rewet, rewet/rewetted, rewet/rewetted',
    translation: 'повторно увлажнять, мочить снова',
    explanation:
      'Вторая и третья формы rewetted чаще встречаются в современном британском варианте английского языка, однако, rewet считается более употребимой и желательной как в британском, так и в американском варианте английского языка.',
  },
  {
    term: 'rewin, rewon, rewon',
    translation: 'снова победить, победить после проигрыша',
    explanation: '',
  },
  {
    term: 'rewind, rewound, rewound',
    translation: 'перематывать (назад)',
    explanation: '',
  },
  {
    term: 'rewrite, rewrote, rewritten',
    translation: 'переписывать',
    explanation: '',
  },
  {
    term: 'rid, rid, rid',
    translation: 'освобождать, избавлять',
    explanation: '',
  },
  {
    term: 'ride, rode, ridden',
    translation: 'ехать верхом, кататься, ехать (в транспорте)',
    explanation: '',
  },
  {
    term: 'ring, rang, rung',
    translation: 'звонить, звенеть',
    explanation: '',
  },
  {
    term: 'rise, rose, risen',
    translation: 'подниматься, восходить',
    explanation: '',
  },
  {
    term: 'roughcast, roughcast, roughcast',
    translation: 'набрасывать план, намечать, грубо штукатурить',
    explanation: '',
  },
  {
    term: 'run, ran, run',
    translation: 'бежать, гнать, управлять, течь',
    explanation: '',
  },
  {
    term: 'sand-cast, sand-cast, sand-cast',
    translation: 'отливать металл в песчаную форму',
    explanation: '',
  },
  {
    term: 'saw, sawed, sawed/sawn',
    translation: 'пилить, распилить',
    explanation: '',
  },
  {
    term: 'say, said, said',
    translation: 'говорить, сказать',
    explanation: '',
  },
  {
    term: 'see, saw, seen',
    translation: 'видеть, смотреть',
    explanation: '',
  },
  {
    term: 'seek, sought, sought',
    translation: 'искать, добиваться',
    explanation: '',
  },
  {
    term: 'sell, sold, sold',
    translation: 'продавать',
    explanation: '',
  },
  {
    term: 'send, sent, sent',
    translation: 'посылать, отправлять',
    explanation: '',
  },
  {
    term: 'set, set, set',
    translation: 'помещать, ставить',
    explanation: '',
  },
  {
    term: 'sew, sewed, sewn/sewed',
    translation: 'шить, штопать',
    explanation: '',
  },
  {
    term: 'shake, shook, shaken',
    translation: 'трясти, встряхивать',
    explanation: '',
  },
  {
    term: 'shave, shaved, shaved/shaven',
    translation: 'бриться',
    explanation: '',
  },
  {
    term: 'shear, sheared, sheared/shorn',
    translation: 'резать, выстригать, рассекать',
    explanation: '',
  },
  {
    term: 'shed, shed, shed',
    translation: 'проливать, терять, сбрасывать',
    explanation: '',
  },
  {
    term: 'shine, shined/shone, shined/shone',
    translation: 'сиять, светить',
    explanation:
      'Форма shined чаще встречается в разговорном английском, тогда как shone используется в литературном английском. ',
  },
  {
    term: 'shit, shit/shat/shitted, shit/shat/shitted',
    translation: 'какать, гадить, срать',
    explanation: '',
  },
  {
    term: 'shoe, shod, shod',
    translation: 'обувать, подковывать, подбивать',
    explanation: '',
  },
  {
    term: 'shoot, shot, shot',
    translation: 'стрелять, охотиться',
    explanation: '',
  },
  {
    term: 'show, showed, shown/showed',
    translation: 'показывать, показываться, выставлять напоказ',
    explanation:
      'Третья форма глагола showed встречается в американском варианте английского языка.',
  },
  {
    term: 'shrink, shrank/shrunk, shrunk/shrunken',
    translation: 'уменьшать, уменьшаться, сжиматься, давать усадку',
    explanation: '',
  },
  {
    term: 'shut, shut, shut',
    translation: 'закрывать',
    explanation: '',
  },
  {
    term: 'sight-read, sight-read, sight-read',
    translation: 'играть, петь с листа, читать ноты, текст с листа',
    explanation: '',
  },
  {
    term: 'sing, sang, sung',
    translation: 'петь',
    explanation: '',
  },
  {
    term: 'sink, sank/sunk, sunk',
    translation: 'тонуть, опускаться, погружаться',
    explanation: '',
  },
  {
    term: 'sit, sat, sat',
    translation: 'сидеть, сажать, находиться',
    explanation: '',
  },
  {
    term: 'slay, slew/slayed, slain/slayed',
    translation: 'убивать, уничтожать',
    explanation:
      'Глагол slay в значении «потрясать, удивлять» является правильным глаголом, поэтому образует формы прошедшего времени с помощью окончания -ed.',
  },
  {
    term: 'sleep, slept, slept',
    translation: 'спать',
    explanation: '',
  },
  {
    term: 'slide, slid, slid',
    translation: 'скользить, ползать, кататься',
    explanation: '',
  },
  {
    term: 'sling, slung, slung',
    translation: 'швырять, вешать через плечо, подвешивать',
    explanation: '',
  },
  {
    term: 'slink, slinked/slunk, slinked/slunk',
    translation: 'красться, подкрадываться, рожать преждевременно',
    explanation: '',
  },
  {
    term: 'slit, slit, slit',
    translation: 'разрезать, перерезать',
    explanation: '',
  },
  {
    term: 'smell, smelled/smelt, smelled/smelt',
    translation: 'пахнуть, нюхать',
    explanation:
      'Обе формы smelled и smelt считаются одинаково правильными, однако форма smelled встречается чаще в современном английском.',
  },
  {
    term: 'smite, smote, smitten',
    translation: 'поражать, бить, наказывать',
    explanation: '',
  },
  {
    term: 'sneak, sneaked/snuck, sneaked/snuck',
    translation: 'красться, подкрадываться, красть, ускользать',
    explanation: '',
  },
  {
    term: 'sow, sowed, sown/sowed',
    translation: 'сеять, засевать, распространять',
    explanation: '',
  },
  {
    term: 'speak, spoke, spoken',
    translation: 'говорить',
    explanation: '',
  },
  {
    term: 'speed, sped/speeded, sped/speeded',
    translation: 'спешить, ускорять, торопить',
    explanation: '',
  },
  {
    term: 'spell, spelled/spelt, spelled/spelt',
    translation:
      'заколдовать; сменить, дать отдохнуть; писать, произносить слово по буквам',
    explanation: '',
  },
  {
    term: 'spend, spent, spent',
    translation: 'тратить, истощать',
    explanation: '',
  },
  {
    term: 'spill, spilled/spilt, spilled/spilt',
    translation: 'проливать, разливаться',
    explanation:
      'Формы spilled и spilt считаются одинаково правильными, однако форма spilled встречается чаще в современном английском.',
  },
  {
    term: 'spin, spun, spun',
    translation: 'прясть, крутить, вертеть, плести',
    explanation: '',
  },
  {
    term: 'spit, spit/spat, spit/spat',
    translation: 'плевать, пронзать, натыкать, моросить',
    explanation: '',
  },
  {
    term: 'spoil, spoiled/spoilt, spoiled/spoilt',
    translation: 'портить, баловать',
    explanation:
      'Обе формы spoiled и spoilt считаются одинаково правильными, однако форма spoiled встречается чаще в современном английском.',
  },
  {
    term: 'spread, spread, spread',
    translation: 'распространяться, расстилать',
    explanation: '',
  },
  {
    term: 'spring, sprang/sprung, sprung',
    translation: 'прыгать, вскочить',
    explanation: '',
  },
  {
    term: 'stand, stood, stood',
    translation: 'стоять, быть расположенным',
    explanation: '',
  },
  {
    term: 'stave, staved/stove, staved/stove',
    translation: 'проламывать, разбивать',
    explanation: '',
  },
  {
    term: 'steal, stole, stolen',
    translation: 'воровать, красть',
    explanation: '',
  },
  {
    term: 'stick, stuck, stuck',
    translation: 'втыкать, колоть, приклеивать, липнуть',
    explanation: '',
  },
  {
    term: 'sting, stung, stung',
    translation: 'жалить, причинять боль, обманывать',
    explanation: '',
  },
  {
    term: 'stink, stunk/stank, stunk',
    translation: 'вонять, пахнуть',
    explanation: '',
  },
  {
    term: 'strew, strewed, strewn/strewed',
    translation: 'усеять, разбрасывать, посыпать',
    explanation: '',
  },
  {
    term: 'stride, strode, stridden',
    translation: 'шагать, сидеть верхом',
    explanation: '',
  },
  {
    term: 'strike, struck, struck/stricken',
    translation: 'ударять, поражать, бастовать',
    explanation: '',
  },
  {
    term: 'string, strung, strung',
    translation: 'связывать, натягивать, нанизывать',
    explanation: '',
  },
  {
    term: 'strive, strove/strived, striven/strived',
    translation: 'стремиться, стараться, пытаться',
    explanation: '',
  },
  {
    term: 'sublet, sublet, sublet',
    translation: 'сдавать в поднаём',
    explanation: '',
  },
  {
    term: 'sunburn, sunburned/sunburnt, sunburned/sunburnt',
    translation: 'обгорать на солнце',
    explanation:
      'Формы sunburnt являются формами британского варианта английского языка. Однако в современном английском эти формы постепенно ищезают.',
  },
  {
    term: 'swear, swore, sworn',
    translation: 'клясться, присягать, ругаться',
    explanation: '',
  },
  {
    term: 'sweat, sweat/sweated, sweat/sweated',
    translation: 'потеть, сыреть, запотевать',
    explanation: '',
  },
  {
    term: 'sweep, swept, swept',
    translation: 'мести, прочищать, сметать, мчаться',
    explanation: '',
  },
  {
    term: 'swell, swelled, swollen/swelled',
    translation: 'пухнуть, раздуваться, набухать',
    explanation: '',
  },
  {
    term: 'swim, swam, swum',
    translation: 'плавать, плыть',
    explanation: '',
  },
  {
    term: 'swing, swung, swung',
    translation: 'качать, размахивать',
    explanation: '',
  },
  {
    term: 'take, took, taken',
    translation: 'брать, взять',
    explanation: '',
  },
  {
    term: 'teach, taught, taught',
    translation: 'обучать, учить',
    explanation: '',
  },
  {
    term: 'tear, tore, torn',
    translation: 'рвать, сорвать, разорвать',
    explanation: '',
  },
  {
    term: 'telecast, telecast, telecast',
    translation: 'передавать по телевидению',
    explanation: '',
  },
  {
    term: 'tell, told, told',
    translation: 'говорить, рассказывать, сообщать',
    explanation: '',
  },
  {
    term: 'test-drive, test-drove, test-driven',
    translation: 'делать пробную поездку, тестировать',
    explanation: '',
  },
  {
    term: 'test-fly, test-flew, test-flown',
    translation: 'испытывать самолет в воздухе',
    explanation: '',
  },
  {
    term: 'think, thought, thought',
    translation: 'думать, полагать',
    explanation: '',
  },
  {
    term: 'thrive, throve/thrived, thrived/thriven',
    translation: 'процветать, преуспевать, буйно расти',
    explanation: '',
  },
  {
    term: 'throw, threw, thrown',
    translation: 'кидать, бросать',
    explanation: '',
  },
  {
    term: 'thrust, thrust, thrust',
    translation: 'колоть, засовывать, толкать, лезть',
    explanation: '',
  },
  {
    term: 'tread, trod, trodden/trod',
    translation: 'идти, ступать, топтать, давить',
    explanation: '',
  },
  {
    term: 'typecast, typecast, typecast',
    translation: 'подбирать актеров по типажности',
    explanation: '',
  },
  {
    term: 'typeset, typeset, typeset',
    translation: 'набирать текст для печати, определять тип',
    explanation: '',
  },
  {
    term: 'typewrite, typewrote, typewritten',
    translation: 'печатать на пишущей машинке, набирать текст',
    explanation: '',
  },
  {
    term: 'unbend, unbent, unbent',
    translation: 'разгибаться, выпрямляться, смягчаться',
    explanation: '',
  },
  {
    term: 'unbind, unbound, unbound',
    translation: 'развязать, распускать, ослаблять',
    explanation: '',
  },
  {
    term: 'unclothe, unclothed/unclad, unclothed/unclad',
    translation: 'раздеваться, раздевать, обнажать',
    explanation: '',
  },
  {
    term: 'underbid, underbid, underbid',
    translation: 'перебивать цену, назначать более низкую цену',
    explanation:
      'Форма unclad чаще используется в виде причастия unclad (раздетый).',
  },
  {
    term: 'undercut, undercut, undercut',
    translation: 'подрезать, сбивать цены, делать подсечку',
    explanation: '',
  },
  {
    term: 'underfeed, underfed, underfed',
    translation: 'недокармливать, недоедать',
    explanation: '',
  },
  {
    term: 'undergo, underwent, undergone',
    translation: 'испытывать, переносить',
    explanation: '',
  },
  {
    term: 'underlie, underlay, underlain',
    translation: 'подчеркивать, выделять',
    explanation: '',
  },
  {
    term: 'undersell, undersold, undersold',
    translation: 'продавать дешевле других',
    explanation: '',
  },
  {
    term: 'underspend, underspent, underspent',
    translation: 'тратить недостаточно, очень мало',
    explanation: '',
  },
  {
    term: 'understand, understood, understood',
    translation: 'понимать, осознавать',
    explanation: '',
  },
  {
    term: 'undertake, undertook, undertaken',
    translation: 'предпринимать, гарантировать, совершать',
    explanation: '',
  },
  {
    term: 'underwrite, underwrote, underwritten',
    translation: 'подписывать, гарантировать, ручаться',
    explanation: '',
  },
  {
    term: 'undo, undid, undone',
    translation: 'расстегивать, уничтожать, отменять, разбирать',
    explanation: '',
  },
  {
    term: 'unfreeze, unfroze, unfrozen',
    translation: 'разморозить, размораживаться',
    explanation: '',
  },
  {
    term: 'unhang, unhung, unhung',
    translation: 'снимать (висящее)',
    explanation: '',
  },
  {
    term: 'unhide, unhid, unhidden',
    translation: 'показывать скрытые элементы',
    explanation: '',
  },
  {
    term: 'unknit, unknitted/unknit, unknitted/unknit',
    translation: 'распускать (вязанье), распутывать, разъединять',
    explanation: '',
  },
  {
    term: 'unlearn, unlearned/unlearnt, unlearned/unlearnt',
    translation: 'разучиться, забыть то, что знал',
    explanation:
      'Обе формы unlearned и unlearnt считаются правильными, однако форма unlearned встречается чаще в современном анлийс',
  },
  {
    term: 'unsew, unsewed, unsewn/unsewed',
    translation: 'распарывать сшитое',
    explanation: '',
  },
  {
    term: 'unsling, unslung, unslung',
    translation: 'отвязывать, снимать, освобождать от ремня',
    explanation: '',
  },
  {
    term: 'unspin, unspun, unspun',
    translation: 'распускать, расплетать, распутывать',
    explanation: '',
  },
  {
    term: 'unstick, unstuck, unstuck',
    translation: 'отдирать, отклеивать, взлетать (самолет)',
    explanation: '',
  },
  {
    term: 'unstring, unstrung, unstrung',
    translation: 'снимать, ослаблять, распускать, огорчать',
    explanation: '',
  },
  {
    term: 'unweave, unwove/unweaved, unwoven/unweaved',
    translation: 'распускать, расплетать (ткань)',
    explanation: '',
  },
  {
    term: 'unwind, unwound, unwound',
    translation: 'расматывать, раскручивать, развивать',
    explanation: '',
  },
  {
    term: 'uphold, upheld, upheld',
    translation: 'поддерживать, помогать, удерживать',
    explanation: '',
  },
  {
    term: 'upset, upset, upset',
    translation: 'опрокидывать, расстраивать, огорчать',
    explanation: '',
  },
  {
    term: 'wake, woke/waked, woken/waked',
    translation: 'будить, просыпаться',
    explanation: '',
  },
  {
    term: 'waylay, waylaid, waylaid',
    translation: 'подстерегать, устраивать засаду',
    explanation: '',
  },
  {
    term: 'wear, wore, worn',
    translation: 'носить (одежду)',
    explanation: '',
  },
  {
    term: 'weave, wove/weaved, woven/weaved',
    translation: 'ткать, плести',
    explanation: '',
  },
  {
    term: 'wed, wed/wedded, wed/wedded',
    translation: 'венчать, выдавать замуж, жениться, выходить замуж',
    explanation: '',
  },
  {
    term: 'weep, wept, wept',
    translation: 'плакать, тосковать, запотевать',
    explanation: '',
  },
  {
    term: 'wet, wet/wetted, wet/wetted',
    translation: 'мочить, промочить, мокнуть',
    explanation:
      'Вторая и третья формы wetted чаще встречаются в современном британском варианте английского языка, однако, wet считается более употребимой и желательной как в британском, так и в американском варианте английкого языка.',
  },
  {
    term: 'win, won, won',
    translation: 'выигрывать, побеждать',
    explanation: '',
  },
  {
    term: 'wind, wound, wound',
    translation: 'наматывать, заводить (механизм), извиваться, чуять, дуть',
    explanation: '',
  },
  {
    term: 'withdraw, withdrew, withdrawn',
    translation: 'брать назад, отнимать, отзывать, извлекать',
    explanation: '',
  },
  {
    term: 'withhold, withheld, withheld',
    translation: 'воздерживаться, удерживать, скрывать',
    explanation: '',
  },
  {
    term: 'withstand, withstood, withstood',
    translation: 'устоять, выдерживать, сопротивляться',
    explanation: '',
  },
  {
    term: 'wring, wrung, wrung',
    translation: 'крутить, терзать, выжимать, скручивать',
    explanation: '',
  },
  {
    term: 'write, wrote, written',
    translation: 'писать',
    explanation: '',
  },
];
