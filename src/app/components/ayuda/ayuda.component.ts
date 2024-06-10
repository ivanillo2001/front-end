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
  }

  validar_lenguage(){
    let lenguage = this.cookie_service.getCookie('language')
    return lenguage
  }

}
