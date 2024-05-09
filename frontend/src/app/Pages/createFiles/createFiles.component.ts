import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FilesService } from '../../services/files.service';
import { AuthService } from '../../services/auth.service';
import { ThematicService } from '../../services/thematic.service';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-createFiles',
  templateUrl: './createFiles.component.html',
  styleUrls: ['./createFiles.component.css']
})
export class CreateFilesComponent implements OnInit {

  loader: boolean = false;
  isAdmin: boolean = false;
  eventFile: File | any
  registerFormThematic: any;
  registerFormCat: any;
  registerForm: any;
  registerFormFiles: any;
  categories: string[] = [];
  tematicas: string[] = [];

  file_store: any;
  file_list: Array<string> = [];

  constructor(
    private fileService: FilesService,
    private authService: AuthService,
    private thematicService: ThematicService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.loader = true;
    const user = this.authService.returnUser()
    this.isAdmin = user.tipoUsuario == 'admin'
    this.thematicService.get().subscribe(
      (response) => {
        if (response.success) {
          this.tematicas = response.temas.map((obj: any) => obj.nombre);
        }
      }
    )

    this.categoriesService.get().subscribe(
      (response) => {
        if (response.success) {
          this.categories = response.categoria.map((obj: any) => obj.nombre);
          console.log(this.tematicas)
        }
      }
    )
    this.registerFormThematic = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      categorias: new FormControl([])
    });

    this.registerFormCat = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
    });

    this.registerForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      categorias: new FormControl([])
    });

    this.registerFormFiles = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      tematica: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required]),
    });

    this.loader = false
  }

  onSubmit() {

  }
  onSubmitThematic() {
    const vls = {
      nombre: this.registerFormThematic.get('nombre').value,
      categorias: this.registerFormThematic.get('categorias').value
    }
    this.thematicService.create(vls).subscribe(
      (respose) => {
        if (respose.success)
          alert('tematica creada con exito')
      }
    )
  }

  onSubmitCat() {
    const user = this.authService.returnUser()
    const vls = {
      nombre: this.registerFormCat.get('nombre').value,
      email: user.email,
    }
    this.categoriesService.create(vls).subscribe(
      (respose) => {
        if (respose.success)
          alert('Categoria creada con exito')
        else
          alert(respose.message)
      }
    )
  }

  onSubmitFile() {
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
    formData.append("values", JSON.stringify(vls))
    this.fileService.createFile(formData).subscribe(
      (response) => {
        if (response.success) {
          alert('Archivo creado con exito')
        } else {
          alert('El archivo no se creo')

        }
      }
    )

  }

  onFileSelected(event: any) {
    this.eventFile = event.target.files[0];
  }

}
