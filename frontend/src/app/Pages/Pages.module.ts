import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
import {MatChipsModule} from '@angular/material/chips';
import { RegisterComponent } from './register/register.component';
import {MatSelectModule} from '@angular/material/select';
import { CreateFilesComponent } from './createFiles/createFiles.component';
import { EditFilesComponent } from './editFiles/editFiles.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    MatChipsModule,
    MatSelectModule,
  ],
  declarations: [
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    CreateFilesComponent,
    EditFilesComponent
  ]
})
export class PagesModule { }
 