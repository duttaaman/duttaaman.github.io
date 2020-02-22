import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryFilterComponent } from './country-filter/country-filter.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpRequestService } from './country-filter/country-filter.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import {MatAutocompleteModule} from '@angular/material';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    CountryFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    //  MatAutocompleteModule
    MatAutocompleteModule,
    MatInputModule
  ],
  providers: [HttpRequestService],
  exports: [MatAutocompleteModule, MatInputModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
