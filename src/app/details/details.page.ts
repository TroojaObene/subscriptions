import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(id => console.log(id));
  }

  ngOnInit() {
  }

}
