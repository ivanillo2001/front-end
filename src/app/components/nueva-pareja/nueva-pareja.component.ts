import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';
import { Jugador } from '../../modelos/jugador';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { CookieService } from '../../servicios/cookie-service.service';
@Component({
  selector: 'app-nueva-pareja',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nueva-pareja.component.html',
  styleUrl: './nueva-pareja.component.css'
})
export class NuevaParejaComponent implements OnInit{
  divisionForm: FormGroup;
  parejaForm: FormGroup;
  jugadores: Jugador[] = [];
  private division!:number
  cookie_service = inject(CookieService)
  @ViewChild('jugador1Select') jugador1Select!: ElementRef;
  @ViewChild('jugador2Select') jugador2Select!: ElementRef;
  constructor(private formBuilder: FormBuilder, private serviciosJugadores: UsuarioService) {
    this.divisionForm = this.formBuilder.group({
      division: ['1', [Validators.required, Validators.min(1), Validators.max(2)]],
    });

    this.parejaForm = this.formBuilder.group({
      jugador1: ['0', [Validators.required, Validators.min(1)]],
      jugador2: ['0', [Validators.required, Validators.min(1)],]
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

  buscarJugadores() {
    let zonaJugadores = document.querySelector('#zonaJugadores');
    zonaJugadores?.classList.remove('d-none');

    this.division = this.divisionForm.get('division')?.value;
    if (this.division == 1) {
      
      this.serviciosJugadores.jugadoresPrimera().subscribe(
        (jugadores: Jugador[]) => {
          this.jugadores = jugadores;
        }
      );
    } else {
      this.serviciosJugadores.jugadoresSegunda().subscribe(
        (jugadores: Jugador[]) => {
          this.jugadores = jugadores;
        }
      );
    }
  }

  actualizarParejas() {
    const jugador1SelectElement = this.jugador1Select.nativeElement;
    const jugador2SelectElement = this.jugador2Select.nativeElement;
    let idJugador1 = this.parejaForm.get('jugador1')?.value;
    let idJugador2 = this.parejaForm.get('jugador2')?.value;
    const nombre_jugador1 = jugador1SelectElement.options[jugador1SelectElement.selectedIndex].text;
    const nombre_jugador2 = jugador2SelectElement.options[jugador2SelectElement.selectedIndex].text;

    console.log(nombre_jugador1);
    console.log(nombre_jugador2);
    this.serviciosJugadores.modificarPareja(idJugador1,idJugador2).subscribe(
      (result)=>{
      },
      (error)=>{
      }
    )
    this.crearPareja(idJugador1,idJugador2, nombre_jugador1, nombre_jugador2);
  }


  crearPareja(idJugador1:number,idJugador2:number, nombre_jugador1:string,nombre_jugador2:string){
    this.serviciosJugadores.crearPareja(idJugador1,idJugador2,this.division, nombre_jugador1,nombre_jugador2).subscribe(
      (result)=>{
        Swal.fire({
          icon: "success",
          title: "Pareja creada con éxito",
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error)=>{
        Swal.fire({
          icon: "error",
          title: "No se pudo crear la pareja",
          showConfirmButton: false,
          timer: 1500
        });
      }
    )
  }
}
