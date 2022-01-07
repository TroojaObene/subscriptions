import { Component, OnInit } from '@angular/core';
import { AdditionsService, Additions } from 'src/app/services/Additions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  name
  page
  cost

  constructor(private additionsService: AdditionsService, private router: Router) { }

  ngOnInit() {
  }

  edit() {
    this.router.navigate(['/tabs/tab2']);
  }

  save() {
    this.additionsService.addAdditions({
      company: this.page,
      name: this.name.toUpperCase(),
      payment_frequency: 1,
      type: this.name,
      cost: this.cost
    });
    this.router.navigate(['/tabs/tab2/']);
  }

  back() {
    this.router.navigate(['/tabs/tab2']);
  }

}
