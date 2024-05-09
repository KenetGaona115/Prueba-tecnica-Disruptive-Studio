import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilesService } from '../../services/files.service';
import { AuthService } from '../../services/auth.service';
import { ThematicService } from '../../services/thematic.service';
import { CategoriesService } from '../../services/categories.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editFiles',
  templateUrl: './editFiles.component.html',
  styleUrls: ['./editFiles.component.css']
})
export class EditFilesComponent implements OnInit {
  isValidUser: boolean = false;
  content: any
  registerFormFiles: FormGroup | any;
  categories: string[] = [];
  tematicas: string[] = [];
  eventFile: File | any
  loader: boolean = false
  id: any = null;
  constructor(
    private route: ActivatedRoute,
    private fileService: FilesService,
    private authService: AuthService,
    private thematicService: ThematicService,
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {
    this.loader = true
    this.isValidUser = this.authService.returnUser().tipoUsuario !== 'lector';
    this.id = this.route.snapshot.queryParams['id'];
    this.fetchData();
  }

  fetchData() {
    this.thematicService.get().subscribe(
      (response) => {
        if (response.success) {
          this.tematicas = response.temas.map((obj: any) => obj.nombre);
        }
      },
      (error) => {
        console.error('Error fetching thematicas:', error);
        alert(error)
      }
    );

    this.categoriesService.get().subscribe(
      (response) => {
        if (response.success) {
          this.categories = response.categoria.map((obj: any) => obj.nombre);
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );

    this.fileService.getOne(this.id).subscribe(
      (data) => {
        if (data.success) {
          this.content = data.content;
          this.initializeForm();
        }
      },
      (error) => {
        console.error('Error fetching file:', error);
      }
    );
  }

  initializeForm() {
    this.registerFormFiles = this.formBuilder.group({
      titulo: new FormControl(this.content.titulo, [Validators.required]),
      descripcion: new FormControl(this.content.descripcion, [Validators.required]),
      categoria: new FormControl(this.content.categoria, [Validators.required]),
      tematica: new FormControl(this.content.tematica, [Validators.required]),
      url: new FormControl(this.content.url, [Validators.required]),
    });

    this.loader = false; 
  }

  onSubmitFile() {
    const user = this.authService.returnUser()
    const formData = new FormData();
    if (this.eventFile) {
      formData.append("files", this.eventFile);
    }
    const vls = {
      titulo: this.registerFormFiles.get('titulo').value,
      descripcion: this.registerFormFiles.get('descripcion').value,
      categoria: this.registerFormFiles.get('categoria').value,
      tematica: this.registerFormFiles.get('tematica').value,
      url: this.registerFormFiles.get('url').value,
      creador: this.authService.returnUser().alias
    }
    const email = {
      email: user.email
    }
    formData.append("values", JSON.stringify(vls))
    formData.append("email", JSON.stringify(email))
    this.fileService.updateFile(formData, this.id).subscribe(
      (response) => {
        if (response.success) {
          alert('Actualizado con exito')
        } else {
          alert('No se actualizo')

        }
      }
    )
  }

  onFileSelected(event: any) {
    this.eventFile = event.target.files[0];
  }

}
