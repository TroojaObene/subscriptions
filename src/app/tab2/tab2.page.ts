import { Component, OnInit } from '@angular/core';
import { AdditionsService, Additions } from 'src/app/services/Additions.service';
import { RemindersService, Reminders } from 'src/app/services/Reminders.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public additions: Observable<Additions[]>
  public reminders: Observable<Reminders[]>
  constructor(private additionsService: AdditionsService, private remindersService: RemindersService) { }


  ngOnInit() {
    this.additions = this.additionsService.askAdditions();
  }

  addReminder(a) {
    this.remindersService.addReminders({
      name: a.name,
      type: a.id,
      start_date: null,
      payment_date: 10,
      payment_frequency: a.payment_frequency,
      end_date: null,
      user_id: "user"
    });
  }

}

