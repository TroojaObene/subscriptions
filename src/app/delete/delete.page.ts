import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { RemindersService } from 'src/app/services/Reminders.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class DeletePage implements OnInit {
  param: string;
  Rem_id: string;
  sub
  single: any;
  DocReference: AngularFirestoreDocument;
  constructor(private route: ActivatedRoute, private afs: AngularFirestore, private router: Router, private remindersService: RemindersService) {
  }
  ngOnInit() {
    this.Rem_id = this.route.snapshot.paramMap.get('id')
    console.log("Recive", this.Rem_id)
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

  back() {
    this.router.navigate(['/tabs/details/', this.Rem_id]);
  }

  delete() {
    this.remindersService.removeReminder(this.Rem_id);
    this.router.navigate(['/tabs/tab1/'])
  }
}
