import { Component, OnInit } from '@angular/core';
import { RemindersService, Reminders } from 'src/app/services/Reminders.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public reminders: Observable<Reminders[]>
  public single: any;
  constructor(private remindersService: RemindersService, private route: Router) { }
  ngOnInit() {
    this.reminders = this.remindersService.askReminders();
    this.single = this.remindersService.askReminder('pb9RuVTTyAjf6EZ21TFe');
    //console.log(this.remindersService.askReminder());
    console.log("final", this.single)

    //this.single = { "id": "some_id", "name": "Toomas" }
  }

  navInfo() {
    this.route.navigate(['/tabs/info']);
  }

}

