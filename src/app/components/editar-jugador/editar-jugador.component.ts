import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';
import Swal from 'sweetalert2';
import { CookieService } from '../../servicios/cookie-service.service';

@Component({
	selector: 'app-editar-jugador',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './editar-jugador.component.html',
	styleUrl: './editar-jugador.component.css'
})
export class EditarJugadorComponent implements OnInit{
  router = inject(Router)
  idJugador!:number
  private serviciosJugador = inject(UsuarioService);
  cookie_service = inject(CookieService)
  jugadorForm:FormGroup;
  editarForm:FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.jugadorForm = this.formBuilder.group({
      nombreJugador: ['', [Validators.required]],
    });
		this.editarForm = this.formBuilder.group({
			nombre_jugador:['',[Validators.required]],
			puntos_jugador:['',[Validators.required]],
			division_jugador:['',[Validators.required]],
			rol_jugador:['',[Validators.required]],
		})
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

	buscarJugador(){
		if (this.jugadorForm.valid) {
      const nombre = this.jugadorForm.get('nombreJugador')!.value;
      this.serviciosJugador.obtenerJugador(nombre).subscribe({
        next: (data) => {
          if (data.length > 0) {
            let jugador = data[0]
            document.querySelector("#datosJugador")?.classList.remove("d-none");
            this.idJugador = jugador.idJugador;
						this.editarForm.patchValue({
              nombre_jugador: jugador.nombre,
              puntos_jugador: jugador.puntos,
              division_jugador: jugador.division,
              rol_jugador: jugador.rol,
            });
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
    }else{
      Swal.fire({
        icon: "error",
        title: "Introduzca el nombre del jugador",
        showConfirmButton: false,
        timer: 1500
      });
    }
	}

  editarJugador() {
    if (this.editarForm.valid) {
      let nombre = this.editarForm.get('nombre_jugador')!.value;
      let puntos = parseInt(this.editarForm.get('puntos_jugador')!.value);
      let division = parseInt(this.editarForm.get('division_jugador')!.value);
      let rol = this.editarForm.get('rol_jugador')!.value;
      console.log(this.idJugador);
      this.serviciosJugador.editarJugador(this.idJugador, nombre, puntos, division, rol).subscribe({
        next: (data) => {
          Swal.fire({
            icon: "success",
            title: "Jugador editado correctamente",
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: (error) => {
          console.error('Error al editar jugador:', error);
          Swal.fire({
            icon: "error",
            title: "No se ha podido editar el jugador",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Rellene el formulario",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}
