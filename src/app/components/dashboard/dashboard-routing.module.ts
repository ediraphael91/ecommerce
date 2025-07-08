import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ReporteComponent } from './reporte/reporte.component';
import { CursoComponent } from './curso/curso.component';
import { RolComponent } from './rol/rol.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, children:[
    {path: '', component: InicioComponent},
    {path: 'usuarios', component: UsuarioComponent},
    {path: 'reportes', component: ReporteComponent},
    {path: 'cursos', component: CursoComponent},
    {path: 'roles', component: RolComponent}

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
