import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { HomeComponent } from './home/home.component';
import { RouterModule,Routes} from '@angular/router';
import { IniciarEstudosComponent } from './iniciar-estudos/iniciar-estudos.component';
import { MinhasMateriasComponent } from './minhas-materias/minhas-materias.component';
import { MinhasMetasComponent } from './minhas-metas/minhas-metas.component';
import { MeuDesempenhoComponent } from './meu-desempenho/meu-desempenho.component';
import { MetaSemanalComponent } from './meta-semanal/meta-semanal.component';
const rotas:Routes = [{path:"home",component:HomeComponent},
                      {path:"iniciar_estudos",component:IniciarEstudosComponent},
                      {path:"minhas_materias",component:MinhasMateriasComponent},
                      {path:"minhas_metas",component:MinhasMetasComponent},
                      {path:"meu_desempenho",component:MeuDesempenhoComponent},
                      {path:"meta_semanal",component:MetaSemanalComponent}]
@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    HomeComponent,
    IniciarEstudosComponent,
    MinhasMateriasComponent,
    MinhasMetasComponent,
    MeuDesempenhoComponent,
    MetaSemanalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rotas)
  ],
  exports:[RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
