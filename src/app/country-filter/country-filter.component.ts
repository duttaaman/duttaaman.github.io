import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpRequestService } from './country-filter.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-country-filter',
  templateUrl: './country-filter.component.html',
  styleUrls: ['./country-filter.component.css']
})
export class CountryFilterComponent implements OnInit {


  options: string[] = ['Delhi', 'Mumbai', 'Banglore'];
  countries: string[] = [];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  countryName = '';
  secondCountry ='';
  selected;
  selected1;
  // key;
  // key1;
  names = []
  operation: any;
  flag = false;
  constructor(private httpService: HttpRequestService, public dialog: MatDialog) { }

  ngOnInit() {

    //Observables observes the text in input field

    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );

  }

  InitialFetch(value) {
    this.countries = [];
    this.httpService.getCountryName(value).subscribe(data => {
      for (const cust in data) {
        this.countries.push(data[cust].name);
      }
    })
  }

  countryChange(value) {
    this.operation = "";

    this.flag = true;
    this.httpService.getCountryDetails(value).subscribe(data => {
      this.selected = data[0];

      this.countryName = value;
      // this.key = Object.keys(this.selected);
    })
  }

  compareCountries(value) {
      this.httpService.getCountryDetails(value).subscribe(data => {
        this.selected1 = data[0];
        this.secondCountry=value;
        // this.key1 = Object.keys(this.selected1);
      })


  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.countries.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  // }

  openDialog(country: string): void {
    if (this.flag && this.countryName != country) {
      const dialogRef = this.dialog.open(DialogBox, {
        width: '250px',
        data: { name: country }

      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.operation = result;

        if (this.operation == "compare")
          this.compareCountries(country);
        else if (this.operation == "overwrite")
          this.countryChange(country)
      });
    }
    else
      this.countryChange(country)

  }

}



@Component({
  selector: 'app-dialog-box',
  templateUrl: 'dialog-box.html',
})
export class DialogBox {

  constructor(
    public dialogRef: MatDialogRef<DialogBox>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}