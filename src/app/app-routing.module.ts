import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TripHistoryComponent } from './history/trip-history/trip-history.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TravelComponent } from './travel/travel/travel.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // component: TravelComponent,
    redirectTo: 'travel'
    // loadChildren: () => import('./travel/travel.module').then(x => x.TravelModule)
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
  // {
  //   path: '**'
  //   redirectTo: 'travel',
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
