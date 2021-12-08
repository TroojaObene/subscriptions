import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  reminder: any;
  constructor() { }

  ngOnInit() {
    this.reminder = JSON.parse(sessionStorage.getItem("reminder"));
    console.log(this.reminder);
  }

  ngOnDestroy() {
    this.reminder = ""
  }

}
