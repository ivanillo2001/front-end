import { Component, OnInit, inject } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CookieService } from '../../servicios/cookie-service.service';
@Component({
  selector: 'app-eliminar-jugador',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './eliminar-jugador.component.html',
  styleUrl: './eliminar-jugador.component.css'
})
export class EliminarJugadorComponent implements OnInit{
  router = inject(Router)
  idJugador!:number
  cookie_service = inject(CookieService)
  private serviciosJugador = inject(UsuarioService);
  jugadorForm:FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.jugadorForm = this.formBuilder.group({
      nombreJugador: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.validar_lenguage()
  }
  validar_lenguage(){
    let lenguage = this.cookie_service.getCookie('language')
    if (lenguage =='spanish'|| lenguage=='english'){
      return lenguage
    }else{
      return null
    }
  }
  buscarJugador() {
    if (this.jugadorForm.valid) {
      const nombre = this.jugadorForm.get('nombreJugador')!.value;
      this.serviciosJugador.obtenerJugador(nombre).subscribe({
        next: (data) => {
          if (data.length > 0) {
            let nombreJugador = data[0].nombre;
            let puntos = data[0].puntos;
            document.querySelector("#name")!.textContent = nombreJugador;
            document.querySelector("#puntos")!.textContent = puntos.toString();
            document.querySelector("#datosJugador")?.classList.remove("d-none");
            this.idJugador = data[0].idJugador;
          } else {
            // No se encontró ningún jugador con ese nombre
            Swal.fire({
              icon: "error",
              title: "No se encontraron jugadores con ese nombre",
              showConfirmButton: false,
              timer: 1500
            });
          }
        },
        error: (error) => {
          console.error('Error al obtener jugador:', error);
          alert('Hubo un error al obtener el jugador.');
        }
      });
    }
  }
  eliminarJugador() {
    // Llama al servicio para eliminar el jugador
    this.serviciosJugador.eliminarJugador(this.idJugador).subscribe( 
      res=>{
        Swal.fire({
          icon: "success",
          title: "Jugador eliminado",
          showConfirmButton: false,
          timer: 1500
        });
        document.querySelector("#datosJugador")?.classList.add("d-none");
      },
      (error) => {
        // Manejo de errores, puedes mostrar una alerta de error si deseas
        Swal.fire({
          icon: "error",
          title: "No se pudo eliminar el jugador",
          showConfirmButton: false,
          timer: 1500
        });
      }
    )
  }
}
