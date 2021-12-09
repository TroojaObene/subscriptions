import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { map, take, timestamp } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';

export interface Reminders {
  name: string,
  type: string,
  start_date: any,
  payment_date: number,
  payment_frequency: number,
  end_date: number
}

@Injectable({
  providedIn: 'root'
})
export class RemindersService {
  private reminders: Observable<Reminders[]>;
  private remindersCollection: AngularFirestoreCollection<Reminders>;
  private reminder: AngularFirestoreDocument<Reminders>;

  constructor(private afs: AngularFirestore) {
    //this.remindersCollection = this.afs.collection<Reminders>('/Reminders', ref => ref.where('end_date', '', '0'));
    this.remindersCollection = this.afs.collection<Reminders>('Reminders');
    this.reminders = this.remindersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data }
        });
      })
    );
  }
  askReminders(): Observable<Reminders[]> { return this.reminders; }
  addReminders(reminders: Reminders): Promise<DocumentReference> {
    return this.remindersCollection.add(reminders);
  }
  updateReminder(_id: string, _cell: string, _value: string) {
    let doc = this.afs.collection('Reminders', ref => ref.where('id', '==', _id));
    doc.snapshotChanges().subscribe((res: any) => {
      let id = res[0].payload.doc.id;
      this.afs.collection('Reminders').doc(id).update({ _cell: _value });
    });
  }
  askReminder(id) {
    this.reminder = this.remindersCollection.doc(id);
    return this.reminder;
  }
}
