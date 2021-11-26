import { Component, OnInit } from '@angular/core';
import { RemindersService, Reminders } from 'src/app/services/Reminders.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public reminders: Observable<Reminders[]>
  constructor(private remindersService: RemindersService) { }
  ngOnInit() {
    this.reminders = this.remindersService.askReminders();
  }
}

