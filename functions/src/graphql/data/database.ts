import { config } from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Directory, FirebaseItem, Key } from '../../models';

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
  return getSnapshot(path).then(snapshot => {
    const item = snapshot.val();
    if (!item || !Object.keys(item).length) {
      throw new Error(`cant find item at ${path.join('/')}`);
    }
    return {
      ...item,
      key: snapshot.key
    };
  });
}

export function getList (path: Array<string>): Promise<Array<any>> {
  return getSnapshot(path).then(snapshot => toList(snapshot.val()));
}

export function addItemToList (path: Array<string>, item: any): Promise<Key> {
  const fullPath = path.join('/');
  const key = admin.database().ref(fullPath).push(item).key;
  const updates = {
    [`${fullPath}/${key}`]: item 
  };
  return admin.database().ref().update(updates)
    .then(() => key);
}

export function toList<T extends FirebaseItem> (map: Directory<T>): Array<T> {
  return Object.keys(map).map(key => {
    return {
      ...(map[key] as Object),
      key
    } as T;
  });
}
