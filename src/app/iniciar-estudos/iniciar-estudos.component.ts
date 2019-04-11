import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {FirebaseService} from "../firebase.service";
import { Router,ActivatedRoute } from "@angular/router";
declare var cronometro:any
let pause = false;
declare var cronometro;
let alert;

@Component({
	selector: 'app-iniciar-estudos',
	templateUrl: './iniciar-estudos.component.html',
	styleUrls: ['./iniciar-estudos.component.css']
})
export class IniciarEstudosComponent implements OnInit {

	public tipoTempo;
	public tipoEstudo;
	public materia;
	public array_materias;
	public data;
	public revisoes;
	public dataAtual;
	public descricao;
	public tema;
	public tempo;
	public hora;
	public minuto;
	public alerta;
	public exercicios;
	public acertos;
	constructor(public router:Router,public database:FirebaseService,public toastr: ToastsManager, vcr: ViewContainerRef) { 
		this.toastr.setRootViewContainerRef(vcr);
		this.tipoEstudo = "teoria"
		this.materia = "0"
		this.tipoTempo = "cronometro"
		this.revisoes = "nao"
		this.descricao = "";
		this.tema= ""
		this.hora = ""
		this.minuto = ""
		this.alerta = false;
		this.exercicios = 0;
		this.acertos = 0;
		let aux = new Date()
		this.dataAtual = aux.getFullYear()
		if(aux.getMonth() < 9){
			this.dataAtual += "-0" + (aux.getMonth()+1)
		}else{
			this.dataAtual += "-" + (aux.getMonth()+1)
		}
		if (aux.getDate() < 10){
			this.dataAtual += "-0" + (aux.getDate())
		}else{
			this.dataAtual += "-" + (aux.getDate())
		}

		this.data = this.dataAtual
		

	}

	/**
	 * Inicializa o cromonometro da pagina e preenche a interface, por exemplo, insere a lista de 
	 * materias na combobox
	 */
	async ngOnInit() {
		
		this.array_materias = await this.database.getListaMaterias();
		for(let i = 0; i < this.array_materias.length;i++){
			let select:any = document.getElementById("selectMateria")
			let option = document.createElement("option")
			option.text = this.array_materias[i].nome
			select.add(option)
		}
		let menu = document.getElementsByClassName("navbar")[0]
		let a   = ()=>{
			if(this.tempo == undefined){
				menu.removeEventListener("click",a,false);
			}else{
				let c = confirm("TEM CERTEZA QUE DESEJA CANCELAR O ESTE ESTUDO?")
				if(c){
					menu.removeEventListener("click",a,false);
					clearInterval(cronometro)
					cronometro = undefined
				}else{
					this.router.navigate(["/iniciar_estudos"])
				}
			}
		}
		menu.addEventListener("click",a,false)

	}

	deletar(){
		let menu = document.getElementsByClassName("navbar")[0]
		let cancelarEstudo   = ()=>{
			if(this.tempo == undefined){
				menu.removeEventListener("click",a,false);
			}else{
				let c = confirm("TEM CERTEZA QUE DESEJA CANCELAR O ESTE ESTUDO?")
				if(c){
					menu.removeEventListener("click",a,false);
					clearInterval(cronometro)
					cronometro = undefined
				}else{
					this.router.navigate(["/iniciar_estudos"])
				}
			}
		}
		menu.removeEventListener("click",cancelarEstudo,false)
	}

	/**
	 * Muda o 'tipo de tempo', onde retira o cronometro e permite que o usuario
	 * horarios no formato hh:mm
	 */
	mudarTipoTempo(e){
		this.tipoTempo = e;
	}

	/**
	 * Inicia o cronometro e controla as labels na tela
	 */
	iniciarEstudo(){
		if(cronometro == undefined){

			this.tempo = ""
			var s = 1;
			var m = 0;
			var h = 0;
			let ref = this;
			console.log(cronometro)
			cronometro = setInterval(function(){
				if(!pause){
					let btn:any = document.getElementById("btnIniciar")
					btn.name = "pause"
					btn.innerHTML = "&nbsp;&nbsp;<strong>PAUSAR</strong>"
					ref.tempo = ""
					if (s == 60) { m++; s = 0; }
					if (m == 60) { h++; s = 0; m = 0; }
					if (h < 10) ref.tempo +=  "0" + h + ":"; else ref.tempo += h + ":";
					if (m < 10) ref.tempo += "0" + m + ":"; else ref.tempo += m + ":";
					if (s < 10) ref.tempo += "0" + s; else ref.tempo += s;	
					s++;
					document.getElementById("tempo").innerHTML = ref.tempo
				}
			},1000)


		}else{
			pause = !pause
			let a:any = document.getElementById("btnIniciar")
			a.name = "pause"
			document.getElementById("btnIniciar").innerHTML = "&nbsp;&nbsp;<strong>RETOMAR</strong>"
		}
	}

	/**
	 * Insere o estudo no banco de dados
	 */
	async gravar(){
		if(this.materia != "0"){
			if(this.tipoTempo == "cronometro"){
				let tempo = this.tempo.split(":")
				if(parseInt(tempo[1]) < 1){
					let ref = this
					ref.toastr.warning("É NESCESSARIO ESTUDAR AO MENOS 1 MINUTO PARA PODER GRAVA-LO","ATENÇÃO!",{toastLife:3000})
					return;
				}else{
					clearInterval(cronometro)
					cronometro = undefined
					console.log(this.tempo);
					let a:any = document.getElementById("btnIniciar")
					a.name = "play"
					document.getElementById("btnIniciar").innerHTML = "&nbsp;&nbsp;<strong>Iniciar</strong>"


				}

			}else{
				console.log(this.tempo)
				if(this.minuto > 1){
					this.tempo = this.hora + ":" + this.minuto + ":00"
				}else{
					let ref = this
					ref.toastr.warning("É NESCESSARIO ESTUDAR AO MENOS 1 MINUTO PARA PODER GRAVA-LO","ATENÇÃO!",{toastLife:3000})
					return;
				}
			}
			if(this.revisoes == "sim"){
				if(this.tema !=""){
					await this.database.cadastrarRevisoes(this.materia,this.tema,this.data)
					.catch((erro)=>{
						let ref = this
						ref.toastr.error(erro,"ERRO!",{toastLife:3000})
					});
					console.log(this.tempo)
					this.database.cadastrarEstudo({tempo:this.tempo,tipo:this.tipoEstudo,tema:this.tema,descricao:this.descricao,revisao:this.revisoes,exercicios:this.exercicios,acertos:this.acertos},this.data,this.materia)
					.then(()=>{
						let ref = this
						ref.toastr.success("TEMPO DE ESTUDO SALVO COM SUCESSO!","SUCESSO!",{toastLife:3000})
					})
					.catch((erro)=>{
						let ref = this
						ref.toastr.error(erro,"ERRO!",{toastLife:3000})

					})
					this.tempo = undefined;
				}else{
					let ref = this
					ref.toastr.error("É NESCESSARIO INSERIR UM TEMA PARA PODER CRIAR REVISÕES!","Ops! :(",{toastLife:3000})
					pause = true;
				}

			}else{
				console.log(this.tempo)
				this.database.cadastrarEstudo({tempo:this.tempo,tipo:this.tipoEstudo,tema:this.tema,descricao:this.descricao,revisao:this.revisoes,exercicios:this.exercicios,acertos:this.acertos},this.data,this.materia)
				.then(()=>{
					let ref = this
					ref.toastr.success("TEMPO DE ESTUDO SALVO COM SUCESSO!","SUCESSO!",{toastLife:3000})
				})
				.catch((erro)=>{
					let ref = this
					ref.toastr.error(erro,"ERRO!",{toastLife:3000})

				})
				this.tempo = undefined;
			}



		}else{
			let ref = this
			ref.toastr.error("É NESCESSARIO SELECIONAR UMA MATERIA PARA GRAVAR O ESTUDO!","Ops! :(",{toastLife:3000})
			pause = true;
		}

	}

	/**
	 * Encerra o cronometro e cancela o estudo, descartando os dados
	 */
	cancelar(){
		let cancelar = confirm("TEM CERTEZA QUE DESEJA CANCELAR? TODOS OS DADOS DIGITADOS E O TEMPO SERÃO APAGADOS!");
		if(cancelar){
			clearInterval(cronometro)
			cronometro = undefined
			let a:any = document.getElementById("btnIniciar")
			a.name = "play"
			document.getElementById("btnIniciar").innerHTML = "&nbsp;&nbsp;<strong>Iniciar</strong>"
			document.getElementById("tempo").innerHTML =  "00:00:00"
			this.tipoEstudo = "teoria"
			this.materia = "0"
			this.tipoTempo = "cronometro"
			this.revisoes = "sim"
			this.descricao = "";
			this.tema= ""
			this.hora = ""
			this.minuto = ""
			this.alerta = false;
			this.exercicios = 0;
			this.acertos = 0;
		}
	}

	/**
	 * Programa uma mensagem de alerta de acordo que com o que o usuario inserir,
	 * tambem é inserido um aviso sonoro, para avisar o usuario
	 */
	programarAlerta(){
		let checkbox:any = document.getElementById("checkAlerta");
		if(checkbox.checked){
			let tempo = prompt("DIGITE OS MINUTOS PARA QUE VOCÊ SEJA NOTIFICADO!");
			if(parseInt(tempo) && parseInt(tempo) > 0){
				if(cronometro == undefined){
					this.toastr.warning("VOCÊ DEVE DISPARAR O CRONOMETRO PRIMEIRO ANTES DE INICIAR O ALARME!","ATENÇÃO!",{toastLife:3000})
					checkbox.checked = false;
				}else{
					this.toastr.success("ALARME CRIADO COM SUCESSO!","SUCESSO!",{toastLife:3000})
					let ref = this;
					alert = setTimeout(()=>{
						let audio:any = document.getElementById("alarme");
						audio.play();
						ref.iniciarEstudo();
					},parseInt(tempo)*60000)
				}

			}else{
				this.toastr.error("O TEMPO INSERIDO É INVALIDO","ERRO!",{toastLife:3000})
				checkbox.checked = false;
			}
		}else{
			let confirmar = confirm("TEM CERTEZA QUE DESEJA CACELAR O ALARME?")
			if(confirmar){
				clearTimeout(alert);
				
			}
		}
		
	}

}
