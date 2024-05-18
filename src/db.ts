// db.ts
import Dexie, { Table } from 'dexie';

export interface Vocabulary {
  lang: string;
  terms: Term[];
}
export interface PhrasalVerbs {
  lang: string;
  terms: Term[];
}
export interface IrregularVerbs {
  lang: string;
  terms: Term[];
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
interface Term {
  id: string;
  term: string;
  translation: string;
  explanation: string;
  training: boolean;
  collectionId?: string;
}

export class MySubClassedDexie extends Dexie {
  vocabularies!: Table<Vocabulary>;
  phrasalVerbs!: Table<PhrasalVerbs>;
  irregularVerbs!: Table<IrregularVerbs>;
  wordsCollections!: Table<wordsCollections>;
  phrasalVerbsCollections!: Table<PhrasalVerbsCollections>;

  constructor() {
    super('learnLanguagesAppDB');
    this.version(1).stores({
      vocabularies: '++id, lang, terms',
      phrasalVerbs: '++id, lang, terms',
      irregularVerbs: '++id, lang, terms',
      wordsCollections: '++id, name, lang, terms',
      phrasalVerbsCollections: '++id, name, lang, terms',
    });
  }
}

export const db = new MySubClassedDexie();
