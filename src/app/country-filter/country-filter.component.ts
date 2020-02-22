import { Component, OnInit } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {HttpRequestService} from './country-filter.service';
import {map, startWith} from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-country-filter',
  templateUrl: './country-filter.component.html',
  styleUrls: ['./country-filter.component.css']
})
export class CountryFilterComponent implements OnInit {

 
  options: string[] = ['Delhi', 'Mumbai', 'Banglore'];
  countries:string[]=[];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  countryName='';
  selected;
  selected1;
  key;
  key1;
  constructor( private httpService:HttpRequestService) { }

  ngOnInit() {

    //Observables observes the text in input field

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
);

    this.httpService.getAll().subscribe(data =>{
      for (const cust in data) {
        this.countries.push(data[cust].name);
      }
    });
  
  }

  countryChange(value){
    
    this.httpService.getCountryDetails(value).subscribe(data =>{
      this.selected=data[0];
      // alert(JSON.stringify(this.selected));
      this.countryName=value;
      this.key=Object.keys(this.selected);
    })
  }

  compareCountries(value){
    this.httpService.getCountryDetails(value).subscribe(data =>{
      this.selected=data[0];
      this.key1=Object.keys(this.selected);
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.countries.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
}

}
