import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {FirebaseService} from "../firebase.service"
import {Router} from "@angular/router";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {ToolTip} from "tooltip.js";
declare var require:any;
declare var $:any;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
	public email;
	public senha;
	constructor(private toast:ToastsManager,private vcr:ViewContainerRef,private router:Router,private database:FirebaseService) {
		this.email = ""
		this.senha = ""
		this.toast.setRootViewContainerRef(this.vcr);
	}

	ngOnInit() {
		// // $('[data-toggle="tooltip"]').tooltip()
		// var email = require('emailjs');
		// var server = email.server.connect({
		// 	user:"caixolabsb@gmail.com",
		// 	password:"112407ff",
		// 	host: "smtp.gmail.com",
		// 	ssl: true
		// })
		// server.send({
		// 	text:    "i hope this works", 
		// 	from:    "caixolabsb@gmail.com",
		// 	to:      "chrystiangabriel1@hotmail.com",
		// 	cc:      "",
		// 	subject: "testing emailjs"
		// }, function(err, message) { console.log(err || message); });
		// var server = email.server.connect({
			// 	user:"caixolabsb@gmail.com",
			// 	password:"112407ff",
			// 	host: "smtp.gmail.com",
			// 	ssl: true
			// });


		}

		/**
		 * Captura o usuario e a senha digitada e verifica se esta correto no banco de dados.
		 * Verifica se o usuario é do tipo admin ou aluno
		 */
		login(){

			$('#modalCarregando').modal({
				show:true
			})
			let ref = this;
			if(this.email != "" && this.senha != ""){
				this.database.login(this.email,this.senha)
				.then(async function(){
					$('#modalCarregando').modal("hide")
					ref.toast.success("LOGIN EFETUADO COM SUCESSO!","SUCESSO")
					let uid = ref.database.getUsuario();
					if(uid == "o1JN49dTKUQLVmvMX5IHj0UKTFN2"){
						ref.router.navigate(["/admin"])
					}else{
						let materias:any = await ref.database.getListaMaterias();
						console.log(materias)
						if(materias.length > 0){
							ref.router.navigate(["/home"])
						}else{
							ref.router.navigate(["/home"])
						}
					}
				})
				.catch(function(erro){
					$('#modalCarregando').modal("hide")
					ref.toast.error(erro,"ERRO")

				})
			}else{
				$('#modalCarregando').modal("hide")
				ref.toast.error("TODOS OS CAMPOS SÃO OBRIGATORIOS!","ATENÇÃO")
			}
			$('#modalCarregando').modal("hide")
		}

		/**
		 * Envia o e-mail para o aluno possa trocar sua senha
		 */
		async esqueciASenha(){
			let e  = prompt("INISIRA O E-MAIL DE CADASTRO:")
			if(e != null){
				let a = await this.database.esqueciMinhaSenha(e)
				if(a){
					this.toast.success("E-MAIL ENVIADO COM SUCESSO","ATENÇÃO")
				}else{
					this.toast.error("E-MAIL NÃO CADASTRADO!","ATENÇÃO")
				}
			}

		}


	}
