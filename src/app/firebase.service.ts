import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
declare var require:any;
declare var firebase:any;
declare var OneSignal:any;
let md5 = require("js-md5");
@Injectable()
export class FirebaseService {
  constructor(private http:HttpClient) {

  }
  getUsuario(){
    return firebase.auth().currentUser.uid
  }
  cadastrarMateria(materia){
    let ref = this;
    return new Promise(async function(sucesso,erro){
      //Verifica se a materia já está cadastrada
      let existe:any  = await ref.getMateria(md5(materia.nome));
      if(existe){
        erro("MATERIA JÁ CADASTRADA!")
      }


      firebase.database().ref(firebase.auth().currentUser.uid + "/materias/" + md5(materia.nome)).set(materia)
      .then(function(e){
        sucesso(true);
      })
      .catch(function(e){

        erro(e);
      });

    });

  }

  cadastrarEstudo(estudo,data,materia){
    let ref = this
    return new Promise( async function(sucesso,erro){
      firebase.database().ref(firebase.auth().currentUser.uid  + '/estudos/' + md5(materia) + "/" + data).push(estudo)
      .then(function(){
        sucesso(true)
      })
      .catch(function(){
        erro("ERRO! NÃO FOI POSSIVEL CADASTRAR O TEMPO DE ESTUDO")
      })  
    })
  }
  getTodosEstudos(data,materia){
    return new Promise(async (sucesso,erro)=>{
      let estudoAnterior:any = await firebase.database().ref(firebase.auth().currentUser.uid  + '/estudos/' + md5(materia) + "/" + data).once("value");
      if(estudoAnterior.val() != null){
        let estudos = estudoAnterior.val();
        let hora:any  = 0
        let minutos:any = 0
        for(let key in estudos){

          estudoAnterior = estudos[key]
          let tempoAnterior = estudoAnterior.tempo.split(":");
          hora += Number(tempoAnterior[0])
          minutos += Number(tempoAnterior[1])
          hora += Math.floor(minutos/60)
        }
        if(hora < 10){
          hora = "0" + hora.toString();

        }
        if(minutos < 10){
          minutos = "0" + minutos.toString();

        }
        let tempoTotal = hora + ":" + minutos + ":00"
        let mat:any = await this.getMateria(md5(materia))
        mat.tempo = tempoTotal
        sucesso(mat)
      }else{
        sucesso(false)
      }
    })
  }
  cadastrarTema(tema,materia){
    return new Promise(function(sucesso,erro){
      firebase.database().ref(firebase.auth().currentUser.uid  + '/temas/' + materia).set(tema)
      .then(function(){
        sucesso(true)
      })
      .catch(function(){
        erro(false)
      })
    })
  }

  login(email,senha){
    return new Promise(function(sucesso,erro){
      firebase.auth().signInWithEmailAndPassword(email, senha)
      .then(function(){
        sucesso(true)
      })
      .catch(function(error) {
        if(error.code == "auth/invalid-email"){
          erro("ERRO! O E-MAIL DIGITADO É INVALIDO!")
        }else if(error.code == "auth/user-disabled"){
          erro("ERRO! O USUÁRIO FOI DESATIVADO!")
        }else if(error.code == "auth/user-not-found"){
          erro("ERRO! E-MAIL NÃO ENCONTRADO!")
        }else if(error.code == "auth/wrong-password"){
          erro("ERRO! SENHA DIGITADA INCORRETA!")
        }

      });
    })
  }
  cadastrarHorarios(dia_semana,materia){
    let ref = this;
    return new Promise(async function(sucesso,erro){
      let existe = await ref.deletarMateriaDia(dia_semana,md5(materia))
      firebase.database().ref(firebase.auth().currentUser.uid  + '/horarios/' + dia_semana).push({materia:md5(materia)})
      .then(function(){
        sucesso(true)
      })
      .catch(function(){
        erro("ERRO! NÃO FOI POSSIVEL CADASTRAR O TEMPO DE ESTUDO")
      })
    })
  }

  getMateria(materiaCodgio){
    return new Promise(function(sucesso,erro){
      firebase.database().ref(firebase.auth().currentUser.uid  + '/materias/' + materiaCodgio).once('value')
      .then(function(materia){
        if(materia.val() != null){
          sucesso(materia.val())
        }
        else{
          sucesso(false)
        }
      })

    })
  }

  getListaMaterias(){
    return new Promise(function(sucesso,erro){
      firebase.database().ref(firebase.auth().currentUser.uid  + '/materias/').once('value')
      .then(function(materias){
        if(materias.val() != null){
          let aux = materias.val()
          let array_materias = new Array()
          for(let key in aux){
            array_materias.push(aux[key])
          }
          sucesso(array_materias)

        }
        else{
          sucesso(false)
        }
      })

    })
  }
  getMateriasDiaSemana(dia_semana){
    let ref = this;
    return new Promise(function(sucesso,erro){
      firebase.database().ref(firebase.auth().currentUser.uid  + '/horarios/' + dia_semana).once("value")
      .then(async materias=>{
        if(materias.val()){
          let aux = materias.val()
          let array_materia = new Array()
          for(let key in aux){
            let materia = await ref.getMateria(aux[key].materia)
            if(materia != false){
              array_materia.push(materia)
            }
            
          }
          sucesso(array_materia)
        }else{
          sucesso(false)
        }
      })
    })
  }
  deletarMateriaDia(dia_semana,codigo_materia){
    return new Promise((sucesso,erro)=>{
      firebase.database().ref(firebase.auth().currentUser.uid  + '/horarios/' + dia_semana).once('value')
      .then((materia)=>{
        let materias = materia.val()
        for(let key in materias){
          if(materias[key].materia == codigo_materia){
            delete materias[key]
          }
        }
        firebase.database().ref(firebase.auth().currentUser.uid  + '/horarios/' + dia_semana).set(materias)
        sucesso(true)
      })
      .catch(()=>{
        erro(false)
      })
    })
  }
  deletarMateria(materia_nome){
    let ref =this;
    return new Promise(async (sucesso,erro)=>{
      for(let i = 0; i < 7; i++){
        await ref.deletarMateriaDia(i,md5(materia_nome))
      }
      firebase.database().ref(firebase.auth().currentUser.uid  + '/materias/').once('value')
      .then(async (materias)=>{
        let materia = materias.val();
        for(let key in materia){
          if(materia[key].nome == materia_nome){
            delete materia[key]
          }

        }
        await firebase.database().ref(firebase.auth().currentUser.uid  + '/materias/').set(materia)
        sucesso(true)
      })
      .catch(e=>{
        erro(e)
      })
    })
  }
  getEstudos(nome_materia){
    let ref = this;
    return new Promise(function(sucesso,erro){
      firebase.database().ref(firebase.auth().currentUser.uid + "/estudos/" + md5(nome_materia)).once('value')
      .then((estudos)=>{
        if(estudos.val() != null){
          let array_estudos = new Array();
          let aux = estudos.val();
          for(let key in aux){
            for(let key1 in aux[key]){

              aux[key][key1].data =  key.substring(8,10) +  '/' + key.substring(5,7)  + '/' + key.substring(0,4);
              array_estudos.push(aux[key][key1]);
            }
          }

          sucesso(array_estudos);
        }else{
          sucesso(false)
        }



      })
      .catch((e)=>{
        erro(e)
      })
    });
  }
  getEstudosData(nome_materia,data){
    let ref = this;
    return new Promise(function(sucesso,erro){
      firebase.database().ref(firebase.auth().currentUser.uid + "/estudos/" + md5(nome_materia) + "/" + data).once('value')
      .then((estudos)=>{
        if(estudos.val() != null){
          let estudo = estudos.val()
          let key = Object.keys(estudo)[0]

          sucesso(estudo[key]);
        }else{
          sucesso(false)
        }



      })
      .catch((e)=>{
        erro(e)
      })
    });

  }

  editMateria(novaMateria,materiaAntiga){
    return new  Promise(async (sucesso,erro)=>{
      if(novaMateria.nome != materiaAntiga.nome){
        await firebase.database().ref(firebase.auth().currentUser.uid  + '/materias/' + md5(materiaAntiga.nome)).remove()
        await this.cadastrarMateria(novaMateria);
        for(let i = 0; i < 7; i++){
          await firebase.database().ref(firebase.auth().currentUser.uid  + '/horarios/' + i).once('value')
          .then((horarios)=>{
            let horariosAux = horarios.val();
            for(let key in horariosAux){
              if(md5(materiaAntiga.nome) == horariosAux[key].materia){
                horariosAux[key].materia = md5(novaMateria.nome)
              }
            }
            firebase.database().ref(firebase.auth().currentUser.uid  + '/horarios/' + i).set(horariosAux);
          })
        }
        await firebase.database().ref(firebase.auth().currentUser.uid  + '/estudos/' + md5(materiaAntiga.nome)).once('value')
        .then(async (estudos)=>{
          let novoEstudo = estudos.val();
          await firebase.database().ref(firebase.auth().currentUser.uid  + '/estudos/' + md5(materiaAntiga.nome)).remove()
          firebase.database().ref(firebase.auth().currentUser.uid  + '/estudos/' + md5(novaMateria.nome)).set(novoEstudo)

        })
        sucesso(true);
      }else{
        firebase.database().ref(firebase.auth().currentUser.uid  + '/materias/' + md5(materiaAntiga.nome)).set(novaMateria)
        .then(()=>{
          sucesso("AS ALTERAÇÕES FORAM SALVAS COM SUCESSO")
        })
        .catch(()=>{
          erro("HOUVE ALGUM ERRO AO TENTAR ALTERAR, POR FAVOR, TENTE NOVAMENTE!")
        })
      }
    })

  }
  cadastrarMetaSemanal(horas,minutos){
    return new Promise((sucesso,erro)=>{
      firebase.database().ref(firebase.auth().currentUser.uid + "/meta_semanal").set({meta:(parseInt(horas) < 10?"0" + horas:horas) + ":" + (parseInt(minutos) < 10? "0" + minutos:minutos) + ":00"})
      .then(()=>{
        sucesso(true)
      })
      .catch(()=>{
        erro("NÃO FOI POSSIVEL SALVAR META SEMANAL,POR FAVOR, TENTE NOVAMENTE!");
      })
    })


  }

  getMetaSemanal(){
    return new Promise((sucesso,erro)=>{
      firebase.database().ref(firebase.auth().currentUser.uid + "/meta_semanal").once('value')
      .then((meta)=>{
        if(meta.val()){
          sucesso(meta.val().meta)
        }else{
          sucesso(false)
        }
      })
      .catch(()=>{
        erro(false)
      })
    })
  }
  cadastrarRevisoes(nome_materia,tema,data){

    return new Promise(async (sucesso,erro)=>{
      let revisoes:any = await this.getRevisoes(nome_materia)
      for(let key in revisoes){
        if(revisoes[key].tema == tema){
          erro("JÁ EXISTE REVISÕES PARA ESTA MATERIA,ELAS SERÃO MANTIDAS");
          return;
        }
      }

      let revisao24h:any = new Date(new Date().setDate(new Date(data).getDate() + 2))
      let revisao7d:any = new Date(new Date().setDate(new Date(data).getDate() + 8))
      let revisao30d:any = new Date(new Date().setDate(new Date(data).getDate() + 31))
      revisao24h = revisao24h.getFullYear() + "-" + (revisao24h.getMonth()+1 < 10 ? "0" + (revisao24h.getMonth()+1):revisao24h.getMonth()+1) + "-" + (revisao24h.getDate()+1 < 10? "0" + revisao24h.getDate(): revisao24h.getDate())
      revisao7d = revisao7d.getFullYear() + "-" + (revisao7d.getMonth()+1 < 10 ? "0" + (revisao7d.getMonth()+1):revisao7d.getMonth()+1) + "-" + (revisao7d.getDate() < 10? "0" + revisao7d.getDate():revisao7d.getDate())
      revisao30d = revisao30d.getFullYear() + "-" + (revisao30d.getMonth()+1 < 10 ? "0" + (revisao30d.getMonth()+1):revisao30d.getMonth()+1) + "-" + (revisao30d.getDate() < 10? "0" + revisao30d.getDate():revisao30d.getDate())
      firebase.database().ref(firebase.auth().currentUser.uid + "/revisoes/" + md5(nome_materia)).push({revisao24h:revisao24h,revisao7d:revisao7d,revisao30d:revisao30d,tema:tema})
      .then(()=>{

        sucesso(true)
      })
      .catch((e)=>{

        erro(e)
      })
      

    })


  }
  getRevisoes(nome_materia){

    return new Promise((sucesso,erro)=>{
      firebase.database().ref(firebase.auth().currentUser.uid + "/revisoes/" + md5(nome_materia)).once('value')
      .then((revisao)=>{
        if(revisao.val() != null){
          sucesso(revisao.val())
        }else{
          sucesso(false)
        }
      })
      .catch(()=>{
        erro(false)
      })
    })
  }
  cadastrarUsuario(email,senha){
    return new Promise((sucesso,erro)=>{
      firebase.auth().createUserWithEmailAndPassword(email,senha)
      .then((user)=>{

        this.cadastrarMateria({nome:"Português",
          nivel:1,
          cor:"#CC0000",questoes:20,peso:2})
        this.cadastrarHorarios(0,"Português");
        this.cadastrarHorarios(1,"Português");
        this.cadastrarHorarios(2,"Português");
        this.cadastrarHorarios(3,"Português");
        this.cadastrarHorarios(4,"Português");
        this.cadastrarHorarios(5,"Português");
        this.cadastrarHorarios(6,"Português");
        this.cadastrarMateria({nome:"Direito Administrativo",
          nivel:1,
          cor:"#00CC00",questoes:20,peso:2})
        this.cadastrarHorarios(0,"Direito Administrativo");
        this.cadastrarHorarios(1,"Direito Administrativo");
        this.cadastrarHorarios(2,"Direito Administrativo");
        this.cadastrarHorarios(3,"Direito Administrativo");
        this.cadastrarHorarios(4,"Direito Administrativo");
        this.cadastrarHorarios(5,"Direito Administrativo");
        this.cadastrarHorarios(6,"Direito Administrativo");
        this.cadastrarMateria({nome:"Direito Constitucional",
          nivel:1,
          cor:"#CC33CC",questoes:20,peso:2})
        this.cadastrarHorarios(0,"Direito Constitucional");
        this.cadastrarHorarios(1,"Direito Constitucional");
        this.cadastrarHorarios(2,"Direito Constitucional");
        this.cadastrarHorarios(3,"Direito Constitucional");
        this.cadastrarHorarios(4,"Direito Constitucional");
        this.cadastrarHorarios(5,"Direito Constitucional");
        this.cadastrarHorarios(6,"Direito Constitucional");
        this.cadastrarMateria({nome:"Atualidades",
          nivel:1,
          cor:"#999999",questoes:20,peso:2})
        this.cadastrarHorarios(0,"Atualidades");
        this.cadastrarHorarios(1,"Atualidades");
        this.cadastrarHorarios(2,"Atualidades");
        this.cadastrarHorarios(3,"Atualidades");
        this.cadastrarHorarios(4,"Atualidades");
        this.cadastrarHorarios(5,"Atualidades");
        this.cadastrarHorarios(6,"Atualidades");
        this.cadastrarMateria({nome:"Raciocínio Lógico",
          nivel:1,
          cor:"#23B3B3",questoes:20,peso:2})
        this.cadastrarHorarios(0,"Raciocínio Lógico");
        this.cadastrarHorarios(1,"Raciocínio Lógico");
        this.cadastrarHorarios(2,"Raciocínio Lógico");
        this.cadastrarHorarios(3,"Raciocínio Lógico");
        this.cadastrarHorarios(4,"Raciocínio Lógico");
        this.cadastrarHorarios(5,"Raciocínio Lógico");
        this.cadastrarHorarios(6,"Raciocínio Lógico");
        this.cadastrarMateria({nome:"Informática",
          nivel:1,
          cor:"#663366",questoes:20,peso:2})
        this.cadastrarHorarios(0,"Informática");
        this.cadastrarHorarios(1,"Informática");
        this.cadastrarHorarios(2,"Informática");
        this.cadastrarHorarios(3,"Informática");
        this.cadastrarHorarios(4,"Informática");
        this.cadastrarHorarios(5,"Informática");
        this.cadastrarHorarios(6,"Informática");
        this.cadastrarMateria({nome:"Direito Processual Penal",
          nivel:1,
          cor:"#CC0000",questoes:20,peso:2})
        this.cadastrarHorarios(0,"Direito Processual Penal");
        this.cadastrarHorarios(1,"Direito Processual Penal");
        this.cadastrarHorarios(2,"Direito Processual Penal");
        this.cadastrarHorarios(3,"Direito Processual Penal");
        this.cadastrarHorarios(4,"Direito Processual Penal");
        this.cadastrarHorarios(5,"Direito Processual Penal");
        this.cadastrarHorarios(6,"Direito Processual Penal");
        this.cadastrarMateria({nome:"Direito Processual Civil",
          nivel:1,
          cor:"#00CC00",questoes:20,peso:2})
        this.cadastrarHorarios(0,"Direito Processual Civil");
        this.cadastrarHorarios(1,"Direito Processual Civil");
        this.cadastrarHorarios(2,"Direito Processual Civil");
        this.cadastrarHorarios(3,"Direito Processual Civil");
        this.cadastrarHorarios(4,"Direito Processual Civil");
        this.cadastrarHorarios(5,"Direito Processual Civil");
        this.cadastrarHorarios(6,"Direito Processual Civil");
        this.cadastrarMateria({nome:"Direito Civil",
          nivel:1,
          cor:"#CC33CC",questoes:20,peso:2})
        this.cadastrarHorarios(0,"Direito Civil");
        this.cadastrarHorarios(1,"Direito Civil");
        this.cadastrarHorarios(2,"Direito Civil");
        this.cadastrarHorarios(3,"Direito Civil");
        this.cadastrarHorarios(4,"Direito Civil");
        this.cadastrarHorarios(5,"Direito Civil");
        this.cadastrarHorarios(6,"Direito Civil");
        sucesso(true)

      })
.catch((error)=>{
  if(error.code == "auth/invalid-email"){
    erro("ERRO! O E-MAIL DIGITADO É INVALIDO!")
  }else if(error.code == "auth/user-disabled"){
    erro("ERRO! O USUÁRIO FOI DESATIVADO!")
  }else if(error.code == "auth/user-not-found"){
    erro("ERRO! E-MAIL NÃO ENCONTRADO!")
  }else if(error.code == "auth/wrong-password"){
    erro("ERRO! SENHA DIGITADA INCORRETA!")
  }else if(error.code == "auth/email-already-in-use"){
    erro("ERRO! E-MAIL JÁ EM USO")
  }
})
})
}
// receberMensagem(){
//     this.oneSignal.startInit('1792b60b-ef6b-4be2-9c89-60dc221851aa', '79977732972');

//     this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

//     this.oneSignal.handleNotificationReceived().subscribe((data:any) => {
//     });

//     this.oneSignal.handleNotificationOpened().subscribe((data:any) => {
//       // let alertAux = this.alertCtrl.create({
//       //   title:"ATENÇÃO",
//       //   message:data.notification.payload.body
//       // })
//       // alertAux.present()
//     });

//     this.oneSignal.endInit();
//   }
enviarMensagem(mensagem){
    // oneSignal.registerForPushNotifications()
    let headers:HttpHeaders = new HttpHeaders({
      "Content-Type":"application/json",
      "Authorization":"Basic NzBjZmNmNmUtMWRkYS00Mzk4LWI0NDAtODYzMjIyMDQwNTk5"
    });
    let body = {
      app_id:"1792b60b-ef6b-4be2-9c89-60dc221851aa",
      contents: {"en":mensagem},
      included_segments:["All"],
      subtitle: {"en":"Caixola informa"}

    }

    this.http.post("https://onesignal.com/api/v1/notifications",JSON.stringify(body),{headers:headers})
    .subscribe((data)=>{
      console.log(data)
    });
  }
  esqueciMinhaSenha(email){
    return new Promise((sucesso,erro)=>{
      firebase.auth().sendPasswordResetEmail(email)
      .then(()=>{
        // let alertAux = this.alertCtrl.create({
        //   title:"ATENÇÃO",
        //   message:"FOI ENVIADO UM E-MAIL COM INSTRUÇÕES PARA REDEFINIÇÃO DA SENHA!"
        // })
        // alertAux.present()
         confirm("FOI ENVIADO UM E-MAIL COM INSTRUÇÕES PARA REDEFINIÇÃO DA SENHA!")
        sucesso(true)
      })
      .catch((e)=>{
        sucesso(false)
      })
    })
  }

}
