import { Component, OnInit, inject } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Jugador } from '../../modelos/jugador';
import { CookieService } from '../../servicios/cookie-service.service';
@Component({
  selector: 'app-primera-division',
  standalone: true,
  imports: [],
  templateUrl: './primera-division.component.html',
  styleUrl: './primera-division.component.css'
})
export class PrimeraDivisionComponent implements OnInit{
  private servicio = inject(UsuarioService)
  cookieServices = inject(CookieService)
  language!:string
  ngOnInit(): void {
    this.cargarJugadores()
    this.validarIdioma();
  }

  validarIdioma(){
    this.language= this.cookieServices.getCookie('language')
    if (this.language=='spanish') {
      document.querySelector("#titulo_english")?.classList.add("d-none")
    }else{
      document.querySelector("#titulo_espanol")?.classList.add("d-none")

    }
  }

  cargarJugadores(){
    this.servicio.jugadoresPrimera().subscribe(
      (jugadores:Jugador[])=>{
        const zonaJugadores = document.querySelector("#jugadores") as HTMLDivElement
        jugadores.forEach(jugador => {
          const nombre = document.createElement("h2");
          nombre.textContent = jugador.nombre;
          zonaJugadores.append(nombre);
          const puntos = document.createElement("h3");
          if (this.language=='spanish') {
            puntos.textContent = jugador.puntos.toString() +' puntos'
          }else{
          puntos.textContent = jugador.puntos.toString() +' points'

          }
          zonaJugadores.append(puntos);
          const imagen = document.createElement("img")
          imagen.classList.add("mt-3")
          imagen.src="../../../assets/camisetas/"+jugador.foto
          imagen.width=200
          const cardJugador = document.createElement("div")
          cardJugador.classList.add("cardJugador")
          cardJugador.classList.add("col-md-6")
          cardJugador.classList.add("m-md-5")
          cardJugador.classList.add("mt-3")
          cardJugador.append(imagen)
          cardJugador.append(nombre)
          cardJugador.append(puntos)
          zonaJugadores.append(cardJugador)
          zonaJugadores.style.margin="0 auto"
          zonaJugadores.style.justifyContent="center"
        });
      }
    )
  }

}
