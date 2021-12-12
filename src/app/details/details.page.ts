import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RemindersService, Reminders } from 'src/app/services/Reminders.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  reminder: any;
  name: any;
  constructor(private route: ActivatedRoute, private remindersService: RemindersService,) {
  }

  ngOnInit() {
    this.remindersService.askReminder(this.route.params.subscribe(id => { return id.id }))
    this.route.params.subscribe(id => { return id.id });
    //this.route.params.subscribe(id => { console.log(id.id) });
  }

}

