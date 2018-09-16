export type Key = string;

export interface FirebaseItem {
  key: Key;
}

export interface Directory<T> {
  [key: string]: T;
}

export interface Store {
  questions: Directory<Question>;
  answers: Directory<Answer>;
  users: Directory<User>;
}

export interface NormalStore {
  questions: Directory<NormalQuestion>;
  answers: Directory<NormalAnswer>;
  Users: Directory<User>;
}

export interface Question {
  key: Key;
  question: string;
  answers: Array<Answer>;
  user: User;
}

export interface NormalQuestion {
  key: Key;
  question: string;
  answers: Array<Key>;
  user: Key;
}

export interface Answer {
  key: Key;
  answer: string;
  user: User;
}

export interface NormalAnswer {
  key: Key;
  answer: string;
  user: Key;
}

export interface User {
  key: Key;
  token: string;
  name: string;
  email: string;
}
