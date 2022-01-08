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
    const cost = this.cost === undefined ? 0 : parseFloat(this.cost)
    //const page = this.page === undefined ? this.page : this.page
    const name = this.name === undefined ? this.page : this.name

    this.additionsService.addAdditions({
      company: this.page,
      name: name.toUpperCase(),
      payment_frequency: 1,
      type: name,
      cost: cost
    });
    this.router.navigate(['/tabs/tab2/']);
  }

  back() {
    this.router.navigate(['/tabs/tab2']);
  }

}
