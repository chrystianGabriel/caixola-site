import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../firebase.service";
import { Router,ActivatedRoute } from "@angular/router";
@Component({
	selector: 'app-minhas-materias',
	templateUrl: './minhas-materias.component.html',
	styleUrls: ['./minhas-materias.component.css']
})
export class MinhasMateriasComponent implements OnInit {
	public listaMaterias;
	public load;
	constructor(public database:FirebaseService,public router:Router) { 
		
	}
	async ngOnInit(){
		this.load = true;
		this.listaMaterias = await this.database.getListaMaterias();
		this.load = false;
		console.log(this.listaMaterias);
	}
	/**
	 * Colore as materias com as suas cores correspondentes, 
	 * As cores são selecionadas pelo usuario na hora do cadastro da mesma
	 */
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

	/**
	 * Deleta todos os dados da materia, inclusive os estudos realizados
	 */
	 async deletarMateria(materia){
     let deletar = confirm("TEM CERTEZA QUE DESEJA DELETAR TODOS OS DADOS DESTA MATERIAS?")
     if(deletar){
       this.load = true;
       this.listaMaterias = [];
       await this.database.deletarMateria(materia)
       this.load = false;
       this.listaMaterias = await this.database.getListaMaterias()

     }
   }

   /**
	* abre a pagina de editar_materia e passa por parametro a materia desejada
	*/
   editarMateria(materia){
		//routerLink="/editar_materia" queryParams="{materia:materia}"
		this.router.navigate(["/editar_materia"],{ queryParams: materia})
   }

   /**
	* abre a pagina de relatorios, passando a materia por parametro
	* 
	*/
   listarEstudos(materia){
   		this.router.navigate(["/relatorios"],{ queryParams: materia})
   }

}
