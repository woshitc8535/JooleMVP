import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchComponent} from './components/search/search.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AuthGuard} from './guards/auth.guard';
import {DetailComponent} from './components/detail/detail.component';
import {ProjectComponent} from './components/project/project.component';
import {CompareComponent} from './components/compare/compare.component';


const routes: Routes = [
  {path: '' , redirectTo: 'search', pathMatch: 'full'},
  {path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
  {path: 'detail', component: DetailComponent, canActivate: [AuthGuard], },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'project', component: ProjectComponent, canActivate: [AuthGuard]},
  {path: 'compare', component: CompareComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
