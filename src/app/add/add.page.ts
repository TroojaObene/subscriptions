import { Component, OnInit } from '@angular/core';
import { AdditionsService, Additions } from 'src/app/services/Additions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor(private additionsService: AdditionsService, private route: Router) { }

  ngOnInit() {
  }



  save(_url: string, _type: string) {
    this.additionsService.addAdditions({
      company: _url,
      name: _url.toUpperCase(),
      payment_frequency: 1,
      type: _type
    });
    this.route.navigate(['/tabs/tab2/']);
  }

}
