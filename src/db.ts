// db.ts
import Dexie, { Table } from 'dexie';

export interface Vocabulary {
  name: string;
  terms: Term[];
}
export interface PhrasalVerbs {
  name: string;
  terms: Term[];
}
export interface Collection {
  name: string;
  language: string;
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

  constructor() {
    super('learnLanguagesAppDB');
    this.version(1).stores({
      vocabularies: '++id, name, terms',
      phrasalVerbs: '++id, name, terms',
    });
  }
}

export const db = new MySubClassedDexie();
