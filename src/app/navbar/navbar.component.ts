import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {
  }
  enteredSearchValue: string ='';
  //this a property that is bind with the seacrh input. So whatever text is inputted is assign to this property.

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();//instantiate

  onSearchTextChanged(){

    this.searchTextChanged.emit(this.enteredSearchValue)
    //this detects changes in text inputted into the search bar
  }

}
