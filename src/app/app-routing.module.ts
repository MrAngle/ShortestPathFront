import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripHistoryComponent } from './history/trip-history/trip-history.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TravelComponent } from './travel/travel/travel.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'travel'
  },
  {
    path: 'travel',
    component: TravelComponent,
    loadChildren: () => import('./travel/travel.module').then(x => x.TravelModule)
  },
  {
    path: 'history',
    component: TripHistoryComponent,
    loadChildren: () => import('./history/history.module').then(x => x.HistoryModule)
  },
  {
    component: NotFoundComponent,
    path: '404',
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
