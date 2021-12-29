import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RemindersService, Reminders } from 'src/app/services/Reminders.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { map, take, timestamp } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  single: any;
  param: string;
  constructor(private remindersService: RemindersService, private route: ActivatedRoute) {
    //this.route.params.forEach(param => console.log(param))
  }
  ngOnInit() {
    //this.remindersService.askReminder(this.route.params.subscribe(id => { return id.id }))
    //this.route.params.subscribe(id => { return id.id });
    this.route.params.subscribe(id => { console.log(id.id) });
  }

}

