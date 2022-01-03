import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navBar = false;

  constructor() { }

  ngOnInit(): void {
  }

  navBarToggle(){
    this.navBar = this.navBar ? false : true;
  }

}
