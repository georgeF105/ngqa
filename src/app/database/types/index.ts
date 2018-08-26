import { Directory, Key } from '../firebase/firebase.service';

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
  question: string;
  answers: Array<Answer>;
  user: User;
}

export interface NormalQuestion {
  question: string;
  answers: Array<Key>;
  user: Key;
}

export interface Answer {
  answer: string;
  user: User;
}

export interface NormalAnswer {
  answer: string;
  user: Key;
}

export interface User {
  name: string;
  email: string;
}
