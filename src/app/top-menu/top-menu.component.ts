import { Component, OnInit } from '@angular/core';
import {Intro} from "../../tutorial";
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  public tutorial;
  constructor() { 
  		this.tutorial = new Intro();
  }

  ngOnInit() {
  	this.tutorial.init();
  }

}
