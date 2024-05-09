import { Component, OnInit } from '@angular/core';
import { ThematicService } from '../../services/thematic.service';
import { FilesService } from '../../services/files.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchText: any
  typeUser: string = ''
  showFilter: boolean = false;

  constructor(
    private thematicService: ThematicService,
    private filesService: FilesService,
    private authService: AuthService,
    private router: Router
  ) { }

  temas: string[] = []
  contentMath: any[] = []
  contentSport: any[] = []
  contentCie: any[] = []
  contentFilter: any[] = []

  ngOnInit() {
    const user = this.authService.returnUser()
    this.typeUser = user.tipoUsuario || "NA"

    this.thematicService.get().subscribe(
      (response) => {
        if (response.success) {
          this.temas = response.temas.map((obj: any) => obj.nombre);
        }
      }
    )

    this.filesService.get('').subscribe(
      (response) => {
        if (response.success) {
          this.contentMath = response.collection.filter((f: any) => { return f.tematica == 'matematicas' })
          this.contentSport = response.collection.filter((f: any) => { return f.tematica == 'deportes' })
          this.contentCie = response.collection.filter((f: any) => { return f.tematica == 'ciencias' })
        }
      }
    )
  }

  onSearch() {
    this.showFilter = true
    this.filesService.getByName(this.searchText).subscribe(
      (response) => {
        if (response.success) {
          this.contentFilter = response.collection
        }
      }
    )
  }

  find(tema: any) {
    this.showFilter = true
    this.filesService.getThematic(tema).subscribe(
      (response) => {
        if (response.success) {
          this.contentFilter = response.collection
        }
      }
    )
  }

  showContent(item: any) {
    if (!this.authService.isAuthenticated()) {
      alert('No se ha iniciado sesion')
    }

    if (item.categoria == 'imagenes') {
      this.filesService.getFile(item.url).subscribe(
        (response) => {
          const imageData = response.data; // Extract image data
          // Base64 image data
          const decodedImageData = atob(imageData);
          const byteArray = new Uint8Array(decodedImageData.length);
          for (let i = 0; i < decodedImageData.length; i++) {
            byteArray[i] = decodedImageData.charCodeAt(i);
          }
          const blob = new Blob([byteArray], { type: "image/gif" });
          const url = window.URL.createObjectURL(blob);
          window.open(url);
        }
      )
    } else if (item.categoria == 'videos') {
      window.open(item.url);
    } else {
      this.filesService.getFile(item.url).subscribe(
        (response) => {
          const imageData = response.data; // Extract image data
          // Base64 image data
          const decodedImageData = atob(imageData);
          const byteArray = new Uint8Array(decodedImageData.length);
          for (let i = 0; i < decodedImageData.length; i++) {
            byteArray[i] = decodedImageData.charCodeAt(i);
          }
          const blob = new Blob([byteArray], { type: "text/plain" });
          const url = window.URL.createObjectURL(blob);
          window.open(url);
        }
      )
    }

  }

  edit(item: any) {
    console.log(item);
    this.router.navigate(['edit', item._id], { queryParams: { id: item._id } });
  }

  logout() {
    this.authService.logout();
  }

  delete(item: any) {
    this.filesService.delete(item._id).subscribe(
      (response) => {
        if (response.success) {
          alert('Archivo eliminado')
          this.filesService.get('').subscribe(
            (response) => {
              if (response.success) {
                this.contentMath = response.collection.filter((f: any) => { return f.tematica == 'matematicas' })
                this.contentSport = response.collection.filter((f: any) => { return f.tematica == 'deportes' })
                this.contentCie = response.collection.filter((f: any) => { return f.tematica == 'ciencias' })
              }
            }
          )
        }
      }
    )
  }

}
