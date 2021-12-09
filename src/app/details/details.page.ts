import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RemindersService, Reminders } from 'src/app/services/Reminders.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  remindersCollection: any;
  reminder: any;
  constructor(private route: ActivatedRoute, private remindersService: RemindersService,) {
    //this.route.params.subscribe(id => console.log(id));
    //this.route.params.subscribe(id => console.log(this.remindersService.askReminder(id)));
    //console.log(this.remindersService.askReminder(id));
  }

  ngOnInit() {

  }

}
function id(id: any): any {
  throw new Error('Function not implemented.');
}

