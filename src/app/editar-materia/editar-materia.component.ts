import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {FirebaseService} from "../firebase.service";
import { Router,ActivatedRoute } from "@angular/router";
@Component({
	selector: 'app-editar-materia',
	templateUrl: './editar-materia.component.html',
	styleUrls: ['./editar-materia.component.css']
})
export class EditarMateriaComponent implements OnInit {
	public nome;
	public nivel;
	public cor;
	public questoes;
	public peso;
	public editar;
	public materia;
	constructor(public params:ActivatedRoute,public routes:Router,public database:FirebaseService,public toast:ToastsManager,public vcr:ViewContainerRef) {
		this.toast.setRootViewContainerRef(vcr);
		this.editar = true;
	}

	/**
	 * @description Metodo que inicializa as inputs da tela, que permite que o usuario modifique os atributos da materia
	 */
	ngOnInit() {
		let a = this.params.queryParams.subscribe(params=>{
			this.nome = params["nome"]
			this.nivel = params["nivel"]
			this.questoes = params["questoes"]
			this.peso = params["peso"]
			this.cor = params["cor"]
			this.materia = params;
		})
	}

	/**
	 * @method cancelar
	 * @description Retorna para a janela 'minhas_materias' e descarta as alterações feitas
	 */
	cancelar(){
		this.routes.navigate(["minhas_materias"])
	}

	/**
	 * @method salvarAlteracoes
	 * @description Modifica os dados da materia no banco de dados
	 */
	salvarAlteracoes(){
     let ref = this;
     this.editar = false;
     this.database.editMateria({cor:this.cor,nivel:this.nivel,nome:this.nome,peso:this.peso,questoes:this.questoes},this.materia)
     .then(()=>{
       this.toast.success("AS ALTERAÇÕES FORAM SALVAS COM SUCESSO","SUCESSO");
       this.routes.navigate(["minhas_materias"]);

     })
     .catch(()=>{
     	this.toast.error( "HOUVE ALGUM ERRO AO TENTAR ALTERAR, POR FAVOR, TENTE NOVAMENTE!","ERRO");
     })
	}
}
