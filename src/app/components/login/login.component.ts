import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../servicios/usuario.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from '../../servicios/cookie-service.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  public frm!: FormGroup; // declaras el formulario
  private serv_usuario = inject(UsuarioService)
  private router = inject (Router)
  constructor(private fb:FormBuilder,
      private cookieService: CookieService,
      private location: Location){}
  public formEnviado = false
  ngOnInit(): void { 
    this.frm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
    this.validar_lenguage()
  }

  validar_lenguage(){
    let lenguage = this.cookieService.getCookie('language')
    return lenguage
  }

  validarDatos() {
    this.formEnviado = true;
    if (this.frm.valid) {
      const user = this.frm.get('username')?.value;
      const password = this.frm.get('password')?.value;
      this.serv_usuario.validarUsuario(user, password).subscribe(
        (res: any) => {
          if (res.valido==true) { // Verifica si la respuesta es válida y las credenciales son válidas
            const rol = res.rol; // Obtienes el rol
            let rolReal = rol[0].rol;
            Swal.fire({
              icon: "success",
              title: "Bienvenido " + user,
              showConfirmButton: false,
              timer: 1500
            });
            // Crear la cookie para el rol
            this.cookieService.setCookie('rol', rolReal);
            this.location.back();
          } else {
            Swal.fire({
              icon: "error",
              title: "Credenciales inválidas.",
              footer: '<a href="/login">Vuelve a intentarlo</a>',
              showConfirmButton: true,
            });
          }
        }
      );
    }else{
      Swal.fire({
        icon: "error",
        title: "Rellene el formulario",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
  
}  