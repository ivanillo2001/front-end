import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from '../../servicios/cookie-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  titulo="CORDOBA PADEL TOUR"
  cookie!:string
  cookieService = inject(CookieService)
  ngOnInit(): void {
    this.verificarCookie()
  }
  verificarCookie(){
    this.cookie = this.cookieService.getCookie('language')
    if (this.cookie=='spanish') {
      document.querySelector("#contenido_english")?.classList.add("d-none")
    }else{
      document.querySelector("#contenido_espanol")?.classList.add("d-none")
    }
  }
}
