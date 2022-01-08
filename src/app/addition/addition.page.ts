import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { RemindersService } from 'src/app/services/Reminders.service';
import { formatDate } from '@angular/common';
import { format, parseISO } from 'date-fns';

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

  name: string
  cost: number
  date: string

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
    console.log("today: ", this.today)
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  //save
  save() {
    let now = new Date();
    const start_date_date = this.date === undefined ? new Date() : parseISO(this.date)
    const name = this.name === undefined ? this.data.name : this.name
    const cost = this.cost === undefined ? this.data.cost : this.cost

    let start_date = format(start_date_date, 'MM-dd-yyyy')
    let dd_old = start_date_date.getDate()
    let mm_old = start_date_date.getMonth()
    let yy_old = start_date_date.getFullYear()
    let dd_now = now.getDate()
    let mm_now = now.getMonth()
    let yy_now = now.getFullYear()

    //console.log("Now: ", now, " now type: ", typeof (now))
    //console.log("input: ", this.date, " input type: ", typeof (this.date))
    //console.log("Formated: ", start_date_date, " format type: ", typeof (start_date_date))

    //console.log("dd_old", dd_old, " type of dd_old", typeof (dd_old))
    //console.log("mm_old", mm_old, " type of mm_old", typeof (mm_old))
    //console.log("yy_old", yy_old, " type of yy_old", typeof (yy_old))
    //console.log("dd_now", dd_now, " type of dd_now", typeof (dd_now))
    //console.log("mm_now", mm_now, " type of mm_now", typeof (mm_now))
    //console.log("yy_now", yy_now, " type of yy_now", typeof (yy_now))

    //set next_date
    let next_date = new Date()
    next_date.setFullYear(yy_now)
    next_date.setDate(dd_old)
    if (dd_now > dd_old) {
      next_date.setMonth(mm_now + 1)
    } else {
      next_date.setMonth(mm_now)
    }

    let logo = "https://logo.clearbit.com/" + this.data.company
    this.remindersService.addReminders({
      name: name,
      company: this.data.company,
      logo: logo,
      start_date: start_date,
      payment_date: dd_old,
      payment_frequency: this.data.payment_frequency,
      end_date: null,
      cost: parseFloat(cost),
      next_date: formatDate(next_date, 'MM-dd-yyyy', 'en-US'),
      raw_start_date: start_date_date
    });
    console.log("raw date: ", start_date_date)
    console.log("set date: ", start_date)
    console.log("next date: ", formatDate(next_date, 'MM-dd-yyyy', 'en-US'))
    this.router.navigate(['/tabs/tab1']);
  }

  back() {
    this.router.navigate(['/tabs/tab2/']);
  }
}
