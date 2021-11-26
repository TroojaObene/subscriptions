import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Bookmarks {
  id: number,
  type: string,
  name: string,
  tag: string,
}

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {
  private bookmarks: Observable<Bookmarks[]>;
  private bookmarksCollection: AngularFirestoreCollection<Bookmarks>;

  constructor(private afs: AngularFirestore) {
    this.bookmarksCollection = this.afs.collection<Bookmarks>('Bookmarks');
    this.bookmarks = this.bookmarksCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data }
        });
      })
    );
  }
  askBookmarks(): Observable<Bookmarks[]> { return this.bookmarks; }
  addBookmarks(bookmarks: Bookmarks): Promise<DocumentReference> {
    return this.bookmarksCollection.add(bookmarks);
  }
}
