import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { toDate } from 'date-fns';
import { testUserAgent } from '@ionic/core/dist/types/utils/platform';
import { Reminders } from 'src/app/services/Reminders.service';

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
  constructor(private route: ActivatedRoute, private afs: AngularFirestore, private router: Router) { }
  ngOnInit() {
    this.Rem_id = this.route.snapshot.paramMap.get('id')
    //console.log("Recive", this.Rem_id)
    this.single = this.get_data(this.Rem_id)
  }

  async get_data(id: string) {
    this.DocReference = this.afs.doc(`Reminders/${id}`)
    this.sub = this.DocReference.valueChanges().subscribe(val => {
      this.single = val
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  edit() {
    this.router.navigate(['/tabs/edit/', this.Rem_id]);
  }

  delete() {
    this.router.navigate(['/tabs/delete/', this.Rem_id]);
  }

  back() {
    this.router.navigate(['/tabs/tab1/']);
  }
}
