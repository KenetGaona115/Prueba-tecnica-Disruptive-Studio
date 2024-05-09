import { Component, OnInit } from '@angular/core';
import { ThematicService } from '../../services/thematic.service';
import { FilesService } from '../../services/files.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchText: any
  typeUser: string = ''
  constructor(
    private thematicService: ThematicService,
    private filesService: FilesService,
    private authService: AuthService
  ) { }

  temas: string[] = []
  contentMath: any[] = []
  contentSport: any[] = []
  contentCie: any[] = []

  ngOnInit() {
    const user = this.authService.returnUser()
    this.typeUser = user.tipoUsuario

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

  }

  find(tema: any) {
    console.log(tema)
  }

  showContent(item: any) {

    if(!this.authService.isAuthenticated()){
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

}
