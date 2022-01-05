import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdditionPageRoutingModule } from './addition-routing.module';

import { AdditionPage } from './addition.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdditionPageRoutingModule
  ],
  declarations: [AdditionPage]
})
export class AdditionPageModule {}
