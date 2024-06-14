import { Component, OnInit, inject } from '@angular/core';
import { CookieService } from '../../servicios/cookie-service.service';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../servicios/usuario.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crear-jugador',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-jugador.component.html',
  styleUrl: './crear-jugador.component.css'
})
export class CrearJugadorComponent implements OnInit{
  jugadorForm: FormGroup
  constructor(private formBuilder: FormBuilder) {
    this.jugadorForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      puntos: ['', [Validators.required, Validators.min(0)]],
      division: ['1',[ Validators.required]],
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  private cookieService = inject(CookieService)
  private servicioUsuarios = inject(UsuarioService)
  ngOnInit(): void {
    this.validarSesionIniciada()
    this.cargarDivisiones()
    this.validar_lenguage()

  }
  /**
   * @description Función encargada de devolver el idioma. Si no hay ninguno
   * devuelve null
   * @returns string or null
   */
  validar_lenguage(){
    let lenguage = this.cookieService.getCookie('language')
    if (lenguage =='spanish'|| lenguage=='english'){
      return lenguage
    }else{
      return null
    }
  }

  /**
   * @description Función encargada de validar si la sesión está iniciada o no
   * @returns true or false
   */
  validarSesionIniciada(){
    let sesionIniciada= false
    if (this.cookieService.cookieExists('rol')) {
      sesionIniciada= true
    }
    return sesionIniciada
  }

  /**
   * @description Función encargada de obtener las divisiones que hay en la bbdd
   */
  cargarDivisiones() {
    this.servicioUsuarios.obtenerDivisiones().subscribe(
        (divisiones: any[]) => {
            const selectDivision = document.querySelector("#divisiones") as HTMLSelectElement;
            selectDivision.innerHTML = ''; // Limpiar las opciones actuales
            divisiones.forEach(division => {
                const option = document.createElement("option");
                option.value = division.idDivision;
                option.textContent = division.nombre;
                selectDivision.appendChild(option);
            });
        },
        error => {
            console.error("Error al cargar las divisiones:", error);
        }
    );
}

  /**
   * @description Función encargada de crear un jugador.
   * Obtiene los campos del formulario y si están validados se crea.
   */
  crearJugador() {
    if (this.jugadorForm.valid) {
      const nombre = this.jugadorForm.get('nombre')!.value;
      const puntos = this.jugadorForm.get('puntos')!.value;
      const division = this.jugadorForm.get('division')!.value;
      const usuario = this.jugadorForm.get('usuario')!.value;
      const password = this.jugadorForm.get('password')!.value;
      const imagen = 'prueba.png'

      this.servicioUsuarios.crearJugador(nombre, puntos, division,usuario,password,imagen).subscribe({
        next:(data) => {
          // console.log('Jugador creado con éxito:', data);
          Swal.fire({
            icon: "success",
            title: "Jugador creado exitosamente",
            showConfirmButton: false,
            timer: 1500
          });
          this.jugadorForm.reset()
        },
        error:(error) => {
          // console.error('Error al crear jugador:', error);
          Swal.fire({
            icon: "error",
            title: "No se ha podido crear el jugador",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }else{
      Swal.fire({
        icon: "error",
        title: "Formulario no válido",
        showConfirmButton: false,
        timer: 1500
      });
    }
    
  }
  /**
   * @description Función encargada de pasar al servicio los datos del formulario para insertar
   * el nuevo jugador en la base de datos.
   * @param nombre 
   * @param puntos 
   * @param division 
   * @param usuario 
   * @param password 
   * @param imagen 
   */
  guardarJugador(nombre: string, puntos: string, division: string, usuario:string, password:string,imagen:string) {
    let puntosInteger = parseInt(puntos);
    let divisionInteger = parseInt(division);
    this.servicioUsuarios.crearJugador(nombre, puntosInteger, divisionInteger, usuario, password,imagen)
      .subscribe({
        next:(data) => {
          console.log('Jugador creado con éxito:', data);
        },
        error:(error) => {
          console.error('Error al crear jugador:', error);
        }
      });
  }
}
