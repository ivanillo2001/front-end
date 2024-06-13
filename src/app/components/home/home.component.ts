import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from '../../servicios/cookie-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  titulo="CORDOBA PADEL TOUR"
  cookie!:string
  cookieService = inject(CookieService)
  ngOnInit(): void {
    this.validarIdioma()
  }

  /**
   * @description Función encargada de devolver el idioma. Si no hay ninguno
   * devuelve null
   * @returns string or null
   */
  validarIdioma(){
    let lenguage = this.cookieService.getCookie('language')
    if (lenguage=='spanish'||lenguage=='english'){
      return lenguage
    }else{
        return null
      }
  }
}
