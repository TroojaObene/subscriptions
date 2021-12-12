import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RemindersService } from 'src/app/services/Reminders.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { map, take, timestamp } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Reminders {
  name: string,
  type: string,
  start_date: any,
  payment_date: number,
  payment_frequency: number,
  end_date: number
}

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  reminder: Observable<Reminders[]>;
  remindersCollection: AngularFirestoreCollection<Reminders>;
  param: any;
  constructor(private route: ActivatedRoute, private afs: AngularFirestore) {
    this.route.params.forEach(param => this.param = param['id'])
    this.remindersCollection = this.afs.collection<Reminders>('Reminders', ref => ref.where('id', '==', 'sy2nXTZODujeZ5MLFVLd'));
    this.reminder = this.remindersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data }
        });
      })
    );
  }

  askReminders(): Observable<Reminders[]> { return this.reminder; }

  ngOnInit() {
    console.log(this.askReminders())
    console.log(this.route.params.subscribe(id => { return id }))
  }

}

