import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RemindersService, Reminders } from 'src/app/services/Reminders.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';


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
    this.route.params.subscribe(id => { console.log(id.id) });
  }

}

