import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { formatDate } from '@angular/common';
import { RemindersService } from 'src/app/services/Reminders.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  param: string;
  Rem_id: string;
  sub
  single: any;
  DocReference: AngularFirestoreDocument;
  today: string
  date
  name: string
  cost: number
  constructor(private remindersService: RemindersService, private route: ActivatedRoute, private afs: AngularFirestore, private router: Router) {
  }
  ngOnInit() {
    this.Rem_id = this.route.snapshot.paramMap.get('id')
    console.log("Recive", this.Rem_id)
    this.single = this.get_data(this.Rem_id)
    let now = new Date();
    this.today = formatDate(now, 'yyyy-MM-dd', 'en-US')
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
    this.router.navigate(['/tabs/delete/', this.Rem_id]);
  }

  save() {
    console.log("name: ", this.name)
    console.log("cost: ", this.cost)
    console.log("date: ", this.date)
    let now = new Date();
    let start_date_date = parseISO(this.date)
    let start_date = format(start_date_date, 'MM-dd-yyyy')
    let dd_old = start_date_date.getDate()
    let mm_old = start_date_date.getMonth()
    let yy_old = start_date_date.getFullYear()
    let dd_now = now.getDate()
    let mm_now = now.getMonth()
    let yy_now = now.getFullYear()

    //set next_date
    let next_date = new Date()
    next_date.setFullYear(yy_now)
    next_date.setDate(dd_old)
    if (dd_now > dd_old) {
      next_date.setMonth(mm_now + 1)
    } else {
      next_date.setMonth(mm_now)
    }

    let logo = "https://logo.clearbit.com/" + this.single.company
    const reminder =
      this.remindersService.updateFullReminder(this.Rem_id, {
        name: this.name,
        company: this.single.company,
        logo: logo,
        start_date: start_date,
        payment_date: parseInt(format(parseISO(this.date), 'dd')),
        payment_frequency: this.single.payment_frequency,
        end_date: null,
        cost: this.cost,
        next_date: formatDate(next_date, 'MM-dd-yyyy', 'en-US'),
        raw_start_date: start_date_date
      });
    console.log("raw date: ", start_date_date)
    console.log("set date: ", start_date)
    console.log("next date: ", formatDate(next_date, 'MM-dd-yyyy', 'en-US'))
    this.router.navigate(['/tabs/tab1']);
  }
}
