import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatCardModule,
    MatChipsModule,
    MatInputModule
  ]
})
export class MaterialExampleModule {}
