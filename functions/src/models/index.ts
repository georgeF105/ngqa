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
  title: string;
  body: string;
  answers: Array<Answer>;
  user: User;
  votes: number;
}

export interface NormalQuestion {
  key: Key;
  title: string;
  body: string;
  answers: Array<Key>;
  user: Key;
  votes: number;
}

export interface Answer {
  key: Key;
  body: string;
  user: User;
  votes: number;
}

export interface NormalAnswer {
  key: Key;
  body: string;
  user: Key;
  votes: number;
}

export interface User {
  key: Key;
  token: string;
  name: string;
  email: string;
}
