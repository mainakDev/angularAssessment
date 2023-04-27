import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  enteredText: string = '';
  myControl: FormControl = new FormControl();

  options = [
    'Gina Williams',
    'Jake Williams',
    'Jamie John',
    'John Doe',
    'Jeff Stewart',
    'Paula M. Keith',
  ];

  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((val) => (val.length >= 1  && val[0] === '@' ? this.filter(val.substring(1)) : []))
    );
  }

  filter(val: string): string[] {
    return this.options.filter(
      (option) => option.toLowerCase().indexOf(val.toLowerCase()) === 0
    );
  }

  onFormReset(){
    console.log(this.enteredText);
    this.enteredText = '';
  }
}
