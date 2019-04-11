import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../firebase.service'
import { Router} from "@angular/router";
declare var $:any
@Component({
	selector: 'app-meta-semanal',
	templateUrl: './meta-semanal.component.html',
	styleUrls: ['./meta-semanal.component.css']
})
export class MetaSemanalComponent implements OnInit {

	public horas;
	public minutos;
	constructor(private router:Router,private database:FirebaseService) {
	}

	ngOnInit() {
		$('#modalMetaSemanal').modal({
			show:true
		})
	}

	/**
	 * Insere a meta de tempo de estudo no banco de dados, ao cadastrar retorna para a pagina inicial
	 */
	cadastrarMeta(){
		this.horas= this.horas*7;
		this.minutos = (this.minutos/60)*7;
		this.horas += this.minutos - (this.minutos%1);
		this.minutos = (this.minutos%1)*60;
		this.database.cadastrarMetaSemanal(this.horas,this.minutos)
		this.router.navigate(["/home"])

	}

	/**
	 * Cancela o cadastro da meta e retorna para pagina 'home'
	 */
	cancelar(){
		this.router.navigate(["/home"])
	}


}
