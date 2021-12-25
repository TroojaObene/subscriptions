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
  reminder: any;
  remindersCollection: any;
  param: any;
  constructor(private route: ActivatedRoute, private afs: AngularFirestore) {
    this.route.params.forEach(param => this.param = param['id'])
    this.remindersCollection = this.afs.collection('Reminders');
  }

  askReminders(): Observable<Reminders[]> { return this.reminder; }

  getDoc(id: string) {
    //return (this.remindersCollection.doc(id).get().then(snapshot => { const reminder = snapshot.data }));
    //this.afs.collection('Reminders').doc(id).get().then(snapshot => { return snapshot.data });
  }

  ngOnInit() {
    this.afs.collection('Reminders')
      .doc(this.param)
      .get()
      .subscribe(snapshot => {
        const reminder = snapshot.data
      });


    //    this.reminder = this.getDoc(this.param)
    //console.log(this.reminder);
    //console.log(this.param);
    //console.log(this.getDoc(this.param))
    //console.log(this.remindersCollection.doc(this.param).get);
  }

}

