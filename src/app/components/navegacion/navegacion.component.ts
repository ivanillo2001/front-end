import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from '../../servicios/cookie-service.service';
import { Usuario } from '../../modelos/usuario';
@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.css',
})
export class NavegacionComponent implements OnInit {
  private router = inject(Router)
  private cookieService = inject(CookieService);
  usuarios: Usuario[] = [];
  ngOnInit(): void {
    this.validarSesionIniciada()
    this.activarBotones()
    this.validar_lenguage()
  }
  validar_lenguage(){
    let lenguage = this.cookieService.getCookie('language')
    if (lenguage =='spanish'|| lenguage=='english'){
      return lenguage
    }else{
      return null
    }
  }
  activarBotones() {
    let banderaSpain = document.querySelector("#banderaEspaña") as HTMLImageElement;
    banderaSpain?.addEventListener("click", () => {
        this.cookieService.setCookie('language', 'spanish');
        window.location.reload()
    });
    let banderaEeuu =document.querySelector("#banderaEeuu") as HTMLImageElement;
    banderaEeuu?.addEventListener("click", () => {
      this.cookieService.setCookie('language', 'english');
      window.location.reload()
  });
  }
  comprobarAdmin() {
    let usuExiste = false;
    if (this.cookieService.getCookie('rol')=='admin'){
      usuExiste = true;
    }
    return usuExiste;
  }

  validarSesionIniciada(){
    let sesionIniciada = false
    if (this.comprobarAdmin()||this.comprobarJugador()) {
      sesionIniciada=true
    }
    return sesionIniciada
  }
  comprobarJugador(){
    let usuExiste = false;
    if (this.cookieService.getCookie('rol')=='jugador'){
      usuExiste = true;
    }
    return usuExiste;
  }
  cerrarSesion(){
    this.cookieService.deleteCookie('rol')
    this.router.navigate(['/home']);
  }
  irLogin(){
    this.router.navigate(['/login']);

  }
}
