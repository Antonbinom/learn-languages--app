// db.ts
import Dexie, { Table } from 'dexie';

export interface Word {
  lang: string;
  term: string;
  translation: string;
  explanation?: string;
  training: boolean;
}
export interface PhrasalVerbs {
  lang: string;
  term: string;
  translation: string;
  explanation?: string;
  training: boolean;
}
export interface IrregularVerbs {
  lang: string;
  term: string;
  translation: string;
  explanation?: string;
  training: boolean;
}
export interface Sentences {
  lang: string;
  term: string;
  translation: string;
  explanation?: string;
  training: boolean;
}
export interface wordsCollections {
  name: string;
  lang: string;
  terms: string[];
}
export interface PhrasalVerbsCollections {
  name: string;
  lang: string;
  terms: string[];
}

export class MySubClassedDexie extends Dexie {
  words!: Table<Word>;
  phrasalVerbs!: Table<PhrasalVerbs>;
  irregularVerbs!: Table<IrregularVerbs>;
  sentences!: Table<Sentences>;
  wordsCollections!: Table<wordsCollections>;
  phrasalVerbsCollections!: Table<PhrasalVerbsCollections>;

  constructor() {
    super('learnLanguagesAppDB');
    this.version(6).stores({
      words: '++id, [lang+term], [lang+id], lang, term, translation, training',
      phrasalVerbs:
        '++id,[lang+term], [lang+id], lang, term, translation, training',
      irregularVerbs:
        '++id,[lang+term], [lang+id], lang, term, translation, training',
      sentences:
        '++id,[lang+term], [lang+id], lang, term, translation, training',
      wordsCollections: '++id, name, lang, terms',
      phrasalVerbsCollections: '++id, name, lang, terms',
    });
  }
}

export const db = new MySubClassedDexie();
