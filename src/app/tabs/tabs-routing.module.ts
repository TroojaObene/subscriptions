import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      },
      {
        path: 'details',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      },
      {
        path: 'edit',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      },
      {
        path: 'info',
        loadChildren: () => import('../info/info.module').then(m => m.InfoPageModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('../edit/edit.module').then(m => m.EditPageModule)
      },
      {
        path: 'details/:id',
        loadChildren: () => import('../details/details.module').then(m => m.DetailsPageModule)
      }
      ,
      {
        path: 'delete/:id',
        loadChildren: () => import('../delete/delete.module').then(m => m.DeletePageModule)
      },
      {
        path: 'tab2/:id',
        loadChildren: () => import('../addition/addition.module').then(m => m.AdditionPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
