import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../firebase.service";
import { Router,ActivatedRoute } from "@angular/router";
declare var $:any;
@Component({
	selector: 'app-relatorio',
	templateUrl: './relatorio.component.html',
	styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {
	public data;
	public listaEstudos;
	public nome_materia;
	public cor;
	public tempoTotal;
	public descricao;
	constructor(private params:ActivatedRoute,private database:FirebaseService) {
		let aux = new Date()
		this.data = aux.getFullYear()
		if (aux.getDate() < 10){
			this.data = "-0" + aux.getDate()
		}else{
			this.data += "-" + aux.getDate()
		}
		if(aux.getMonth() < 9){
			let num = aux.getMonth() + 1
			this.data += "-0" + num
		}else{
			let num = aux.getMonth() + 1
			this.data += "-" + num
		}
		this.params.queryParams.subscribe(data=>{
			this.nome_materia = data.nome;
			this.cor = data.cor
		})
	}

	async ngOnInit() {
		this.listaEstudos = await this.database.getEstudos(this.nome_materia);
		console.log(this.listaEstudos)
		let header:any = document.getElementsByClassName("destacar")
		header[0].style.background = this.cor
		header[1].style.background = this.cor
		header[2].style.background = this.cor
		header[3].style.background = this.cor
		header[4].style.background = this.cor
		this.tempoTotal = this.calcularTempoTotalDeEstudos();
		
	}
	/**
	 * Soma todos os horarios de estudo cadastrados e soma-os para obter o tempo total de estudos
	 */
	calcularTempoTotalDeEstudos(){
		let hora:any  = 0
        let minutos:any = 0
        let segundos:any = 0;
        for(let key in this.listaEstudos){
          let estudoAnterior = this.listaEstudos[key]
          let tempoAnterior = estudoAnterior.tempo.split(":");
          hora += Number(tempoAnterior[0])
          minutos += Number(tempoAnterior[1])
          segundos += Number(tempoAnterior[2])
          hora += Math.round(minutos/60)
          minutos += Math.round(segundos/60)
        }
        if(hora < 10){
          hora = "0" + hora.toString();

        }
        if(minutos < 10){
          minutos = "0" + minutos.toString();

        }
        if(segundos < 10){
        	segundos = "0" + segundos.toString();
        }
        let tempoTotal = hora + ":" + minutos + ":" + segundos
        return tempoTotal;
	}

	/**
	 * Abre a modal, com os detalhes do estudo selecionado
	 * 
	 */
	verDescricao(descricao){
		this.descricao = descricao
		$('#modalMetaSemanal').modal({
			show:true
		})
	}

}
