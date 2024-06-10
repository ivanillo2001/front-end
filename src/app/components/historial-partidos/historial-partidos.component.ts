import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../servicios/usuario.service';
import { Partido } from '../../modelos/partidos';
import { Pareja } from '../../modelos/pareja';
import { forkJoin } from 'rxjs';
import { CookieService } from '../../servicios/cookie-service.service';
@Component({
  selector: 'app-historial-partidos',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './historial-partidos.component.html',
  styleUrl: './historial-partidos.component.css'
})
export class HistorialPartidosComponent implements OnInit{
  divisionForm: FormGroup;
  private division!:number
  partidos:Partido[]=[]
  cookie_service = inject(CookieService)
  constructor(private formBuilder: FormBuilder, private serviciosJugadores: UsuarioService) {
    this.divisionForm = this.formBuilder.group({
      division: ['1', [Validators.required]],
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
  buscarPartidos() {
    const zonaPartidos = document.getElementById('zonaPartidos');
    if (zonaPartidos) {
      zonaPartidos.innerHTML = '';
    }
    this.division = this.divisionForm.get('division')?.value;
  
    this.serviciosJugadores.obtenerPartidos(this.division).subscribe(
      (partidos: Partido[]) => {
        this.partidos = partidos;
  
        partidos.forEach(partido => {
          forkJoin({
            pareja1: this.serviciosJugadores.obtenerJugadoresParejas(partido.id_pareja1),
            pareja2: this.serviciosJugadores.obtenerJugadoresParejas(partido.id_pareja2)
          }).subscribe({
            next: ({ pareja1, pareja2 }) => {
              const jugador1 = pareja1[0].nombre_jugador1;
              const jugador2 = pareja1[0].nombre_jugador2;
              const jugador3 = pareja2[0].nombre_jugador1;
              const jugador4 = pareja2[0].nombre_jugador2;
  
              console.log(`Pareja 1: ${jugador1}, ${jugador2}`);
              console.log(`Pareja 2: ${jugador3}, ${jugador4}`);
              this.agregarPartidoPagina(jugador1,jugador2,jugador3,jugador4,partido.set1,partido.set2,partido.set3)
            },
            error: err => {
              console.error('Error al obtener jugadores de las parejas:', err);
            }
          });
        });
      },
    );
  }

  agregarPartidoPagina(jugador1:string,jugador2:string,jugador3:string,jugador4:string,set1:string,set2:string,set3:string){
     // Obtener el contenedor principal donde se agregarán los partidos
  const zonaPartidos = document.getElementById('zonaPartidos');

  // Crear un nuevo div para el partido
  const partidoDiv = document.createElement('div');
  partidoDiv.className = 'row my-3 partido';

  // Crear las columnas para los jugadores y los sets
  const jugadoresCol1 = document.createElement('div');
  jugadoresCol1.className = 'col-3';
  jugadoresCol1.innerHTML = `<p class="mt-3">${jugador1}</p><p class="mt-3">${jugador2}</p>`;

  const setsCol = document.createElement('div');
  setsCol.className = 'col-6 text-center';
  setsCol.innerHTML = `<p mt-2>${set1}</p><p>${set2}</p><p>${set3}</p>`;

  const jugadoresCol2 = document.createElement('div');
  jugadoresCol2.className = 'col-3';
  jugadoresCol2.innerHTML = `<p class="mt-3">${jugador3}</p><p class="mt-3">${jugador4}</p>`;

  // Agregar las columnas al div del partido
  partidoDiv.appendChild(jugadoresCol1);
  partidoDiv.appendChild(setsCol);
  partidoDiv.appendChild(jugadoresCol2);

  // Agregar el div del partido al contenedor principal
  if (zonaPartidos) {
    zonaPartidos.appendChild(partidoDiv);
    }
  }
}
