import { Component, OnInit } from '@angular/core';
import { AdditionsService, Additions } from 'src/app/services/Additions.service';
import { RemindersService, Reminders } from 'src/app/services/Reminders.service';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public additions: Observable<Additions[]>
  public reminders: Observable<Reminders[]>
  dd: number;
  constructor(private additionsService: AdditionsService, private remindersService: RemindersService, private route: Router) { }


  ngOnInit() {
    this.additions = this.additionsService.askAdditions();
  }

  addReminder(a) {
    let now = new Date();
    let today = formatDate(now, 'dd.MM.yyyy', 'en-US');
    let dd = String(now.getDate()).padStart(2, '0');
    let ddnum = parseInt(dd);
    let logo = "https://logo.clearbit.com/" + a.company
    this.remindersService.addReminders({
      name: a.name,
      company: a.company,
      logo: logo,
      start_date: now,
      payment_date: ddnum,
      payment_frequency: a.payment_frequency,
      end_date: null,
      cost: 0
    });
    this.route.navigate(['/tabs/tab1']);
  }

  navAdd() {
    this.route.navigate(['/tabs/tab2/add/'])
  }
}

