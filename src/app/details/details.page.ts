import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';

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
  constructor(private route: ActivatedRoute, private afs: AngularFirestore, private router: Router) {
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
    this.router.navigate(['/tabs/edit/', this.Rem_id]);
  }

  delete() {
    this.router.navigate(['/tabs/delete/', this.Rem_id]);
  }

  back() {
    this.router.navigate(['/tabs/tab1/']);
  }
}
