import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {FirebaseService} from "../firebase.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-cadastrar-materias',
  templateUrl: './cadastrar-materias.component.html',
  styleUrls: ['./cadastrar-materias.component.css']
})
export class CadastrarMateriasComponent implements OnInit {
  public nome;
  public dias_semana;
  public nivel;
  public cor;
  public seg;
  public ter; 
  public qua; 
  public quin;
  public sex;
  public sab;
  public dom;
  public questoes;
  public peso;

  constructor(public routes:Router,public database:FirebaseService,public toast:ToastsManager,public vcr:ViewContainerRef) {
  	this.toast.setRootViewContainerRef(vcr);
  	this.nome = "";
  	this.nivel = 1;
  	this.cor = '#990000';
  	this.questoes = 0;
  	this.peso = 0;
  	this.seg  = false
  	this.ter  = false
  	this.qua = false
  	this.quin = false
  	this.sex = false
  	this.sab = false
  	this.dom = false
  	
  }

  ngOnInit() {
  }

  /**
   * @method cadastrarMateria
   * @description Metodo para inserir uma materia no banco de dados
   * 
   */
  async cadastrarMateria(){
 		if(this.nome == ""  || this.questoes == "" || this.peso == ""|| (!this.seg && !this.ter && !this.qua && !this.quin && !this.sex && !this.sab && !this.dom)){
 			this.toast.error('VOCÊ DEVE PREENCHER TODOS OS CAMPOS!',"ERROR!",{toastLife:3000})
 		}else if(this.questoes < 0 || this.peso < 0 || this.peso > 3){
 			this.toast.error('O NÚMERO DE QUESTÕES E O PESO NÃO DEVEM SER MENOR QUE ZERO.O PESO DA MATERIA NÃO DEVE SER MAIOR QUE 3',"ERROR!",{toastLife:3000})
 		}else{

 			if(this.seg){
 				await this.database.cadastrarHorarios(1,this.nome)
 				.then(()=>{})
 				.catch((e)=>{
 					console.log(e)
 				})
 			}
 			
 			if(this.ter){
 				console.log(this.ter)
 				await this.database.cadastrarHorarios(2,this.nome)
 				.then(()=>{})
 				.catch((e)=>{
 					console.log(e)
 				})
 			}
 			if(this.qua){
 				console.log(this.qua)
 				await this.database.cadastrarHorarios(3,this.nome)
 				.then(()=>{})
 				.catch((e)=>{
 					console.log(e)
 				})
 			}
 			if(this.quin){
 				console.log(this.quin)
 				await this.database.cadastrarHorarios(4,this.nome)
 				.then(()=>{})
 				.catch((e)=>{
 					console.log(e)
 				})
 			}
 			if(this.sex){
 				console.log(this.sex)
 				await this.database.cadastrarHorarios(5,this.nome)
 				.then(()=>{})
 				.catch((e)=>{
 					console.log(e)
 				})
 			}
 			if(this.sab){
 				console.log(this.sab)
 				await this.database.cadastrarHorarios(6,this.nome)
 				.then(()=>{})
 				.catch((e)=>{
 					console.log(e)
 				})
 			}

 			if(this.dom){
 				console.log(this.dom)
 				await this.database.cadastrarHorarios(0,this.nome)
 				.then(()=>{})
 				.catch((e)=>{
 					console.log(e)
 				})
 			}

 			let ref = this;
 			await this.database.cadastrarMateria({nome:this.nome,
 				nivel:this.nivel,
 				cor:this.cor,questoes:this.questoes,peso:this.peso})
 			.then(()=>{
 				this.toast.success("MATERIA CRIADA COM SUCESSO!","SUCESSO");
 				this.routes.navigate(["minhas_materias"])
 			})
 			.catch((erro)=>{
 				this.toast.error(erro,"ERRO");
 			})
 		}
 		
	 }
	
	 /**
	  * @Method cancelar
	  * @description Retorna a janela 'minhas_materias' e descarta os dados inseridos pelo usuario 
	  */
 	cancelar(){
 		this.routes.navigate(["minhas_materias"])
 	}

}
