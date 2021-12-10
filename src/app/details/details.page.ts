import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RemindersService, Reminders } from 'src/app/services/Reminders.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  reminder: any;
  name: any;
  constructor(private route: ActivatedRoute, private remindersService: RemindersService,) {
    //this.route.params.subscribe(id => console.log(id));
    //this.route.params.subscribe(id => this.remindersService.askReminder(id));
    //var id = route.params(id => console.log(id));
    //this.remindersService.askReminder(id);
    //console.log(this.reminder);
    //this.route.params.subscribe(id => console.log(this.remindersService.askReminder(id)));
    //console.log(this.remindersService.askReminder(id));
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.name = params['id'];
    });
    this.remindersService.askReminder(this.name);
    console.log(this.reminder);
  }

}

