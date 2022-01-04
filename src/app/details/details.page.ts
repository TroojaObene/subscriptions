import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RemindersService, Reminders } from 'src/app/services/Reminders.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { map, take, timestamp } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  param: string;
  Rem_id: string;
  sub
  single: any;
  DocReference: AngularFirestoreDocument;
  constructor(private route: ActivatedRoute, private afs: AngularFirestore) {
  }
  ngOnInit() {
    this.single = {}
    this.Rem_id = this.route.snapshot.paramMap.get('id')
    console.log("Recive", this.Rem_id)
    this.DocReference = this.afs.doc(`Reminders/${this.Rem_id}`)
    this.sub = this.DocReference.valueChanges().subscribe(val => {
      this.single = val
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  edit() {
    console.log("edit ", this.Rem_id)
  }

}

