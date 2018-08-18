import { FirebaseStoreBase, Directory, FirebaseStoreItem, Key } from '../firebase/firebase.service';

export interface Store extends FirebaseStoreBase {
  questions: Directory<Question>;
  answers: Directory<Answer>;
  users: Directory<User>;
}

export interface NormalStore {
  questions: Directory<NormalQuestion>;
  answers: Directory<NormalAnswer>;
  Users: Directory<User>;
}

export interface Question extends FirebaseStoreItem {
  question: string;
  answers: Array<Answer>;
  user: User;
}

export interface NormalQuestion extends FirebaseStoreItem {
  question: string;
  answers: Array<Key>;
  user: Key;
}

export interface Answer extends FirebaseStoreItem {
  answer: string;
  user: User;
}

export interface NormalAnswer extends FirebaseStoreItem {
  answer: string;
  user: Key;
}

export interface User extends FirebaseStoreItem {
  name: string;
  email: string;
}
