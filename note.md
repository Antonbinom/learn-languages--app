прыжки при фильтрации

Изменить структуру данных терминов.
training: {
inTraining: boolean,
sprint: boolean,
spelling: boolean,
quiz: boolean,
repaeat: boolean
}

При добавлении термина в тренировку изменять все значения c стренировками в объекте training на false, а inTraining на true и наоборот

Коллекции - добавлять всю коллекцию в тренировку. При добавлении коллецкии в тренировку изменяем объект training всех терминов в коллекции как указано выше.

Так же свойство training самой колекции становится true.

На странице trainings есть раздел words-colections, заходя в каждую коллекцию есть возможность тренировать sprint, spelling, quiz, repeat
Тоже сделать для sentences.

Создать коллекции для предложений.

Нужны ли колекции для irregular verbs и phrasal verbs?

Отсортировывать термины в тренировках по свойствам в объектах training
Во время прохождения тренировки изменять значение свойств в training
Если все свойства в training равны true, то изменяем значение isTraining на false

Тренировки irregular verbs
sprint - eng-rus
spelling - eng-rus

Добавление/редактрование irregular verb:
Важно что бы строка term собиралась из 3-х строковых значений
записанных через запятую или в виде массива
Возможно стоит валидировать инпуты, не позволять добавлять другие символы кроме букв в term и возможно в translation
То же касается words и phrasal verbs

Так же нужно продумать как отделять слова от знаков препинаний и рендерить инпуты для букы и цифр и знаки препинания.

Вероятно стоит пока отложить некоторые тренировки на потом, хорошо обдумать подход и решение проблем и приступить когда будут четкие решения

Сделать меню с языками на всю динну экрана на мобильных устройствах

Правая панель:

- переключение темы
- переключение локализации
- вкл/выкл таймер в тренировках. по дефолту вкл
- сохранить базу данных на телефон
- восстановить базу данных с телефона

Статистика обучения?

# Структура приложения:

Pages:
/words
/words/vocabulary
/words/collections
/words/collections/:name
/words/collections/create
/words/trainings/

/phrasal-verbs

/irregular-verbs

/grammar
/grammar/tenses
/grammar/tenses/present-simple
/grammar/tenses/present-continuous
/grammar/tenses/present-perfect
/grammar/tenses/present-perfect-continuous

/grammar/tenses/past-simple
/grammar/tenses/past-continuous
/grammar/tenses/past-perfect
/grammar/tenses/past-perfect-continuous

/grammar/tenses/future-simple
/grammar/tenses/future-continuous
/grammar/tenses/future-perfect
/grammar/tenses/future-perfect-continuous
/grammar/tenses/future-in-the-past

/grammar/verbs/
/grammar/phrasal-verbs
/grammar/irregular-verbs
/grammar/modal-verbs/
/grammar/turns-and-constructions/
/grammar/sentences

/trainings/words
/trainings/phrasal-verbs
/trainings/irregular-verbs
/trainings/sentences

/books
/trainings

/translate

## /Page

/List
/Collections
/Trainings

### Sections

- Words
- Irregular verbs
- Search
- Add collection/theme
- Add
- Edit
- Delete
- To train
- Add to collection - modal with collections list

## Vocabulary

### Collections:

---

List

- Travaleing
- Food
- Health
- Animals

---

Add collection/theme - модальное окно с полем названия колекции,
выбором иконки и добавлением слов в колекцию

## Irregular verbs

add/edit modal with 3 inputs for each type of verb
and one for translation

## Phrasal verbs

### Collections:

- have
- get
- for

## Sentences

### Collections:

- travaling
- shoping
- restaurant

## Grammar

### Themes:

- tenses:
  1.Present simple
  2.Past simple
  3.Future simple

## Trainings

1. Vocabulary:

- Random
- Animals
- Travaling
- Food

2. Irregular verbs
3. Phrasal verbs

- have

## Books

## Translater

# BD

vocabularies: [
{
id: '323sdc3423',
name: 'english',
terms: [
{
id: 'ae3nrn33n3',
name: 'word',
translation: 'слово',
explanation: '',
training: true,
collectionId 'sdlk3lkmd939d8'
},
]
}
]

collections: [
{
id: '3m4423cx232'
lang: 'english',
name: 'animals',
terms: [id, id, id]
}
]

phrasalVerbs: [
{
lang: 'english',
terms: [
{
id: 'ae3nrn33n3',
name: 'phrasal verb',
translation: 'фразовый глагол',
explanation: '',
training: true,
},
]
}
]

irregularVerbs: [
{
lang: 'english',
terms: [
{
id: 'ae3nrn33n3',
name: 'go',
forms: ['go', 'went', 'gone']
translation: 'идти',
explanation: '',
training: true,
},
]
}
]
