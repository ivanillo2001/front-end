import { Component, OnInit, inject } from '@angular/core';
import { CookieService } from '../../servicios/cookie-service.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-ayuda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ayuda.component.html',
  styleUrl: './ayuda.component.css'
})
export class AyudaComponent implements OnInit{
  cookie_service = inject(CookieService)
  ngOnInit(): void {
    this.validar_lenguage()
    this.validar_rol()
  }

  /**
   * @description Función encargada de devolver el idioma. Si no hay ninguno
   * devuelve null
   * @returns string or null
   */
  validar_lenguage(){
    let lenguage = this.cookie_service.getCookie('language')
    if (lenguage=='spanish'||lenguage=='english'){
      return lenguage
    }else return null
  }

  /**
   * @description Función encargada de obtener el rol que hay actualmente.
   * Es importante ya que dependiendo del rol se muestra un contenido u otro
   * @returns string
   */
  validar_rol(){
    let rol = this.cookie_service.getCookie('rol')
    if (rol == 'jugador'|| rol =='admin') {
      return rol
    }else return 'invitado'
  }

}
