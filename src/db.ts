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
export interface WordsSets {
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
  wordsSets!: Table<WordsSets>;

  constructor() {
    super('learnLanguagesAppDB');
    this.version(1).stores({
      vocabularies: '++id, lang, terms',
      phrasalVerbs: '++id, lang, terms',
      wordsSets: '++id, name, lang, terms',
    });
  }
}

export const db = new MySubClassedDexie();
