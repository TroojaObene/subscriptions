import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { map, take, timestamp } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface Additions {
  name: string,
  payment_frequency: number,
  company: string,
  type: string,
  cost: number
}

@Injectable({
  providedIn: 'root'
})
export class AdditionsService {
  private additions: Observable<Additions[]>;
  private additionsCollection: AngularFirestoreCollection<Additions>;

  constructor(private firebase: AngularFirestore) {
    this.additionsCollection = this.firebase.collection<Additions>('Additions');
    this.additions = this.additionsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data }
        });
      })
    );
  }
  askAdditions(): Observable<Additions[]> { return this.additions; }
  addAdditions(additions: Additions): Promise<DocumentReference> {
    return this.additionsCollection.add(additions);
  }
}
