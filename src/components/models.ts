export interface Term {
  id?: string;
  term: string | string[];
  lang: string;
  translation: string;
  explanation?: string;
  training: boolean;
}

export interface Word {
  id: string;
  term: string;
  lang: string;
  translation: string;
  explanation: string | '';
  training: boolean;
}

export interface PhrasalVerb {
  id: string;
  term: string;
  lang: string;
  translation: string;
  explanation: string | '';
  training: boolean;
}

export interface IrregularVerb {
  id: string;
  term: string;
  lang: string;
  translation: string;
  explanation: string | '';
  training: boolean;
}

export interface Sentence {
  id: string;
  term: string;
  lang: string;
  translation: string;
  explanation: string | '';
  training: boolean;
}
