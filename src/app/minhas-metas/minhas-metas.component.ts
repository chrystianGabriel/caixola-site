import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {FirebaseService} from "../firebase.service";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router,ActivatedRoute } from "@angular/router";
declare var require:any;
let md5 = require("js-md5");
@Component({
	selector: 'app-minhas-metas',
	templateUrl: './minhas-metas.component.html',
	styleUrls: ['./minhas-metas.component.css']
})
export class MinhasMetasComponent implements OnInit {
	public listaMaterias;
	public array_materias;
	public dia_semana;
	public hora;
	public minuto;
	public revisoes;
	public load;
	public materiasSelecionadas;

	constructor(private router:Router,private toast:ToastsManager,private vcr:ViewContainerRef,private database:FirebaseService) {
		let dia = new Date();
		this.dia_semana = dia.getDay()
		this.revisoes = new Array()
		this.toast.setRootViewContainerRef(vcr);
		this.load = true;
		this.materiasSelecionadas = new Array();

	}

	async ngOnInit() {
		this.array_materias = await this.database.getListaMaterias();
		this.preencherHorario()
		
	}
	
	/**
	 * Preenche a tela com as cores de cada materia
	 */
	peencherCoresModal(){
		let cores:any = document.getElementsByClassName("coresM");
		for(let i = 0; i < this.array_materias.length;i++){
			cores[i].style.color = this.array_materias[i].cor
		}

	}
	/**
	 * Preenche os cards com a cor de cada materia
	 */
	preencherCores(){
		let cores:any = document.getElementsByClassName("coresN");
		let cards:any = document.getElementsByClassName("cardN");
		for(let i = 0; i < this.listaMaterias.length;i++){
			cores[i].style.color = this.listaMaterias[i].cor
			let hex1= this.listaMaterias[i].cor[1] + this.listaMaterias[i].cor[2]
			let hex2 = this.listaMaterias[i].cor[3] + this.listaMaterias[i].cor[4]
			let hex3 = this.listaMaterias[i].cor[5] + this.listaMaterias[i].cor[6]
			cards[i].style.background =  "rgba(" + parseInt(hex1,16) + "," + parseInt(hex2,16) + "," + parseInt(hex3,16) + "," + "0.2)";
		}

	}

	/**
	 * Muda a lista de materias de acordo com o dia selecionado
	 */
	async mudarDia(){
		this.preencherHorario()

	}

	/**
	 * Remove a materia do dia da semana selecionado
	 */
	async removerMateria(materia){
		let deletar = confirm("Deseja realmente remover essa materia?")
		if(deletar){
			await this.database.deletarMateriaDia(this.dia_semana,md5(materia))
			this.preencherHorario();

		}
	}
	/**
	 * Preenche a tela, com os horarios de estudo que foram definidos pelo sistema
	 */
	async preencherHorario(){
		this.revisoes = new Array();
		let dia =  parseInt(this.dia_semana) - new Date().getDay();
		let dia_atual = new Date().getFullYear() + "-" + ((new Date().getMonth()+1) < 10? "0" + (new Date().getMonth()+1):(new Date().getMonth()+1)) + "-" + (new Date().getDate() < 10? "0" + new Date().getDate() + dia:new Date().getDate() + dia)
		this.listaMaterias = await this.database.getMateriasDiaSemana(this.dia_semana)
		console.log(this.listaMaterias)
		this.load = false;
		if(this.listaMaterias){

			for(let  i = 0; i < this.listaMaterias.length;i++){
				let revisoes:any = await this.database.getRevisoes(this.listaMaterias[i].nome)
				if(revisoes != false){
					console.log(dia_atual)
					if(revisoes.revisao24h == dia_atual){
						this.revisoes.push({materia: this.listaMaterias[i].nome,tema:revisoes.tema,tempo:"00:30:00"})
					}else if(revisoes.revisao7d == dia_atual){
						this.revisoes.push({materia: this.listaMaterias[i].nome,tema:revisoes.tema,tempo:"00:30:00"})
					}else if(revisoes.revisao30d == dia_atual){
						this.revisoes.push({materia: this.listaMaterias[i].nome,tema:revisoes.tema,tempo:"00:30:00"})
					}
				}
			}
			let tempo:any = await this.database.getMetaSemanal();
			if(tempo){
				this.calcularMeta(tempo)
			}else{
				confirm("É nescessario cadastrar uma meta semanal!")
				this.router.navigate(["meta_semanal"])
			}

		}else{
			this.load = true;
		}

	}

	/**
	 * Calcula o tempo de estudo nescessario para cada materia, de acordo com a meta cadastrada
	 */
	async calcularMeta(tempo){
		let totalQuestoes:any = 0;
		for(let  i = 0; i < this.listaMaterias.length;i++){
			totalQuestoes += Number(this.listaMaterias[i].questoes)*Number(this.listaMaterias[i].peso);
		}
		tempo = await this.database.getMetaSemanal()
		tempo = tempo.split(":")
		tempo = parseInt(tempo[0]) + parseInt(tempo[1])/60
		tempo = tempo/7
		tempo -= 0.5 * this.revisoes.length
		let peso_real_total:any = 0;

		for(let  i = 0; i < this.listaMaterias.length;i++){
			let peso_relativo:any = Number(this.listaMaterias[i].questoes)*Number(this.listaMaterias[i].peso)
			peso_real_total +=  ((peso_relativo/totalQuestoes)/this.listaMaterias[i].nivel)
		}
		for(let  i = 0; i < this.listaMaterias.length;i++){
			let peso_real =(Number(this.listaMaterias[i].questoes)*Number(this.listaMaterias[i].peso)/totalQuestoes)/this.listaMaterias[i].nivel
			let tempo_de_estudo:any = ((peso_real/peso_real_total)*tempo)
			let horas =parseInt(tempo_de_estudo)

			let minutos = (tempo_de_estudo - parseInt(tempo_de_estudo))*60

			this.listaMaterias[i].meta = ((horas < 10) ? "0" + horas:horas) + ":" + ((minutos < 10) ? "0" + minutos.toFixed(0):minutos.toFixed(0)) + ":00"
		}
	}

	mudou(materia){
		let key = md5(materia.nome)
		if(this.materiasSelecionadas[key] == undefined){
			this.materiasSelecionadas[key] = materia;

		}else{
			delete this.materiasSelecionadas[key]
			
		}
	}

	/**
	 * Adiciona materia ao dia da semana selecionada
	 */
	async adicionarMaterias(){
		for(let key in this.materiasSelecionadas){
			await this.database.cadastrarHorarios(this.dia_semana,this.materiasSelecionadas[key].nome);
		}
		this.preencherHorario();
	}
	/**
	 * Abre a tela de edição dos dados da materia e passa a materia por parametro
	 * 
	 */
	editarMateria(materia){
		//routerLink="/editar_materia" queryParams="{materia:materia}"
		this.router.navigate(["/editar_materia"],{ queryParams: materia})
	}

}
