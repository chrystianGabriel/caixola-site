import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {FirebaseService} from "../firebase.service";
declare var emailjs:any;
@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
	public menu;
	public email;
	public senha;
	public confirmar_senha;
	public mensagem;
	constructor(private toast:ToastsManager,private database:FirebaseService,private vcr:ViewContainerRef) {
		this.menu = "cadastrar";
		this.toast.setRootViewContainerRef(vcr)
	}

	ngOnInit() {
		// let usuarios = "igorvalir.f@gmail.com;deyla_fab@yahoo.com.br;alysson.guima@gmail.com;O.silva.duda@gmail.com;thiagonacfur@gmail.com;cmdeoliveira93@gmail.com;lu_albuquerque2005@hotmail.com;criiis95o@gmail.com;icarlos15@hotmail.com;julio@leaoassociados.com;brunobarros_316@hotmail.com;cbzerra12@gmail.com;allan.vieira@me.com;weberson.etb@gmail.com;leo_dias@live.com;fernandamome@gmail.com;romulocoe@hotmail.com;joaoprc27@hotmail.com;huyane2006@hotmail.com;pedro.halum@outlook.com;juliana.iglesiasmedeiros@hotmail.com;diogo.salles@hotmail.com;lilicamb@hotmail.com;maubgo@yahoo.com.br;vivianemouorao@hotmail.com;rodrigo.cavalcante33@gmail.com;marsg@stj.jus.br;vitorperdiz@gmail.com; millanenunes@gmail.com;lorenalima90@gmail.com;bernardorrp@gmail.com;bruna050592@gmail.com;totti500@gmail.com;bjverde@yahoo.com.br;henrique.alexandre@eb.mil.br;mcompositor@gmail.com;technelio@gmail.com;sandes.anapaula@gmail.com;andre_domingues1992@hotmail.com;gabrielrrp@gmail.com;rvmizuno@hotmail.com;al.luna.nogueira@gmail.com;marianalopesa@gmail.com;eueathayna@hotmail.com;alison.galvão@hotmail.com;thais_vs@hotmail.com;danielplattner@gmail.com;henrevasco@gmail.com;tatircoe@gmail.com;gsfr@hotmail.com;tatitrew@gmail.com;wendersonf@hotmail.com;juliocesar.cordeiro@outlook.com;tiagoalex82@gmail.com;felipe.rodrigues86@gmail.com;marcoaen@gmail.com;shirleycaldeira35@gmail.com;jubsdt@gmail.com;fmacielpessoa@gmail.com;luisa16_1@hotmail.com;hpantuzo@yahoo.com.br;mobatis@gmail.com;prisarkis@gmail.com;jaimejuris@hotmail.com;paulynhaa@gmail.com;idellalan@yahoo.com.br;morgananogueira05@gmail.com;nandalaricchia@gmail.com;sanzonowicz4@gmail.com;adelevalle@gmail.com;phillipemsouza@fmail.com;dutraalin@gmail.com;cyromarques123@gmail.com;valdemirbatista68@gmail.com;anaclaudia_oliveira@hotmail.com;barbaramsantanna@gmail.com;witorsousa8@gmail.com;viniciusbsampaio@gmail.com;juliana.cob@hotmail.com;suzanafc.adv@gmail.com;coutinho.rok@gmail.com;deborahanna@gmail.com;felipe.rd@hotmail.com;diulfc@gmail.com;thaityrufino@gmail.com;joanadarcsheyla@gmail.com;pedrosegadas@gmail.com;tathySouza17@hotmail.com;daniadamek@me.com;fer_nanda013@hotmail.com;eliarservorocha@me.com;vivianne_falcao@yahool.com.br;camilagm89@gmail.com;idellalan@yahoo.com.br;deborabergamasco@hotmail.com;betinatavaresavila@gmail.com;rdtchagas@gmail.com;vanessabic@gmail.com;leornardopessoa@hotmail.com;gagliardieduardo@gmail.com;jadillecorrea@gmail.com;fernandocunhaneves@gmail.com;lilian_recova@yahoo.com;gmarcia@globo.com;greice2b@gmail.com;laura.fpsg@gmail.com;thiagopnf@gmail.com;profissional.gabrielaelias@gmail.com;renato.cardoso.rcs@gmail.com;jessicauaqui@outlook.com;mmaria.britoas@gmail.com;gustavofaria.adv@gmail.com;fcoutinho.felipe@gmail.com;eliana.rocha200@gmail.com;nathsahea@gmail.com;carolinealvares@gmail.com";
		// let array = usuarios.split(";");
		// for(let i = 0; i < array.length;i++){
		// 	this.database.cadastrarUsuario(array[i],"@@12XXXC")
		// 	.then(()=>{
		// 		emailjs.send("gmail","template_NR7gpvQO",{
		// 			to_email:array[i]
		// 		});
		// 		console.log(array[i] + " Sucesso")
		// 	})
		// 	.catch((e)=>{
		// 		console.log(array[i] + ": " + e)
		// 	})
		// }
		// let emails = "chrystiangabriel1@hotmail.com;Igorvalim.f@gmail.com;Deyla_fab@yahoo.com.br;Alysson.guima@gmail.com;O.silva.duda@gmail.com;Thiagonacfur@gmail.com;Cmdeoliveira93@gmail.com;Lu_albuquerque2005@hotmail.com;Criiis95o@gmail.com;Icarlos15@hotmail.com;Julio@leaoassociados.com;Brunobarros_316@hotmail.com;cbzerra12@gmail.com;Allan.vieira@me.com;Weberson.etb@gmail.com;Leo_dias@live.com;Fernandamome@gmail.com;Romulocoe@hotmail.com;Joaoprc27@hotmail.com;Huyane2006@hotmail.com;Pedro.halum@outlook.com;Juliana.iglesiasmedeiros@hotmail.com;Diogo.salles@hotmail.com;lilicamb@hotmail.com;Maubgo@yahoo.com.br;Vivianemouorao@hotmail.com;Rodrigo.cavalcante33@gmail.com;Marsg@stj.jus.br;Vitorperdiz@gmail.com; millanenunes@gmail.com;Lorenalima90@gmail.com;bernardorrp@gmail.com;Bruna050592@gmail.com;Totti500@gmail.com;Bjverde@yahoo.com.br;Henrique.alexandre@eb.mil.br;mcompositor@gmail.com;Technelio@gmail.com;Sandes.anapaula@gmail.com;Andre_domingues1992@hotmail.com;Gabrielrrp@gmail.com;rvmizuno@hotmail.com;Al.luna.nogueira@gmail.com;Marianalopesa@gmail.com;Eueathayna@hotmail.com;Alison.galvão@hotmail.com;Thais_vs@hotmail.com;danielplattner@gmail.com;henrevasco@gmail.com;Tatircoe@gmail.com;gsfr@hotmail.com;tatitrew@gmail.com;Wendersonf@hotmail.com;Juliocesar.cordeiro@outlook.com;Tiagoalex82@gmail.com;Felipe.rodrigues86@gmail.com;marcoaen@gmail.com;Shirleycaldeira35@gmail.com;jubsdt@gmail.com;fmacielpessoa@gmail.com;Luisa16_1@hotmail.com;Hpantuzo@yahoo.com.br;mobatis@gmail.com;Prisarkis@gmail.com;jaimejuris@hotmail.com;paulynhaa@gmail.com;Idellalan@yahoo.com.br;Morgananogueira05@gmail.com;Nandalaricchia@gmail.com;Sanzonowicz4@gmail.com;Adelevalle@gmail.com;phillipemsouza@fmail.com;dutraalin@gmail.com;cyromarques123@gmail.com;valdemirbatista68@gmail.com;anaclaudia_oliveira@hotmail.com;barbaramsantanna@gmail.com;witorsousa8@gmail.com;viniciusbsampaio@gmail.com;juliana.cob@hotmail.com;suzanafc.adv@gmail.com;coutinho.rok@gmail.com;deborahanna@gmail.com;felipe.rd@hotmail.com;diulfc@gmail.com;thaityrufino@gmail.com;joanadarcsheyla@gmail.com;pedrosegadas@gmail.com;TathySouza17@hotmail.com;daniadamek@me.com;Fer_nanda013@hotmail.com;eliarservorocha@me.com;vivianne_falcao@yahool.com.br;camilagm89@gmail.com;idellalan@yahoo.com.br;deborabergamasco@hotmail.com;betinatavaresavila@gmail.com;rdtchagas@gmail.com;vanessabic@gmail.com;leornardopessoa@hotmail.com;gagliardieduardo@gmail.com;jadillecorrea@gmail.com;fernandocunhaneves@gmail.com;lilian_recova@yahool.com;gmarcia@globo.com;greice2b@gmail.com;laura.fpsg@gmail.com;thiagopnf@gmail.com;profissional.gabrielaelias@gmail.com;renato.cardoso.rcs@gmail.com";
		// let array = emails.split(";");
		// for(let i = 0; i < array.length; i++){
		// 	emailjs.send("gmail","template_NR7gpvQO",{
		// 		to_email:array[i]
		// 	});
		// }
		
	}

	/**
	 * @method opcoes
	 * @description Metodo responsavel por receber a opção que foi selecionado no menu
	 * @param opcao 
	 */
	opcoes(opcao){
		this.menu = opcao;
	}

	/**
	 * @method cadastrarUsuario
	 * @description Metodo que insere o usuario no banco de dados e envia um e-mail para que o usuario possa trocar sua senha
	 *
	 */
	cadastrarUsuario(){
		if(this.senha == this.confirmar_senha){
			
			
			this.database.cadastrarUsuario(this.email,this.senha)
			.then(()=>{
				this.toast.success("CADASTRO EFETUADO COM SUCESSO!","SUCESSO!")
				emailjs.send("gmail","template_NR7gpvQO",{
					to_email:this.email
				});
			})
			.catch((e)=>{
				this.toast.error(e,"ERRO!")
			})
		}else{
			this.toast.error("AS SENHAS DIGITADAS DEVEM SER IGUAIS!","ERRO!")
		}

	}

	/**
	 * @method enviarMensagem
	 * @description Metodo que permite que o administrador envie uma notificação de push para todos os usuarios do sistema.
	 */
	enviarMensagem(){
		if(this.mensagem != ""){
			
			let not = confirm("Deseja enviar a notificação para todos os usuarios?")
			if(not){
				this.database.enviarMensagem(this.mensagem)
			}
		}else{
			alert("É NECESSÁRIO DIGITAR UMA MENSAGEM")
		}

	}

}
