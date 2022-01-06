import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Reminders {
  name: string,
  company: string,
  logo: string,
  start_date: any,
  payment_date: number,
  payment_frequency: number,
  end_date: number,
  cost: number,
  next_date: string,
  raw_start_date:Date
}

@Injectable({
  providedIn: 'root'
})
export class RemindersService {
  private reminders: Observable<Reminders[]>;
  private remindersCollection: AngularFirestoreCollection<Reminders>;

  constructor(private firebase: AngularFirestore) {
    this.remindersCollection = this.firebase.collection<Reminders>('Reminders', ref => ref.where('end_date', '==', null));
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
  askReminders(): Observable<Reminders[]> {
    return this.reminders;
  }
  addReminders(reminders: Reminders): Promise<DocumentReference> {
    return this.remindersCollection.add(reminders);
  };
  updateReminder(_id: string, _cell: string, _value: string) {
    this.firebase.collection('Reminders').doc(_id).update({ _cell: _value });
  };
  removeReminder(_id: string) {
    this.firebase.collection('Reminders').doc(_id).update({ end_date: Date() });
  };
  updateFullReminder(_id: string, reminders: Reminders) {
    return this.remindersCollection.doc(_id).update(reminders);
  };
}
