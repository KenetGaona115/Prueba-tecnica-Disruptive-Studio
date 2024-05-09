import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { HomeComponent } from './Pages/home/home.component';
import { RegisterComponent } from './Pages/register/register.component';
import { CreateFilesComponent } from './Pages/createFiles/createFiles.component';
import { EditFilesComponent } from './Pages/editFiles/editFiles.component';
import { AuthGuardService } from './services/guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'singUp', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'files', component: CreateFilesComponent, canActivate: [AuthGuardService] },
  { path: 'edit/:id', component: EditFilesComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
