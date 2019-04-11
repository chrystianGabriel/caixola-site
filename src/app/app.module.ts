import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { RouterModule,Routes} from '@angular/router';
import { IniciarEstudosComponent } from './iniciar-estudos/iniciar-estudos.component';
import { MinhasMateriasComponent } from './minhas-materias/minhas-materias.component';
import { MinhasMetasComponent } from './minhas-metas/minhas-metas.component';
import { MeuDesempenhoComponent } from './meu-desempenho/meu-desempenho.component';
import { MetaSemanalComponent } from './meta-semanal/meta-semanal.component';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FirebaseService } from './firebase.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CadastrarMateriasComponent } from './cadastrar-materias/cadastrar-materias.component';
import { EditarMateriaComponent } from './editar-materia/editar-materia.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
const rotas:Routes = [{path:"home",component:HomeComponent},
                      {path:"iniciar_estudos",component:IniciarEstudosComponent},
                      {path:"minhas_materias",component:MinhasMateriasComponent},
                      {path:"minhas_metas",component:MinhasMetasComponent},
                      {path:"meu_desempenho",component:MeuDesempenhoComponent},
                      {path:"meta_semanal",component:MetaSemanalComponent},
                      {path:"cadastrar_materias",component:CadastrarMateriasComponent},
                      {path:"editar_materia",component:EditarMateriaComponent},
                      {path:"relatorios",component:RelatorioComponent},
                      {path:"login",component:LoginComponent},
                      {path:"admin",component:AdminComponent}]
@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    HomeComponent,
    IniciarEstudosComponent,
    MinhasMateriasComponent,
    MinhasMetasComponent,
    MeuDesempenhoComponent,
    MetaSemanalComponent,
    CadastrarMateriasComponent,
    EditarMateriaComponent,
    RelatorioComponent,
    LoginComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rotas),
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  exports:[RouterModule],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
