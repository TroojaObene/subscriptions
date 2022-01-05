import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { RemindersService } from 'src/app/services/Reminders.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-addition',
  templateUrl: './addition.page.html',
  styleUrls: ['./addition.page.scss'],
})
export class AdditionPage implements OnInit {
  Rem_id: string;
  sub
  data: any;
  DocReference: AngularFirestoreDocument;
  today


  constructor(private remindersService: RemindersService, private route: ActivatedRoute, private afs: AngularFirestore, private router: Router) { }
  ngOnInit() {
    this.data = {}
    this.Rem_id = this.route.snapshot.paramMap.get('id')
    console.log("Recive", this.Rem_id)
    this.DocReference = this.afs.doc(`Additions/${this.Rem_id}`)
    this.sub = this.DocReference.valueChanges().subscribe(val => {
      this.data = val
    })

    let now = new Date();
    this.today = formatDate(now, 'yyyy-MM-dd', 'en-US')
    console.log(this.today)
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  //save
  save(a) {
    let now = new Date();
    let dd = String(now.getDate()).padStart(2, '0');
    let ddnum = parseInt(dd);
    let logo = "https://logo.clearbit.com/" + a.company
    this.remindersService.addReminders({
      name: a.name,
      company: a.company,
      logo: logo,
      start_date: formatDate(now, 'MM-dd-yyyy', 'en-US'),
      payment_date: ddnum,
      payment_frequency: a.payment_frequency,
      end_date: null,
      cost: a.cost,
      next_date: formatDate(now.setMonth(now.getMonth() + 1), 'MM-dd-yyyy', 'en-US')
    });
    this.router.navigate(['/tabs/tab1']);
  }

  back() {
    this.router.navigate(['/tabs/tab2/']);
  }
}
