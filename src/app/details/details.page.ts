import { Component, OnInit } from '@angular/core';
import { RemindersService, Reminders } from 'src/app/services/Reminders.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  constructor(private remindersService: RemindersService, private route: ActivatedRoute) { }
  ngOnInit() {
    console.log(this.route.params.subscribe(params => { console.log(params.id) }));
  }

}


