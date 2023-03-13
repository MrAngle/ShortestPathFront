import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TravelComponent } from './travel/travel/travel.component';

const routes: Routes = [
  { path: '', component: TravelComponent },
  { 
    path: 'travel', 
    component: TravelComponent,
    loadChildren: () => import('./travel/travel.module').then(x => x.TravelModule)
  },
  {
    component: NotFoundComponent,
    path: '404',
  },
  {
    component: NotFoundComponent,
    path: '**'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
