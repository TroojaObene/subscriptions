import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdditionPage } from './addition.page';

const routes: Routes = [
  {
    path: '',
    component: AdditionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdditionPageRoutingModule {}
