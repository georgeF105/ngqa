import { config, database } from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Directory, FirebaseItem } from '../../models';

admin.initializeApp(config().firebase);

function getSnapshot (path: Array<string>): Promise<any> {
  const fullPath = path.join('/');
  return new Promise((resolve, reject) => {
    admin.database().ref(fullPath).once('value', snapshot => {
      resolve(snapshot);
    }, err => {
      reject(err);
    });
  });
}

export function getItem (path: Array<string>): Promise<any> {
  return getSnapshot(path).then(snapshot => ({
    ...snapshot.val(),
    key: snapshot.key
  }));
}

export function getList (path: Array<string>): Promise<Array<any>> {
  return getSnapshot(path).then(snapshot => toList(snapshot.val()));
}

function toList<T extends FirebaseItem> (map: Directory<T>): Array<T> {
  return Object.keys(map).map(key => {
    return {
      ...(map[key] as Object),
      key
    } as T;
  });
}
