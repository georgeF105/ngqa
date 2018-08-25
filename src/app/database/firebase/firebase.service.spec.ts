import { TestBed, inject } from '@angular/core/testing';

import { FirebaseService, Directory } from './firebase.service';

interface DummyItem {
  name: string;
  linkedThing: DummyItem2;
}

interface DummyItem2 {
  firstName: string;
}

interface DummyStore {
  dummyRootItem: Directory<DummyItem>;
}

describe('FirebaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseService]
    });
  });

  it('should be created', inject([FirebaseService], (service: FirebaseService<DummyStore>) => {
    expect(service).toBeTruthy();
  }));
});
