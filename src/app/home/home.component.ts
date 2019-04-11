import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../firebase.service";

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	public dataAtual;
	public listaMaterias;
	public materia_mais_estudada; 
	public materia_menos_estudada;
	public materia_menos_acertos; 
	public materia_mais_acertos;
	
	/**
	 *  @description Calcula as materias mais estudadas, menos estudadas, com mais acertos e menos acertos 
	 *  @param database Injeta o service do firebase
	 */
	constructor(private database:FirebaseService) { 
		let aux = new Date()
		this.dataAtual = ""
		if (aux.getDate() < 10){
			this.dataAtual = "0" + aux.getDate()
		}else{
			this.dataAtual += aux.getDate()
		}
		if(aux.getMonth() < 9){
			let num = aux.getMonth() + 1
			this.dataAtual += "/0" + num
		}else{
			let num = aux.getMonth() + 1
			this.dataAtual += "/" + num
		}
		this.dataAtual += "/" + aux.getFullYear()
		this.materia_mais_estudada = {tempoLabel:"--:--",tempo:Number.MIN_VALUE,nome:"-"}
		this.materia_menos_estudada = {tempoLabel:"--:--",tempo:Number.MAX_VALUE,nome:"-"}
		this.materia_menos_acertos = {porcentagemLabel:"--",porcentagem:Number.MAX_VALUE,nome:"--"}
		this.materia_mais_acertos = {porcentagemLabel:"--",porcentagem:Number.MIN_VALUE,nome:"--"}
		this.listaMaterias = [];
		
	}

	/**
	 * Insere os dados das materias na tela para o usuario, incializando os labels
	 */
	async ngOnInit() {
		let ref = this
		let data = new Date();
		ref.listaMaterias = await ref.database.getMateriasDiaSemana(new Date().getDay());

		let dia_atual = new Date().getFullYear() + "-" + ((new Date().getMonth()+1) < 10? "0" + (new Date().getMonth()+1):(new Date().getMonth()+1)) + "-" + (new Date().getDate() < 10? "0" + new Date().getDate():new Date().getDate())
		let porcentagem;
		for(let i = 0; i < ref.listaMaterias.length;i++){
			let estudos:any = await ref.database.getEstudosData(ref.listaMaterias[i].nome,dia_atual);
			if(estudos){

				let tempo = estudos.tempo.split(":");
				tempo = parseInt(tempo[0]) + parseInt(tempo[1])/60
				if(estudos.exercicios != "" && estudos.acertos != ""){
					porcentagem = ((parseInt(estudos.acertos)*100)/parseInt(estudos.exercicios)).toFixed(0)
				}

				if(tempo > ref.materia_mais_estudada.tempo){
					ref.materia_mais_estudada.tempoLabel = estudos.tempo
					ref.materia_mais_estudada.tempo = tempo
					ref.materia_mais_estudada.nome = ref.listaMaterias[i].nome

				}
				if(tempo < ref.materia_menos_estudada.tempo){
					ref.materia_menos_estudada.tempoLabel = estudos.tempo
					ref.materia_menos_estudada.tempo = tempo
					ref.materia_menos_estudada.nome = ref.listaMaterias[i].nome

				}
				if(porcentagem > ref.materia_mais_acertos.porcentagem){
					ref.materia_mais_acertos.porcentagemLabel = porcentagem + "%"
					ref.materia_mais_acertos.porcentagem = porcentagem
					ref.materia_mais_acertos.nome = ref.listaMaterias[i].nome
				}
				if(porcentagem < ref.materia_menos_acertos.porcentagem){
					ref.materia_menos_acertos.porcentagemLabel = porcentagem + "%"
					ref.materia_menos_acertos.porcentagem = porcentagem
					ref.materia_menos_acertos.nome = ref.listaMaterias[i].nome
				}
			}

		}

		
	}

	/**
	 * Colore as materias mais estudadas de verde e as menos estudadas de vermelho
	 * O comportamento se repete para a materia menos estudada e a menos estudada
	 */
	preencherCores(){
		let cores:any = document.getElementsByClassName("cores");
		for(let i = 0; i < this.listaMaterias.length;i++){
			cores[i].style.color = this.listaMaterias[i].cor
		}
	}

}
