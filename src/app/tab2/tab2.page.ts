import { Component, OnInit } from '@angular/core';
import { AdditionsService, Additions } from 'src/app/services/Additions.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public additions: Observable<Additions[]>
  constructor(private additionsService: AdditionsService) { }

  ngOnInit() {
    this.additions = this.additionsService.askAdditions();
  }
  /**
    addReminder() {
      var name = (<HTMLInputElement>document.getElementById("Name")).value;
      var type = (<HTMLInputElement>document.getElementById("Type")).value;
      console.log("salvestatud");
      this.additionsService.addAdditions({
        type: type,
        name: name,
        image: null
      });
    }
    **/
}

