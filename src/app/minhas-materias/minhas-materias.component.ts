import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-minhas-materias',
	templateUrl: './minhas-materias.component.html',
	styleUrls: ['./minhas-materias.component.css']
})
export class MinhasMateriasComponent implements OnInit {
	private listaMaterias;
	constructor() { 
		this.listaMaterias = [{nome:"Português",cor:"#ffaabb"},
							  {nome:"Matematica",cor:"#bbaacc"}]
	}
	ngOnInit(){}
	preencherCores(){
		let cores:any = document.getElementsByClassName("cores");
		let cards:any = document.getElementsByClassName("card");
		for(let i = 0; i < this.listaMaterias.length;i++){
			cores[i].style.color = this.listaMaterias[i].cor
		}
		for(let i = 0; i < this.listaMaterias.length;i++){
			let hex1= this.listaMaterias[i].cor[1] + this.listaMaterias[i].cor[2]
			let hex2 = this.listaMaterias[i].cor[3] + this.listaMaterias[i].cor[4]
			let hex3 = this.listaMaterias[i].cor[5] + this.listaMaterias[i].cor[6]
			cards[i].style.background =  "rgba(" + parseInt(hex1,16) + "," + parseInt(hex2,16) + "," + parseInt(hex3,16) + "," + "0.2)";
		}

	}

}
