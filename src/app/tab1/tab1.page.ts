import { Component, OnInit } from '@angular/core';
import { RemindersService, Reminders } from 'src/app/services/Reminders.service';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { format } from 'date-fns';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public reminders: Observable<Reminders[]>
  constructor(private remindersService: RemindersService, private route: Router, private firebase: AngularFirestore) { }
  ngOnInit() {
    this.reminders = this.remindersService.askReminders();
    this.reminders.forEach(data => {
      data.forEach(object => {
        this.nextDate(object)
      })
    })
  }

  navInfo() {
    this.route.navigate(['/tabs/info']);
  }

  getDetails(reminder) {
    this.route.navigate(['/tabs/details/', reminder.id]);
    console.log("send", reminder.id)
  }

  async nextDate(data) {
    let id = data.id
    let next_date_old = data.next_date
    let dd_old = data.payment_date
    let dd_now = new Date().getDay()
    let mm_now = new Date().getMonth()
    let yy_now = new Date().getFullYear()

    let next_date_date = new Date()
    next_date_date.setFullYear(yy_now)
    next_date_date.setDate(dd_old)
    if (dd_now > dd_old) {
      next_date_date.setMonth(mm_now + 1)
    } else {
      next_date_date.setMonth(mm_now)
    }

    let new_next_date = format(next_date_date, 'MM-dd-yyyy')
    //console.log("Old: ", next_date_old)
    //console.log("New: ", new_next_date)

    if (next_date_old === new_next_date) { } else {
      this.firebase.collection('Reminders').doc(id).update({ next_date: new_next_date })
      console.log("Update ", id, " date to ", new_next_date)
    }
  }
}
