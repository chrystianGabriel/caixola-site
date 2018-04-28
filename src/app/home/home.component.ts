import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	private dataAtual;
	private listaMaterias;
	constructor() { 
		this.dataAtual = "23/02/2018"
		this.listaMaterias = [{nome:"Portugues",cor:"#2eb4ff"},{nome:"Matematica",cor:"#2eb4ff"},
							  {nome:"Portugues",cor:"#2eb4ff"},{nome:"Matematica",cor:"#2eb4ff"}]
	}

	ngOnInit() {
	}
	preencherCores(){
		let cores:any = document.getElementsByClassName("cores");
		for(let i = 0; i < this.listaMaterias.length;i++){
			cores[i].style.color = this.listaMaterias[i].cor
		}
	}

}
