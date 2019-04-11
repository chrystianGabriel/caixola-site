import { Component } from '@angular/core';
import { Router} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	public url;
 	constructor(private router:Router){
 		this.router.navigate(["/login"])
 		router.events.subscribe((url:any) => this.url = url.url);


 	}
}
