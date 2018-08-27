import { config, database } from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Directory, FirebaseItem } from '../../models';

admin.initializeApp(config().firebase);

export function getItem (path: Array<string>): Promise<any> {
  const fullPath = path.join('/');

  return new Promise((resolve, reject) => {
    admin.database().ref(fullPath).once('value', snapshot => {
      resolve(snapshot.val());
    }, err => {
      reject(err);
    });
  });
}

export function toList<T extends FirebaseItem> (map: Directory<T>): Array<T> {
  return Object.keys(map).map(key => {
    return {
      ...(map[key] as Object),
      key
    } as T;
  });
}
