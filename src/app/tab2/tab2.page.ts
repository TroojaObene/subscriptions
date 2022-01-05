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
  constructor(private additionsService: AdditionsService, private remindersService: RemindersService, private route: Router) { }


  ngOnInit() {
    this.additions = this.additionsService.askAdditions();
  }
  addReminder(a) {
    this.route.navigate(['/tabs/tab2/' + a.id])
  }
  navAdd() {
    this.route.navigate(['/tabs/tab2/add/'])
  }
}

