import { Component, OnInit } from '@angular/core';
import { RemindersService, Reminders } from 'src/app/services/Reminders.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  public reminders: Observable<Reminders[]>
  constructor(private remindersService: RemindersService, private route: Router) { }
  ngOnInit() {
    this.reminders = this.remindersService.askReminders();
  }

  remove(a) {
    const alert = a.name + " has been removed"
    window.alert(alert)
    this.remindersService.removeReminder(a.id);
    this.route.navigate(['/tabs/tab1']);
  }
}
