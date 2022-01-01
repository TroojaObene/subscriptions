import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { first, map, take, timestamp } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';

export interface Reminders {
  name: string,
  company: string,
  logo: string,
  start_date: any,
  payment_date: number,
  payment_frequency: number,
  end_date: number,
  cost: number
}

@Injectable({
  providedIn: 'root'
})
export class RemindersService {
  private reminders: Observable<Reminders[]>;
  private remindersCollection: AngularFirestoreCollection<Reminders>;
  private single: any;

  constructor(private firebase: AngularFirestore) {
    //this.remindersCollection = this.firebase.collection<Reminders>('/Reminders', ref => ref.where('end_date', '', '0'));
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
  nameReminder(_id: string, _name: string) {
    this.firebase.collection('Reminders').doc(_id).update({ name: _name });
  };

}
